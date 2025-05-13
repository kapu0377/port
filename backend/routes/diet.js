const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/auth');
const LLMService = require('../services/llmService');
const APIKeyService = require('../services/apiKeyService');
const { executeQuery } = require('../utils/dbHelper');

router.post('/meals', checkAuth, async (req, res, next) => {
    const { meal_type, meal_description, meal_date } = req.body;
    const userId = req.session.user.id;

    try {
        const llmService = new LLMService(userId);
        const calories = await llmService.calculateCalories(meal_description);

        await executeQuery(
            'INSERT INTO daily_meals (user_id, meal_date, meal_type, meal_description, calories) VALUES (?, ?, ?, ?, ?)',
            [userId, meal_date, meal_type, meal_description, calories]
        );

        res.json({ 
            success: true, 
            message: '식사 기록이 저장되었습니다.',
            calories
        });
    } catch (error) {
        console.error('식사 기록 저장 중 오류:', error.message);
        next(error);
    }
});

router.post('/exercises', checkAuth, async (req, res, next) => {
    const { exercise_type, duration_minutes, intensity, exercise_date } = req.body;
    const userId = req.session.user.id;

    try {
        const llmService = new LLMService(userId);
        const exercise_description = `${exercise_type} 운동, ${duration_minutes}분, 강도: ${intensity}`;
        const calories_burned = await llmService.calculateExerciseCalories(exercise_description, duration_minutes, intensity);

        await executeQuery(
            'INSERT INTO daily_exercises (user_id, exercise_date, exercise_type, duration_minutes, intensity, calories_burned) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, exercise_date, exercise_type, duration_minutes, intensity, calories_burned]
        );

        res.json({ 
            success: true, 
            message: '운동 기록이 저장되었습니다.',
            calories_burned
        });
    } catch (error) {
        console.error('운동 기록 저장 중 오류:', error.message);
        next(error);
    }
});

router.post('/evaluate/daily', checkAuth, async (req, res, next) => {
    const { date } = req.body;
    const userId = req.session.user.id;

    try {
        const meals = await executeQuery(
            'SELECT * FROM daily_meals WHERE user_id = ? AND meal_date = ?',
            [userId, date]
        );
        
        const exercises = await executeQuery(
            'SELECT * FROM daily_exercises WHERE user_id = ? AND exercise_date = ?',
            [userId, date]
        );

        const llmService = new LLMService(userId);
        const evaluation = await llmService.evaluateDaily(meals, exercises);

        await executeQuery(
            `INSERT INTO daily_evaluations 
            (user_id, evaluation_date, total_calories_consumed, total_calories_burned, 
            score, strengths, weaknesses, improvements, llm_evaluation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, date, 
            meals.reduce((sum, m) => sum + m.calories, 0),
            exercises.reduce((sum, e) => sum + e.calories_burned, 0),
            evaluation.score, evaluation.strengths, evaluation.weaknesses,
            evaluation.improvements, evaluation.llm_evaluation]
        );

        res.json({
            success: true,
            evaluation
        });
    } catch (error) {
        console.error('일일 평가 중 오류:', error.message);
        next(error);
    }
});

router.post('/evaluate/weekly', checkAuth, async (req, res, next) => {
    const { start_date, end_date } = req.body;
    const userId = req.session.user.id;

    try {
        const dailyEvaluations = await executeQuery(
            'SELECT * FROM daily_evaluations WHERE user_id = ? AND evaluation_date BETWEEN ? AND ?',
            [userId, start_date, end_date]
        );

        const llmService = new LLMService(userId);
        const evaluation = await llmService.evaluateWeekly(dailyEvaluations);

        await executeQuery(
            `INSERT INTO weekly_evaluations 
            (user_id, week_start_date, week_end_date, average_daily_calories_consumed,
            average_daily_calories_burned, score, strengths, weaknesses, improvements, llm_evaluation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, start_date, end_date,
            dailyEvaluations.reduce((sum, d) => sum + d.total_calories_consumed, 0) / (dailyEvaluations.length || 1),
            dailyEvaluations.reduce((sum, d) => sum + d.total_calories_burned, 0) / (dailyEvaluations.length || 1),
            evaluation.score, evaluation.strengths, evaluation.weaknesses,
            evaluation.improvements, evaluation.llm_evaluation]
        );

        res.json({
            success: true,
            evaluation
        });
    } catch (error) {
        console.error('주간 평가 중 오류:', error.message);
        next(error);
    }
});

router.post('/evaluate/monthly', checkAuth, async (req, res, next) => {
    const { month_date } = req.body;
    const userId = req.session.user.id;

    try {
        const weeklyEvaluations = await executeQuery(
            'SELECT * FROM weekly_evaluations WHERE user_id = ? AND MONTH(week_start_date) = MONTH(?) AND YEAR(week_start_date) = YEAR(?)',
            [userId, month_date, month_date]
        );

        const llmService = new LLMService(userId);
        const evaluation = await llmService.evaluateMonthly(weeklyEvaluations);

        await executeQuery(
            `INSERT INTO monthly_evaluations 
            (user_id, month_date, average_daily_calories_consumed, average_daily_calories_burned,
            score, strengths, weaknesses, improvements, llm_evaluation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, month_date,
            weeklyEvaluations.reduce((sum, w) => sum + w.average_daily_calories_consumed, 0) / (weeklyEvaluations.length || 1),
            weeklyEvaluations.reduce((sum, w) => sum + w.average_daily_calories_burned, 0) / (weeklyEvaluations.length || 1),
            evaluation.score, evaluation.strengths, evaluation.weaknesses,
            evaluation.improvements, evaluation.llm_evaluation]
        );

        res.json({
            success: true,
            evaluation
        });
    } catch (error) {
        console.error('월간 평가 중 오류:', error.message);
        next(error);
    }
});

router.post('/goals/update', checkAuth, async (req, res, next) => {
  const redisClient = req.app.get('redisClient');
  if (!redisClient) {
    console.error('Redis 클라이언트를 app 객체에서 찾을 수 없습니다.');
    return res.status(500).json({ success: false, message: '서버 설정 오류' });
  }

  const { 
    target_weight_kg, 
    target_daily_calories, 
    target_daily_exercise_minutes, 
    activity_level, 
    diet_goal,
    target_date,
    notes
  } = req.body;
  const userId = req.session.user.id;
  const start_date = new Date(); 
  
  try {
    const existingGoals = await executeQuery(
      'SELECT * FROM user_goals WHERE user_id = ? AND is_active = TRUE',
      [userId]
    );
    
    let query;
    let params;
    
    if (existingGoals.length > 0) {
      await executeQuery(
        'UPDATE user_goals SET is_active = FALSE WHERE user_id = ? AND is_active = TRUE',
        [userId]
      );
      
      query = `
        INSERT INTO user_goals 
        (user_id, start_date, target_date, target_weight_kg, target_daily_calories, 
        target_daily_exercise_minutes, activity_level, diet_goal, notes, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)
      `;
      params = [
        userId, start_date, target_date, target_weight_kg, target_daily_calories,
        target_daily_exercise_minutes, activity_level, diet_goal, notes
      ];
    } else {
      query = `
        INSERT INTO user_goals 
        (user_id, start_date, target_date, target_weight_kg, target_daily_calories, 
        target_daily_exercise_minutes, activity_level, diet_goal, notes, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)
      `;
      params = [
        userId, start_date, target_date, target_weight_kg, target_daily_calories,
        target_daily_exercise_minutes, activity_level, diet_goal, notes
      ];
    }
    
    const result = await executeQuery(query, params);
    const goalId = result.insertId;
    
    const userInfo = await executeQuery(
      'SELECT current_weight_kg, height_cm FROM users WHERE id = ?',
      [userId]
    );
    
    if (userInfo.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: '사용자 정보를 찾을 수 없습니다.' 
      });
    }
    
    const newGoal = await executeQuery(
      'SELECT * FROM user_goals WHERE id = ?',
      [goalId]
    );
    
    if (newGoal.length === 0) {
      return res.status(500).json({ 
        success: false, 
        message: '목표 설정 중 오류가 발생했습니다.' 
      });
    }
    
    try {
      const llmService = new LLMService(userId);
      const monthlySchedule = await llmService.generateMonthlySchedule(newGoal[0], userInfo[0], start_date);
      
      await executeQuery(
        `INSERT INTO monthly_schedules 
        (user_id, month_start_date, month_end_date, schedule_data, created_at)
        VALUES (?, ?, ?, ?, NOW())`,
        [userId, monthlySchedule.startDate, monthlySchedule.endDate, 
        JSON.stringify(monthlySchedule.schedule)]
      );
      
      // 캐시 삭제 로직 수정
      if (!redisClient) {
        console.warn('Redis 클라이언트를 찾을 수 없어 캐시를 삭제하지 못했습니다.');
      } else {
        const cacheKey = `user:${userId}:goals`;
        await redisClient.del(cacheKey);
        console.log('사용자 목표 캐시 삭제 (업데이트):', cacheKey);
      }

      res.json({ 
        success: true,
        message: '목표가 성공적으로 설정되었으며, 월간 스케줄이 생성되었습니다.',
        scheduleCreated: true
      });
    } catch (error) {
      console.error('월간 스케줄 생성 중 오류:', error.message);
      res.json({ 
        success: true,
        message: '목표가 성공적으로 설정되었습니다. 월간 스케줄 생성에는 실패했습니다.',
        scheduleCreated: false
      });
    }
  } catch (error) {
    console.error('목표 설정 중 오류:', error.message);
    next(error);
  }
});

router.get('/goals', checkAuth, async (req, res, next) => {
    const userId = req.session.user.id;
    const cacheKey = `user:${userId}:goals`;
    const redisClient = req.app.get('redisClient');

    if (!redisClient) {
        console.error('Redis 클라이언트를 app 객체에서 찾을 수 없습니다.');
    }

    try {
        let cachedGoals = null;
        if (redisClient) { 
            cachedGoals = await redisClient.get(cacheKey);
        }
        
        if (cachedGoals) {
            console.log('사용자 목표 캐시 히트:', cacheKey);
            return res.json(JSON.parse(cachedGoals));
        }

        console.log('사용자 목표 캐시 미스:', cacheKey);
        const goals = await executeQuery(
            'SELECT * FROM user_goals WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1',
            [userId]
        );

        let responseData;
        if (goals.length > 0) {
            responseData = { success: true, hasGoals: true, goals: goals[0] };
        } else {
            responseData = { success: true, hasGoals: false, goals: null };
        }

        if (redisClient) { 
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(responseData));
        }

        res.json(responseData);
    } catch (error) {
        console.error('목표 조회 중 오류:', error.message);
        next(error);
    }
});

router.delete('/goals', checkAuth, async (req, res, next) => {
  const userId = req.session.user.id;
  const cacheKey = `user:${userId}:goals`;
  const redisClient = req.app.get('redisClient');

  if (!redisClient) {
    console.error('Redis 클라이언트를 app 객체에서 찾을 수 없습니다.');
  }

  try {
    const result = await executeQuery(
      'DELETE FROM user_goals WHERE user_id = ?',
      [userId]
    );

    if (result.affectedRows === 0) { 
        const err = new Error('삭제할 목표를 찾을 수 없습니다.');
        err.statusCode = 404;
        err.isOperational = true;
        return next(err);
    }
    
    if (redisClient) { 
        await redisClient.del(cacheKey);
        console.log('사용자 목표 캐시 삭제 (삭제):', cacheKey);
    }

    res.json({ 
      success: true,
      message: '목표가 성공적으로 삭제되었습니다.'
    });

  } catch (error) {
    console.error('목표 삭제 중 오류:', error.message);
    next(error);
  }
});

router.get('/meals', checkAuth, async (req, res, next) => {
    const userId = req.session.user.id;
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ success: false, message: '날짜를 제공해야 합니다.' });
    }

    try {
        const meals = await executeQuery(
            'SELECT * FROM daily_meals WHERE user_id = ? AND meal_date = ? ORDER BY created_at ASC',
            [userId, date]
        );
        res.json({ success: true, data: meals });
    } catch (error) {
        console.error('식사 기록 조회 중 오류:', error.message);
        next(error);
    }
});

router.get('/exercises', checkAuth, async (req, res, next) => {
    const userId = req.session.user.id;
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ success: false, message: '날짜를 제공해야 합니다.' });
    }

    try {
        const exercises = await executeQuery(
            'SELECT * FROM daily_exercises WHERE user_id = ? AND exercise_date = ? ORDER BY created_at ASC',
            [userId, date]
        );
        res.json({ success: true, data: exercises });
    } catch (error) {
        console.error('운동 기록 조회 중 오류:', error.message);
        next(error);
    }
});

router.get('/evaluation/daily/:date', checkAuth, async (req, res, next) => {
    const userId = req.session.user.id;
    const { date } = req.params;
    const cacheKey = `user:${userId}:evaluation:daily:${date}`;
    const redisClient = req.app.get('redisClient');

    if (!redisClient) {
        console.error('Redis 클라이언트를 app 객체에서 찾을 수 없습니다.');
    }

    try {
        let cachedEvaluation = null;
        if (redisClient) { 
            cachedEvaluation = await redisClient.get(cacheKey);
        }
        
        if (cachedEvaluation) {
            console.log('일일 평가 캐시 히트:', cacheKey);
            return res.json(JSON.parse(cachedEvaluation));
        }

        console.log('일일 평가 캐시 미스:', cacheKey);
        const evaluation = await executeQuery(
            'SELECT * FROM daily_evaluations WHERE user_id = ? AND evaluation_date = ? ORDER BY created_at DESC LIMIT 1',
            [userId, date]
        );

        let responseData;
        if (evaluation.length > 0) {
            responseData = { success: true, data: evaluation[0] };
        } else {
            responseData = { success: true, data: null };
        }

        if (redisClient) { 
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(responseData));
        }

        res.json(responseData);
    } catch (error) {
        console.error('일일 평가 조회 중 오류:', error.message);
        next(error);
    }
});

router.post('/schedule/monthly', checkAuth, async (req, res, next) => {
    const redisClient = req.app.get('redisClient');
    const userId = req.session.user.id;
    const { month_date } = req.body;
    
    if (!month_date) {
        return res.status(400).json({
            success: false,
            message: '날짜를 제공해야 합니다.'
        });
    }

    try {
        const goals = await executeQuery(
            'SELECT * FROM user_goals WHERE user_id = ? AND is_active = TRUE ORDER BY updated_at DESC LIMIT 1',
            [userId]
        );
        
        if (goals.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: '스케줄을 생성하기 전에 목표를 먼저 설정해야 합니다.' 
            });
        }

        const userInfo = await executeQuery(
            'SELECT current_weight_kg, height_cm FROM users WHERE id = ?',
            [userId]
        );

        if (userInfo.length === 0) {
            return res.status(400).json({
                success: false,
                message: '사용자 정보를 찾을 수 없습니다.'
            });
        }

        const llmService = new LLMService(userId);
        const monthlySchedule = await llmService.generateMonthlySchedule(goals[0], userInfo[0], month_date);
        
        await executeQuery(
            'DELETE FROM monthly_schedules WHERE user_id = ? AND month_start_date = ?',
            [userId, monthlySchedule.startDate]
        );
        
        await executeQuery(
            `INSERT INTO monthly_schedules 
            (user_id, month_start_date, month_end_date, schedule_data, created_at)
            VALUES (?, ?, ?, ?, NOW())`,
            [userId, monthlySchedule.startDate, monthlySchedule.endDate, 
            JSON.stringify(monthlySchedule.schedule)]
        );

        const cacheKey = `user:${userId}:schedule:${monthlySchedule.startDate.substring(0, 7)}`; // YYYY-MM 형식
        if (redisClient) {
            await redisClient.del(cacheKey);
            console.log('월간 스케줄 캐시 삭제 (생성/업데이트):', cacheKey);
        } else {
            console.warn('Redis 클라이언트가 없어 캐시를 삭제하지 못했습니다.');
        }
        
        return res.json({
            success: true,
            data: monthlySchedule
        });
        
    } catch (error) {
        console.error('월간 스케줄 생성 중 오류:', error);
        return res.status(500).json({
            success: false,
            message: error.message || '월간 스케줄 생성 중 오류가 발생했습니다.'
        });
    }
});

router.get('/schedule/monthly', checkAuth, async (req, res, next) => {
    const redisClient = req.app.get('redisClient');
    if (!redisClient) {
      console.error('Redis 클라이언트를 app 객체에서 찾을 수 없습니다.');
      return res.status(500).json({ success: false, message: '서버 설정 오류 (Redis 연결 없음)' });
    }
    const userId = req.session.user.id;
    const { month_date } = req.query; 

    if (!month_date) {
        return res.status(400).json({
            success: false,
            message: '날짜를 제공해야 합니다.'
        });
    }

    const cacheKey = `user:${userId}:schedule:${month_date}`;

    try {
        const cachedSchedule = await redisClient.get(cacheKey);
        if (cachedSchedule) {
            console.log('월간 스케줄 캐시 히트:', cacheKey);
            return res.json(JSON.parse(cachedSchedule));
        }
        
        console.log('월간 스케줄 캐시 미스:', cacheKey);

        let year, month;
        if (month_date.includes('-')) {
            const parts = month_date.split('-');
            year = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
        } else {
            console.error("Invalid month_date format received:", month_date);
            return res.status(400).json({ success: false, message: "잘못된 날짜 형식입니다." });
        }

        const queryYear = year;
        const queryMonth = month;

        console.log(`--- GET /schedule/monthly ---`);
        console.log(`Received request for year: ${year}, month: ${month}`);

        const schedules = await executeQuery(
            `SELECT * FROM monthly_schedules
            WHERE user_id = ?
              AND YEAR(month_start_date) = ?
              AND MONTH(month_start_date) = ?
            ORDER BY created_at DESC LIMIT 1`,
            [userId, queryYear, queryMonth]
        );

        let responseData;
        if (schedules.length === 0) {
            console.log('No schedule found for this month.');
            responseData = {
                success: true,
                hasSchedule: false,
                message: '해당 월에 대한 스케줄이 없습니다.'
            };
        } else {
            console.log(`Found schedule with month_start_date: ${schedules[0].month_start_date}`);
            const scheduleData = JSON.parse(schedules[0].schedule_data);
            responseData = {
                success: true,
                hasSchedule: true,
                data: {
                    id: schedules[0].id,
                    startDate: schedules[0].month_start_date,
                    endDate: schedules[0].month_end_date,
                    schedule: scheduleData
                }
            };
        }


        await redisClient.setEx(cacheKey, 3600, JSON.stringify(responseData));
        
        res.json(responseData);
    } catch (error) {
     
        next(error);
    }
});

router.post('/check/daily-achievement', checkAuth, async (req, res, next) => {
    const userId = req.session.user.id;
    const { date } = req.body;
    
    if (!date) {
        return res.status(400).json({ 
            success: false, 
            message: '날짜를 제공해야 합니다.' 
        });
    }
    
    try {
        const schedules = await executeQuery(
            `SELECT * FROM monthly_schedules 
            WHERE user_id = ? AND month_start_date <= ? AND month_end_date >= ?
            ORDER BY created_at DESC LIMIT 1`,
            [userId, date, date]
        );
        
        if (schedules.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: '해당 날짜에 대한 스케줄이 없습니다.' 
            });
        }
        
        const meals = await executeQuery(
            'SELECT * FROM daily_meals WHERE user_id = ? AND meal_date = ?',
            [userId, date]
        );
        
        const exercises = await executeQuery(
            'SELECT * FROM daily_exercises WHERE user_id = ? AND exercise_date = ?',
            [userId, date]
        );
        
        const scheduleData = JSON.parse(schedules[0].schedule_data);
        const targetDate = new Date(date);
        const dayOfMonth = targetDate.getDate();
        
        let dailyPlan = null;
        for (const weekPlan of scheduleData.weeklyPlans) {
            for (const plan of weekPlan.dailyPlans) {
                const planDay = parseInt(plan.day);
                if (planDay === dayOfMonth) {
                    dailyPlan = plan;
                    break;
                }
            }
            if (dailyPlan) break;
        }
        
        if (!dailyPlan) {
            return res.status(404).json({ 
                success: false, 
                message: '해당 날짜에 대한 일일 계획을 찾을 수 없습니다.' 
            });
        }
        
        const llmService = new LLMService(userId);
        const achievement = await llmService.checkDailyAchievement(dailyPlan, meals, exercises);
        
        await executeQuery(
            `INSERT INTO daily_achievements 
            (user_id, achievement_date, schedule_id, achievement_percentage, 
            meal_achievement, exercise_achievement, overall_feedback, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
            [userId, date, schedules[0].id, achievement.achievementPercentage, 
            achievement.mealAchievement, achievement.exerciseAchievement, achievement.overallFeedback]
        );
        
        res.json({ 
            success: true, 
            message: '일일 목표 달성 평가가 완료되었습니다.',
            data: achievement
        });
    } catch (error) {
        console.error('일일 목표 달성 평가 중 오류:', error.message);
        next(error);
    }
});

router.get('/evaluation/weekly', checkAuth, async (req, res, next) => {
    const redisClient = req.app.get('redisClient');
    if (!redisClient) {
      console.error('Redis 클라이언트를 app 객체에서 찾을 수 없습니다.');
      return res.status(500).json({ success: false, message: '서버 설정 오류' });
    }
    const userId = req.session.user.id;
    const { start_date, end_date } = req.query;
    const cacheKey = `user:${userId}:evaluation:weekly:${start_date}_${end_date}`;
    
    if (!start_date || !end_date) {
        return res.status(400).json({
            success: false,
            message: '시작일과 종료일을 모두 제공해야 합니다.'
        });
    }
    
    try {

        const cachedEvaluation = await redisClient.get(cacheKey);
        if (cachedEvaluation) {
            console.log('주간 평가 캐시 히트:', cacheKey);
            return res.json(JSON.parse(cachedEvaluation));
        }

        console.log('주간 평가 캐시 미스:', cacheKey);

        const evaluations = await executeQuery(
            'SELECT * FROM weekly_evaluations WHERE user_id = ? AND week_start_date = ? AND week_end_date = ? ORDER BY created_at DESC LIMIT 1',
            [userId, start_date, end_date]
        );
        
        let responseData;
        if (evaluations.length === 0) {
            responseData = { success: true, evaluation: null };
        } else {
             responseData = { success: true, evaluation: evaluations[0] };
        }
        

        await redisClient.setEx(cacheKey, 3600, JSON.stringify(responseData));

        res.json(responseData);
    } catch (error) {
        console.error('주간 평가 조회 중 오류:', error.message);
        next(error);
    }
});

router.get('/evaluation/monthly/:month_date', checkAuth, async (req, res, next) => {
    const redisClient = req.app.get('redisClient');
    if (!redisClient) {
      console.error('Redis 클라이언트를 app 객체에서 찾을 수 없습니다.');
      return res.status(500).json({ success: false, message: '서버 설정 오류' });
    }
    const userId = req.session.user.id;
    const { month_date } = req.params;
    const cacheKey = `user:${userId}:evaluation:monthly:${month_date}`;
    
    if (!month_date) {
        return res.status(400).json({
            success: false,
            message: '날짜를 제공해야 합니다.'
        });
    }
    
    try {

        const cachedEvaluation = await redisClient.get(cacheKey);
        if (cachedEvaluation) {
            console.log('월간 평가 캐시 히트:', cacheKey);
            return res.json(JSON.parse(cachedEvaluation));
        }

        console.log('월간 평가 캐시 미스:', cacheKey);
        const monthStart = new Date(month_date);
        monthStart.setDate(1);
        const formattedDate = monthStart.toISOString().split('T')[0]; 
        
        const evaluations = await executeQuery(
            'SELECT * FROM monthly_evaluations WHERE user_id = ? AND YEAR(month_date) = YEAR(?) AND MONTH(month_date) = MONTH(?) ORDER BY created_at DESC LIMIT 1',
            [userId, formattedDate, formattedDate]
        );
        
        let responseData;
        if (evaluations.length === 0) {
            responseData = { success: true, evaluation: null };
        } else {
            responseData = { success: true, evaluation: evaluations[0] };
        }
        
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(responseData));

        res.json(responseData);
    } catch (error) {
        console.error('월간 평가 조회 중 오류:', error.message);
        next(error);
    }
});

router.get('/schedules/monthly/:month_date', checkAuth, async (req, res, next) => {
    const redisClient = req.app.get('redisClient');
    if (!redisClient) {
      console.error('Redis 클라이언트를 app 객체에서 찾을 수 없습니다.');
      return res.status(500).json({ success: false, message: '서버 설정 오류' });
    }
    const userId = req.session.user.id;
    const { month_date } = req.params;
    
    if (!month_date) {
        return res.status(400).json({
            success: false,
            message: '날짜를 제공해야 합니다.'
        });
    }

    try {
        const cachedSchedule = await redisClient.get(`user:${userId}:schedule:${month_date}`);
        if (cachedSchedule) {
            console.log('월간 스케줄 캐시 히트:', `user:${userId}:schedule:${month_date}`);
            return res.json(JSON.parse(cachedSchedule));
        }
        
        console.log('월간 스케줄 캐시 미스:', `user:${userId}:schedule:${month_date}`);

        let year, month;
        if (month_date.includes('-')) {
            const parts = month_date.split('-');
            year = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
        } else {
            console.error("Invalid month_date format received:", month_date);
            return res.status(400).json({ success: false, message: "잘못된 날짜 형식입니다." });
        }

        const queryYear = year;
        const queryMonth = month;

        console.log(`--- GET /schedules/monthly/:month_date ---`);
        console.log(`Received request for year: ${year}, month: ${month}`);

        const schedules = await executeQuery(
            `SELECT * FROM monthly_schedules
            WHERE user_id = ?
              AND YEAR(month_start_date) = ?
              AND MONTH(month_start_date) = ?
            ORDER BY created_at DESC LIMIT 1`,
            [userId, queryYear, queryMonth]
        );

        let responseData;
        if (schedules.length === 0) {
            console.log('No schedule found for this month.');
            responseData = {
                success: true,
                hasSchedule: false,
                message: '해당 월에 대한 스케줄이 없습니다.'
            };
        } else {
            console.log(`Found schedule with month_start_date: ${schedules[0].month_start_date}`);
            const scheduleData = JSON.parse(schedules[0].schedule_data);
            responseData = {
                success: true,
                hasSchedule: true,
                data: {
                    id: schedules[0].id,
                    startDate: schedules[0].month_start_date,
                    endDate: schedules[0].month_end_date,
                    schedule: scheduleData
                }
            };
        }


        await redisClient.setEx(`user:${userId}:schedule:${month_date}`, 3600, JSON.stringify(responseData));
        
        res.json(responseData);
    } catch (error) {
     
        next(error);
    }
});

module.exports = router; 