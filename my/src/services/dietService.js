import axios from 'axios';

const API_BASE_URL = '/my-api';

const handleApiError = (error) => {
  console.error('API 오류:', error);
  
  if (error.response) {
    return {
      success: false,
      message: error.response.data.message || '요청 처리 중 오류가 발생했습니다.',
      status: error.response.status
    };
  } else if (error.request) {
    return {
      success: false,
      message: '서버와 통신할 수 없습니다. 인터넷 연결을 확인해주세요.',
    };
  } else {
    return {
      success: false,
      message: '요청을 처리할 수 없습니다. 나중에 다시 시도해주세요.',
    };
  }
};

export const fetchDietPlan = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diet/goals`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createDietPlan = async (planData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diet/goals/update`, planData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchMeals = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diet/meals`, {
      params: { date }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const saveMeal = async (mealData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diet/meals`, mealData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchExercises = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diet/exercises`, {
      params: { date }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const saveExercise = async (exerciseData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diet/exercises`, exerciseData);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchDailyEvaluation = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diet/evaluation/daily/${date}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createDailyEvaluation = async (date) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diet/evaluate/daily`, { date });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchWeeklyEvaluation = async (start_date, end_date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diet/evaluation/weekly`, {
      params: { start_date, end_date }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createWeeklyEvaluation = async (start_date, end_date) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diet/evaluate/weekly`, {
      start_date,
      end_date
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchMonthlyEvaluation = async (month_date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diet/evaluation/monthly/${month_date}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createMonthlyEvaluation = async (month_date) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diet/evaluate/monthly`, {
      month_date
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchMonthlySchedule = async (month_date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diet/schedule/monthly`, {
      params: { month_date }
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createMonthlySchedule = async (month_date) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diet/schedule/monthly`, {
      month_date
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchUserGoals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diet/goals`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}; 