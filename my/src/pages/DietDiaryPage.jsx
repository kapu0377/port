import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import styled from 'styled-components';
import { format, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import DietPlanSection from '../components/dietDiary/DietPlanSection';
import MealRecordSection from '../components/dietDiary/MealRecordSection';
import ExerciseRecordSection from '../components/dietDiary/ExerciseRecordSection';
import DailyEvaluationSection from '../components/dietDiary/DailyEvaluationSection';
import MyGoalsSection from '../components/dietDiary/MyGoalsSection';
import WeeklySummarySection from '../components/dietDiary/WeeklySummarySection';
import MonthlySummarySection from '../components/dietDiary/MonthlySummarySection';
import MonthlyScheduleSection from '../components/dietDiary/MonthlyScheduleSection';

import { 
  fetchMeals, 
  fetchExercises, 
  fetchDailyEvaluation,
  fetchUserGoals,
  fetchWeeklyEvaluation,
  fetchMonthlyEvaluation,
  fetchDietPlan,
} from '../services/dietService';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const DatePickerContainer = styled.div`
  margin-bottom: 2rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  .react-datepicker {
    border: none;
    font-family: inherit;
  }
  .react-datepicker__header {
    background-color: var(--primary-color);
    border-bottom: none;
  }
  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker-time__header {
    color: white;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: var(--accent-color);
  }
  .react-datepicker__day:hover {
    background-color: #e0e0e0;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  border-bottom: 3px solid ${props => props.active ? 'var(--accent-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--accent-color)' : 'var(--text-color)'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const NoGoalsContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  margin-top: 2rem;
`;

const NoGoalsTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const NoGoalsMessage = styled.p`
  margin-bottom: 2rem;
  line-height: 1.6;
`;

// 커스텀 날짜 입력 필드 스타일 정의
const StyledDateInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc; // 약간 연한 테두리
  border-radius: 6px; // 둥근 모서리
  font-size: 1rem;
  width: auto;
  min-width: 200px; // 적절한 최소 너비 설정
  background-color: white;
  color: var(--text-color);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.075); // 내부 그림자로 깊이감
  transition: border-color 0.2s, box-shadow 0.2s;
  cursor: pointer; // 클릭 가능함을 표시

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3); // 포커스 시 부드러운 그림자 (색상은 테마에 맞게 조정 필요)
  }
`;

// react-datepicker를 위한 커스텀 입력 컴포넌트 (forwardRef 사용)
const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <StyledDateInput
    onClick={onClick}
    ref={ref}
    value={value}
    readOnly // 사용자가 직접 입력하는 것을 방지
  />
));
CustomDateInput.displayName = 'CustomDateInput'; // 개발자 도구 표시 이름 설정

const DietDiaryPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('today');
  const [mealsData, setMealsData] = useState([]);
  const [exercisesData, setExercisesData] = useState([]);
  const [evaluationData, setEvaluationData] = useState(null);
  const [goalsData, setGoalsData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [, setDietPlanData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNoDietPlan, setHasNoDietPlan] = useState(false);
  const [hasNoGoals, setHasNoGoals] = useState(false);
  
  useEffect(() => {
    const checkUserGoals = async () => {
      try {
        const goalsResponse = await fetchUserGoals();
        if (!goalsResponse.success || !goalsResponse.hasGoals) {
          setHasNoGoals(true);
        } else {
          setGoalsData(goalsResponse.goals);
          setHasNoGoals(false);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('목표 정보 조회 중 오류:', error);
        setIsLoading(false);
      }
    };
    
    checkUserGoals();
  }, []);
  
  useEffect(() => {
    const checkDietPlan = async () => {
      try {
        const plan = await fetchDietPlan();
        if (!plan || !plan.success) {
          setHasNoDietPlan(true);
        } else {
          setDietPlanData(plan.data);
        }
      } catch (error) {
        console.error('다이어트 계획 조회 중 오류:', error);
        setHasNoDietPlan(true);
      }
    };
    
    checkDietPlan();
  }, []);
  
  const loadDiaryData = useCallback(async () => {
    setIsLoading(true);
    
    try {
      if (!isValid(selectedDate)) {
        console.error('유효하지 않은 날짜:', selectedDate);
        return;
      }

      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      const mealsResponse = await fetchMeals(formattedDate);
      if (mealsResponse.success) {
        setMealsData(mealsResponse.data);
      } else {
        console.error('Failed to fetch meals:', mealsResponse.message);
      }
      
      const exercisesResponse = await fetchExercises(formattedDate);
      if (exercisesResponse.success) {
        setExercisesData(exercisesResponse.data);
      } else {
        console.error('Failed to fetch exercises:', exercisesResponse.message);
      }
      
      const evaluationResponse = await fetchDailyEvaluation(formattedDate);
      if (evaluationResponse.success) {
        setEvaluationData(evaluationResponse.data);
      } else {
        setEvaluationData(null); 
        console.log('No daily evaluation found or failed to fetch:', evaluationResponse.message);
      }
      
    } catch (error) {
      console.error('다이어트 일기 데이터 로드 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);
  
  useEffect(() => {
    if (!hasNoGoals && isValid(selectedDate)) {
      loadDiaryData();
    }
  }, [selectedDate, hasNoGoals, loadDiaryData]);
  
  const loadSummaryData = useCallback(async () => {
    if (!isValid(selectedDate)) {
      console.error('유효하지 않은 날짜:', selectedDate);
      return;
    }

    if (activeTab === 'weekly') {
      try {
        const startDate = new Date(selectedDate);
        startDate.setDate(startDate.getDate() - startDate.getDay()); // 주의 시작일 (일요일)
        
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6); // 주의 마지막일 (토요일)
        
        if (!isValid(startDate) || !isValid(endDate)) {
          console.error('유효하지 않은 주간 날짜 범위:', { startDate, endDate });
          return;
        }

        const weeklyResponse = await fetchWeeklyEvaluation(
          format(startDate, 'yyyy-MM-dd'),
          format(endDate, 'yyyy-MM-dd')
        );
        
        if (weeklyResponse.success) {
          setWeeklyData(weeklyResponse.evaluation);
        }
      } catch (error) {
        console.error('주간 평가 데이터 로드 중 오류:', error);
      }
    } else if (activeTab === 'monthly') {
      try {
        const monthDate = format(selectedDate, 'yyyy-MM-01');
        const monthlyResponse = await fetchMonthlyEvaluation(monthDate);
        
        if (monthlyResponse.success) {
          setMonthlyData(monthlyResponse.evaluation);
        }
      } catch (error) {
        console.error('월간 평가 데이터 로드 중 오류:', error);
      }
    }
  }, [activeTab, selectedDate]);
  
  useEffect(() => {
    if (activeTab === 'weekly' || activeTab === 'monthly') {
      loadSummaryData();
    }
  }, [activeTab, loadSummaryData]);
  
  // 날짜 선택 핸들러
  const handleDateChange = (date) => {
    if (!date || !isValid(date)) {
      console.error('유효하지 않은 날짜가 선택됨:', date);
      return;
    }
    setSelectedDate(date);
  };
  
  // 탭 선택 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handlePlanCreated = (planData, scheduleCreated) => {
    setGoalsData(planData);
    setHasNoGoals(false);
    if (scheduleCreated) {
      // setActiveTab('goals'); // 사용자가 직접 탭을 누르도록 유도하거나,
                               // MonthlyScheduleSection의 onUpdate 콜백으로 상태 동기화
      // 아래 fetch 로직은 MonthlyScheduleSection으로 위임되었으므로 제거
      /*
      const monthDate = format(new Date(), 'yyyy-MM-01');
      fetchMonthlySchedule(monthDate)
        .then(response => {
          if (response.success && response.hasSchedule) {
            setMonthlyScheduleData(response.data); // 이 상태는 이제 없음
          }
        })
        .catch(error => {
          console.error('월간 목표 데이터 로드 중 오류:', error);
        });
      */
    }
  };
  
  const handleMealUpdate = useCallback(() => {
    if (isValid(selectedDate)) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      fetchMeals(formattedDate).then(response => {
        if (response.success) {
          setMealsData(response.data);
        } else {
          console.error('식단 업데이트 후 데이터 로드 실패:', response.message);
        }
      }).catch(error => {
        console.error('식단 업데이트 후 데이터 로드 중 오류:', error);
      });
      fetchDailyEvaluation(formattedDate).then(response => {
        if (response.success) {
          setEvaluationData(response.data);
        } else {
           setEvaluationData(null);
        }
      }).catch(error => {
         console.error('평가 업데이트 후 데이터 로드 중 오류:', error);
      });
    }
  }, [selectedDate]);

  const handleExerciseUpdate = useCallback(() => {
    if (isValid(selectedDate)) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      fetchExercises(formattedDate).then(response => {
        if (response.success) {
          setExercisesData(response.data);
        } else {
          console.error('운동 업데이트 후 데이터 로드 실패:', response.message);
        }
      }).catch(error => {
        console.error('운동 업데이트 후 데이터 로드 중 오류:', error);
      });
      fetchDailyEvaluation(formattedDate).then(response => {
        if (response.success) {
          setEvaluationData(response.data);
        } else {
           setEvaluationData(null);
        }
      }).catch(error => {
         console.error('평가 업데이트 후 데이터 로드 중 오류:', error);
      });
    }
  }, [selectedDate]);
  
  if (isLoading) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>로딩 중...</h2>
        </div>
      </PageContainer>
    );
  }
  
  if (hasNoGoals) {
    return (
      <PageContainer>
        <Header>
          <Title>목표 설정</Title>
        </Header>
        <NoGoalsContainer>
          <NoGoalsTitle>설정된 목표가 없습니다</NoGoalsTitle>
          <NoGoalsMessage>
            다이어트 일기를 시작하기 전에 목표를 먼저 설정해야 합니다.
            아래에서 목표를 설정해주세요.
          </NoGoalsMessage>
          <DietPlanSection 
            onPlanCreated={handlePlanCreated}
          />
        </NoGoalsContainer>
      </PageContainer>
    );
  }
  
  if (hasNoDietPlan) {
    return (
      <PageContainer>
        <Header>
          <Title>다이어트 일기 시작하기</Title>
        </Header>
        <DietPlanSection 
          onPlanCreated={(plan) => {
            setDietPlanData(plan);
            setHasNoDietPlan(false);
          }}
        />
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Header>
        <Title>나의 다이어트 일기</Title>
        <DatePickerContainer>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy년 MM월 dd일"
            locale={ko}
            maxDate={new Date()}
            customInput={<CustomDateInput />}
            popperPlacement="bottom-start"
          />
        </DatePickerContainer>
      </Header>
      
      <Tabs>
        <Tab 
          active={activeTab === 'today'} 
          onClick={() => handleTabChange('today')}
        >
          오늘의 기록
        </Tab>
        <Tab 
          active={activeTab === 'weekly'} 
          onClick={() => handleTabChange('weekly')}
        >
          주간 요약
        </Tab>
        <Tab 
          active={activeTab === 'monthly'} 
          onClick={() => handleTabChange('monthly')}
        >
          월간 요약
        </Tab>
        <Tab 
          active={activeTab === 'goals'} 
          onClick={() => handleTabChange('goals')}
        >
          월간 목표
        </Tab>
      </Tabs>
      
      {activeTab === 'today' && (
        <ContentContainer>
          <MainContent>
            <MealRecordSection 
              meals={mealsData} 
              selectedDate={selectedDate}
              onUpdate={handleMealUpdate}
            />
            <ExerciseRecordSection
              exercises={exercisesData}
              selectedDate={selectedDate}
              onUpdate={handleExerciseUpdate}
            />
            <DailyEvaluationSection 
              evaluation={evaluationData}
              selectedDate={selectedDate}
              meals={mealsData}
              exercises={exercisesData}
            />
          </MainContent>
          <Sidebar>
            <MyGoalsSection goals={goalsData} />
          </Sidebar>
        </ContentContainer>
      )}
      
      {activeTab === 'weekly' && (
        <WeeklySummarySection 
          weeklyData={weeklyData}
          selectedDate={selectedDate}
        />
      )}
      
      {activeTab === 'monthly' && (
        <MonthlySummarySection 
          monthlyData={monthlyData}
          selectedDate={selectedDate}
        />
      )}
      
      {activeTab === 'goals' && (
        <MonthlyScheduleSection
          selectedDate={selectedDate}
          onUpdate={() => {
            // 월간 스케줄이 MonthlyScheduleSection 내부에서 생성/업데이트 되었을 때
            // 필요한 경우 DietDiaryPage의 다른 상태를 업데이트하거나,
            // 부모-자식 간 통신이 더 필요하면 콜백을 강화할 수 있음.
            // 예: console.log('Monthly schedule updated/created from section');
            // 필요하다면 여기서 goalsData를 다시 fetch 할 수도 있지만,
            // 현재 MonthlyScheduleSection은 goalsData와 직접적 연관은 없어보임.
          }}
        />
      )}
    </PageContainer>
  );
};

export default DietDiaryPage; 