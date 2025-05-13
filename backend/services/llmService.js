const { GoogleGenAI } = require("@google/genai");
const LLMConfig = require('../config/llmConfig');
const PromptService = require('./promptService');
const EvaluationParser = require('./evaluationParser');
const APIKeyService = require('./apiKeyService');

class LLMService {
    constructor(userId) {
        this.userId = userId;
        this.genAI = null;
        this.modelConfig = { 
            model: LLMConfig.MODEL_NAME,
            generationConfig: {
                temperature: LLMConfig.TEMPERATURE
            }
        };
    }
    
    async initialize() {
        try {
            const apiKey = await APIKeyService.getApiKey(this.userId);
            
            if (!apiKey) {
                console.error('API 키를 찾을 수 없습니다. 사용자 ID:', this.userId);
                throw new Error('API 키를 찾을 수 없습니다. 설정을 확인해 주세요.');
            }
            
            try {
                this.genAI = new GoogleGenAI({ apiKey: apiKey });
                return true;
            } finally {
           
            }
        } catch (error) {
            console.error('Google GenAI 초기화 중 오류 발생:', error);
            throw new Error('LLM 서비스를 초기화할 수 없습니다.');
        }
    }

    async _generateContent(prompt) {
        if (!this.genAI) {
            await this.initialize();
        }
        
        let result;
        try {
            try {
                result = await this.genAI.models.generateContent({
                    model: this.modelConfig.model, 
                    contents: [{ role: "user", parts: [{ text: prompt }] }], 
                    generationConfig: this.modelConfig.generationConfig 
                });
                
                if (result && result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts && 
                    result.candidates[0].content.parts.length > 0) {
                    return result.candidates[0].content.parts[0].text;
                } else {
                    console.error('Gemini API 응답에서 텍스트를 추출할 수 없습니다:', JSON.stringify(result, null, 2));
                    throw new Error('AI 응답 형식이 올바르지 않습니다.');
                }
            } finally {
             
            }
        } catch (error) {
            console.error('Gemini API 호출 중 오류:', error);
            console.error('Gemini API Error Message:', error.message);
            console.error('Gemini API Error Stack:', error.stack);
            if (result) {
                console.error('Gemini API Result at time of error:', JSON.stringify(result, null, 2));
            }
            throw new Error('AI 응답 생성 중 오류가 발생했습니다.');
        } 
    }

    async calculateCalories(mealDescription) {
        const prompt = PromptService.getCaloriesPrompt(mealDescription);
        const result = await this._generateContent(prompt);
        const calories = parseFloat(result.trim());
        return isNaN(calories) ? 0 : calories;
    }

    async calculateExerciseCalories(exerciseDescription, durationMinutes, intensity) {
        const prompt = PromptService.getExerciseCaloriesPrompt(exerciseDescription, durationMinutes, intensity);
        const result = await this._generateContent(prompt);
        const calories = parseFloat(result.trim());
        return isNaN(calories) ? 0 : calories;
    }

    async evaluateDaily(meals, exercises) {
        const prompt = PromptService.getDailyEvaluationPrompt(meals, exercises);
        const result = await this._generateContent(prompt);
        return EvaluationParser.parse(result);
    }

    async evaluateWeekly(dailyEvaluations) {
        const prompt = PromptService.getWeeklyEvaluationPrompt(dailyEvaluations);
        const result = await this._generateContent(prompt);
        return EvaluationParser.parse(result);
    }

    async evaluateMonthly(weeklyEvaluations) {
        const prompt = PromptService.getMonthlyEvaluationPrompt(weeklyEvaluations);
        const result = await this._generateContent(prompt);
        return EvaluationParser.parse(result);
    }
    
    async generateMonthlySchedule(goals, userInfo, targetMonth = null) {
        console.log('generateMonthlySchedule called with targetMonth:', targetMonth);
        
        const today = new Date();
        const currentMonth = today.getMonth(); // 0-11
        const currentYear = today.getFullYear();
        
        let effectiveMonth;
        let effectiveYear = currentYear;

        if (targetMonth !== null) {
            let parsedMonth = NaN;
            if (typeof targetMonth === 'number' && !isNaN(targetMonth)) {
                parsedMonth = targetMonth;
            } else if (typeof targetMonth === 'string') {
                const parts = targetMonth.split('-');
                if (parts.length >= 2) {
                    const monthPart = parseInt(parts[1], 10);
                    if (!isNaN(monthPart)) {
                        parsedMonth = monthPart;
                    }
                    const yearPart = parseInt(parts[0], 10);
                    if (!isNaN(yearPart)) {
                         effectiveYear = yearPart; 
                    }
                }
            }
            
            if (!isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
                effectiveMonth = parsedMonth - 1; 
            } else {
                 console.warn(`Invalid targetMonth provided: ${targetMonth}. Using current month instead.`);
                 effectiveMonth = currentMonth; 
                 effectiveYear = currentYear; 
            }

         

        } else {
            effectiveMonth = currentMonth;
            effectiveYear = currentYear;
        }

        const month = effectiveMonth;
        const year = effectiveYear;

        if (isNaN(month) || month < 0 || month > 11) {
             console.error(`Failed to determine a valid month. Calculated month: ${month}. Aborting schedule generation.`);
             throw new Error('스케줄 생성을 위한 유효한 월 정보를 결정할 수 없습니다.');
        }
        
        console.log(`DEBUG: Year used for prompt: ${year}, Month used for prompt (0-indexed): ${month}`);
        
        const prompt = PromptService.getMonthlySchedulePrompt(goals, userInfo, year, month);
        console.log(`${year}년 ${month + 1}월 스케줄 생성 시작: 프롬프트 생성 완료`);
        
        try { 
            const result = await this._generateContent(prompt);
            console.log('API 응답 받음: 길이', result.length);
            
            let contentToParse = null;
            let parsedSchedule = null;

            try {
                const fencedJsonMatch = result.match(/```json\\n?([\\s\\S]*?)\\n?```/);

                if (fencedJsonMatch && fencedJsonMatch[1]) {
                    contentToParse = fencedJsonMatch[1].trim();
                } else {
                    const firstBrace = result.indexOf('{');
                    const lastBrace = result.lastIndexOf('}');
                    if (firstBrace !== -1 && lastBrace > firstBrace) {
                        contentToParse = result.substring(firstBrace, lastBrace + 1).trim();
                    } else {
                        contentToParse = result.trim();
                    }
                }

                parsedSchedule = JSON.parse(contentToParse);
                
                
                const startDate = new Date(Date.UTC(year, month, 1));
                
                const endDate = new Date(Date.UTC(year, month + 1, 0));
                
                const scheduleObject = {
                    year: year,
                    month: month + 1,
                    startDate: startDate.toISOString().slice(0, 10),
                    endDate: endDate.toISOString().slice(0, 10),
                    schedule: parsedSchedule
                };
              
                
                return scheduleObject;
            } catch (innerError) {
                console.error('스케줄 파싱 구체적 오류:', innerError);
                console.error('오류 타입:', innerError.constructor.name);
                console.error('오류 메시지:', innerError.message);
                console.error('Content attempted to parse:', contentToParse ? contentToParse.substring(0, 200) + '...' : null);
                throw innerError; 
            }
        } catch (error) {
            console.error('스케줄 생성 최종 오류:', error);
            if (error.stack) {
                console.error('스택 트레이스:', error.stack);
            }
            throw new Error('생성된 스케줄을 처리하는 중 오류가 발생했습니다.');
        }
    }
    
    async checkDailyAchievement(dailyPlan, meals, exercises) {
        const prompt = PromptService.getDailyAchievementPrompt(dailyPlan, meals, exercises);
        const result = await this._generateContent(prompt);
        
        try {
            const achievement = JSON.parse(result);
            
            return {
                achievementPercentage: achievement.achievementPercentage,
                mealAchievement: achievement.mealAchievement,
                exerciseAchievement: achievement.exerciseAchievement,
                overallFeedback: achievement.overallFeedback,
                details: achievement.details
            };
        } catch (error) {
            console.error('달성도 평가 파싱 오류:', error);
            console.error('Original API result:', result); 
            throw new Error('달성도 평가 결과를 처리하는 중 오류가 발생했습니다.');
        }
    }
}

module.exports = LLMService;