const LLMConfig = require('../config/llmConfig');

class PromptService {
    static getCaloriesPrompt(mealDescription) {
        return `
${LLMConfig.PROMPTS.ROLES.NUTRITIONIST}
주어진 식사 설명을 분석하여 총 칼로리를 계산해주세요.
최대한 정확하게 계산하되, 정확한 양이 주어지지 않은 경우에는 일반적인 양을 가정하세요.
계산된 칼로리 숫자만 반환해주세요.

식사 설명: ${mealDescription}

칼로리:`;
    }

    static getExerciseCaloriesPrompt(exerciseDescription, durationMinutes, intensity) {
        return `
${LLMConfig.PROMPTS.ROLES.HEALTH_COACH}
다음 운동 정보를 바탕으로 소모된 칼로리를 계산해주세요:

운동 설명: ${exerciseDescription}
운동 시간: ${durationMinutes}분
강도: ${intensity} (low/medium/high 중 하나)

사람의 체중과 신체 조건에 따라 다를 수 있지만, 평균적인 성인을 기준으로 소모된 칼로리를 추정해주세요.
계산된 칼로리 숫자만 반환해주세요.

칼로리:`;
    }

    static getDailyEvaluationPrompt(meals, exercises) {
        return `${LLMConfig.PROMPTS.ROLES.HEALTH_COACH}
아래 제공된 사용자의 하루 식단 기록과 운동 기록을 바탕으로 종합적인 피드백을 작성해 주세요.

[평가 기준]
- 식단의 영양 균형 (탄수화물, 단백질, 지방 비율), 칼로리 적정성, 건강한 식재료 사용 여부
- 운동의 종류, 강도, 시간 및 전반적인 활동량
- 규칙적인 생활 습관 형성 노력

[응답 형식]
다음 각 항목을 명확히 구분하여 작성하고, 각 항목의 내용은 구체적이고 실질적인 도움을 줄 수 있도록 합니다.
- 점수: (0점에서 100점 사이의 정수)
- 잘한 점: (구체적인 칭찬과 긍정적인 부분)
- 부족한 점: (개선이 필요한 부분 명확히 지적)
- 개선방안: (실천 가능하고 구체적인 조언)
- 요약: (하루 전체에 대한 3~5줄의 핵심 요약, 친근하고 격려하는 어투)

[입력 정보]
[식사 기록]
${JSON.stringify(meals, null, 2)}

[운동 기록]
${JSON.stringify(exercises, null, 2)}

[피드백 시작]
점수:
잘한 점:
부족한 점:
개선방안:
요약:`;
    }

    static getWeeklyEvaluationPrompt(dailyEvaluations) {
    }

    static getMonthlyEvaluationPrompt(weeklyEvaluations) {
    }
    
    static getMonthlySchedulePrompt(goals, userInfo, year, month) {
        const activityLevelMap = {
            sedentary: '주로 앉아서 생활',
            lightly_active: '가벼운 활동',
            moderately_active: '보통 수준의 활동',
            very_active: '매우 활동적',
            extra_active: '격렬한 활동'
        };
        const dietGoalMap = {
            weight_loss: '체중 감량',
            maintain_weight: '체중 유지',
            muscle_gain: '근육 증가'
        };

        const userActivityLevel = activityLevelMap[goals.activity_level] || goals.activity_level;
        const userDietGoal = dietGoalMap[goals.diet_goal] || goals.diet_goal;
        
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

        return `
${LLMConfig.PROMPTS.ROLES.HEALTH_COACH}
사용자의 건강 목표와 신체 정보를 바탕으로 ${year}년 ${month + 1}월 (총 ${lastDayOfMonth}일) 동안의 상세한 일일 식단 및 운동 계획을 작성해주세요.

[사용자 목표 정보]
목표 체중: ${goals.target_weight_kg}kg
목표 일일 칼로리: ${goals.target_daily_calories}kcal
목표 일일 운동 시간: ${goals.target_daily_exercise_minutes}분
활동 수준: ${userActivityLevel}
식단 목표: ${userDietGoal}
목표 달성 희망일: ${goals.target_date || '설정되지 않음'}
추가 메모: ${goals.notes || '없음'}

[사용자 신체 정보]
키: ${userInfo.height_cm}cm
현재 체중: ${userInfo.current_weight_kg}kg

[응답 형식]
JSON 형식으로 다음 정보를 포함하여 응답해주세요:
1. "overview": ${year}년 ${month + 1}월 전체 계획에 대한 요약 및 방향성 (내부 식별자 대신 사용자 친화적인 한국어 표현 사용)
2. "weeklyPlans": 각 주에 대한 계획. 총 ${Math.ceil(lastDayOfMonth / 7)}개의 주차 계획이 포함되어야 합니다.
3. 각 주차의 "dailyPlans"에는 해당 월의 1일부터 ${lastDayOfMonth}일까지 모든 날짜에 대한 계획이 포함되어야 합니다.

응답은 다음 JSON 구조로 작성해주세요:

{
  "overview": "월간 계획에 대한 전반적인 설명과 방향성 (반드시 한국어로 작성)",
  "weeklyPlans": [
    {
      "week": 1,
      "focus": "이번 주 중점 사항",
      "goals": "이번 주 소목표",
      "dailyPlans": [
        {
          "day": 1,
          "meals": {
            "breakfast": "아침 식단 제안",
            "lunch": "점심 식단 제안",
            "dinner": "저녁 식단 제안",
            "snacks": "간식 제안"
          },
          "exercise": {
            "type": "운동 종류",
            "duration": "시간(분)",
            "intensity": "강도(low/medium/high)",
            "description": "구체적인 운동 설명"
          },
          "estimatedCalories": {
            "intake": 섭취 예상 칼로리(숫자),
            "burned": 소모 예상 칼로리(숫자)
          },
          "tips": "오늘의 팁"
        },
        // ... ${year}년 ${month + 1}월 ${lastDayOfMonth}일까지의 모든 날짜 계획 포함 ...
      ]
    },
    // ... 나머지 주차 계획 ...
  ]
}

각 주차별로 사용자의 목표 달성을 위한 진행 상황을 고려하여 식단과 운동 강도를 점진적으로 조정해주세요.
식단은 영양 균형을 고려하고, 현지에서 구하기 쉬운 식재료를 활용한 현실적인 메뉴로 구성해주세요.
운동은 사용자의 활동 수준(${userActivityLevel})과 목표(${userDietGoal})를 고려하여 적절한 종류와 강도를 제안해주세요.

가장 중요한 것은, ${year}년 ${month + 1}월의 1일부터 ${lastDayOfMonth}일까지 모든 날짜에 대한 계획을 "dailyPlans" 배열 안에 포함해야 한다는 점입니다.

반드시 JSON 형식으로만 응답해주세요. JSON 형식 이외의 텍스트나 설명은 포함하지 마세요.`;
    }
    
    static getDailyAchievementPrompt(dailyPlan, meals, exercises) {
        return `
${LLMConfig.PROMPTS.ROLES.HEALTH_COACH}
사용자의 일일 식단 및 운동 계획과 실제 기록을 비교하여 목표 달성도를 평가해주세요.

[계획된 일일 목표]
${JSON.stringify(dailyPlan, null, 2)}

[실제 식단 기록]
${JSON.stringify(meals, null, 2)}

[실제 운동 기록]
${JSON.stringify(exercises, null, 2)}

다음 기준으로 평가해주세요:
1. 식단 목표 달성도: 계획된 식단과 실제 식단의 유사성, 칼로리 섭취량 목표 달성 여부
2. 운동 목표 달성도: 계획된 운동 유형, 시간, 강도와 실제 운동의 일치도
3. 전체 달성도: 종합적인 달성 정도를 백분율로 표시

[응답 형식]
JSON 형식으로 다음 정보를 포함하여 응답해주세요:

{
  "achievementPercentage": 달성도 백분율(0-100 사이의 숫자),
  "mealAchievement": {
    "score": 식단 달성도 점수(0-100 사이의 숫자),
    "feedback": "식단 달성에 대한 구체적인 피드백"
  },
  "exerciseAchievement": {
    "score": 운동 달성도 점수(0-100 사이의 숫자),
    "feedback": "운동 달성에 대한 구체적인 피드백"
  },
  "overallFeedback": "종합적인 피드백 및 조언",
  "details": {
    "strengths": ["잘한 점 1", "잘한 점 2", ...],
    "improvements": ["개선할 점 1", "개선할 점 2", ...],
    "tips": ["다음 날을 위한 팁 1", "다음 날을 위한 팁 2", ...]
  }
}

반드시 JSON 형식으로만 응답해주세요. JSON 형식 이외의 텍스트나 설명은 포함하지 마세요.`;
    }
}

module.exports = PromptService;