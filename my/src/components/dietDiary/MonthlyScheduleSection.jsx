import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { format, addMonths, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';
import { motion } from 'framer-motion';

import { fetchMonthlySchedule, createMonthlySchedule } from '../../services/dietService';

const Container = styled.div`
  background-color: var(--main-bg);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const MonthName = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const NavButton = styled(motion.button)`
  background: none;
  border: none;
  color: var(--accent-color);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  gap: 1rem;
`;

const EmptyMessage = styled.p`
  color: var(--secondary-text-color);
  font-style: italic;
  margin-bottom: 1rem;
`;

const CreateButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color);
  color: var(--main-bg);
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  
  &:disabled {
    background-color: var(--secondary-text-color);
    cursor: not-allowed;
  }
`;

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OverviewSection = styled.div`
  background-color: var(--button-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
  line-height: 1.6;
`;

const WeeklySections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WeekSection = styled.div`
  border: 1px solid var(--placeholder-bg);
  border-radius: 8px;
  overflow: hidden;
`;

const WeekHeader = styled.div`
  background-color: var(--primary-color);
  color: var(--main-bg);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WeekTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const WeekFocus = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const DailyPlansContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
`;

const DayCard = styled.div`
  flex: 1 1 300px;
  border: 1px solid var(--placeholder-bg);
  border-radius: 6px;
  padding: 1rem;
  background-color: var(--main-bg);
`;

const DayHeader = styled.div`
  font-weight: bold;
  color: var(--primary-color);
  border-bottom: 1px solid var(--placeholder-bg);
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
`;

const MealsSection = styled.div`
  margin-bottom: 1rem;
`;

const MealTitle = styled.h5`
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  margin: 0.5rem 0;
`;

const MealContent = styled.p`
  margin: 0.25rem 0 0.75rem;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ExerciseSection = styled.div`
  margin-bottom: 1rem;
  background-color: var(--button-bg);
  padding: 0.75rem;
  border-radius: 4px;
`;

const ExerciseTitle = styled.h5`
  font-size: 0.9rem;
  color: var(--accent-color);
  margin: 0 0 0.5rem;
`;

const ExerciseDetail = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
`;

const ExerciseDescription = styled.p`
  margin: 0.25rem 0;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const CaloriesSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: var(--secondary-text-color);
`;

const TipSection = styled.div`
  font-style: italic;
  font-size: 0.85rem;
  color: var(--secondary-text-color);
  border-top: 1px dashed var(--placeholder-bg);
  padding-top: 0.75rem;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: rgba(255, 0, 0, 0.1);
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
`;

const LoadingText = styled.p`
  color: var(--text-color);
  margin-top: 1rem;
  font-style: italic;
`;

const MonthlyScheduleSection = ({ selectedDate, monthlyScheduleData, onUpdate }) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [scheduleData, setScheduleData] = useState(monthlyScheduleData);
  
  const loadScheduleData = useCallback(async (date) => {
    if (!isValid(date)) {
      setError('유효하지 않은 날짜입니다.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const monthDate = format(date, 'yyyy-MM-dd');
      const response = await fetchMonthlySchedule(monthDate);
      
      if (!response.success) {
        setError(response.message || '월간 스케줄을 불러오는 중 오류가 발생했습니다.');
        setScheduleData(null);
      } else if (!response.hasSchedule) {
        setScheduleData(null);
      } else {
        setScheduleData(response.data);
      }
      
    } catch (error) {
      setError('서버 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('월간 스케줄 불러오기 중 오류:', error);
      setScheduleData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (monthlyScheduleData) {
      setScheduleData(monthlyScheduleData);
      setIsLoading(false);
    } else if (selectedDate && isValid(selectedDate)) {
      loadScheduleData(selectedDate);
    } else {
      setIsLoading(false);
    }
  }, [selectedDate, monthlyScheduleData, loadScheduleData]);
  
  if (!selectedDate || !isValid(selectedDate)) {
    return (
      <Container>
        <EmptyState>
          <EmptyMessage>유효하지 않은 날짜입니다.</EmptyMessage>
        </EmptyState>
      </Container>
    );
  }
  
  const handlePrevMonth = () => {
    const newDate = addMonths(currentDate, -1);
    setCurrentDate(newDate);
    loadScheduleData(newDate);
  };
  
  const handleNextMonth = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const viewingMonth = currentDate.getMonth();
    const viewingYear = currentDate.getFullYear();
    
    if (viewingYear > currentYear || (viewingYear === currentYear && viewingMonth >= currentMonth)) {
      return;
    }
    
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    loadScheduleData(newDate);
  };
  
  const handleCreateSchedule = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const monthDate = format(currentDate, 'yyyy-MM-dd');
      const response = await createMonthlySchedule(monthDate);
      
      if (response.success) {
        setScheduleData(response.data);
        if (onUpdate) {
          onUpdate();
        }
      } else {
        setError(response.message || '월간 스케줄 생성 중 오류가 발생했습니다.');
      }
      
    } catch (error) {
      setError('서버 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('월간 스케줄 생성 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderDayCard = (dayPlan) => (
    <DayCard key={dayPlan.day}>
      <DayHeader>{dayPlan.day}일</DayHeader>
      
      <MealsSection>
        <MealTitle>아침</MealTitle>
        <MealContent>{dayPlan.meals.breakfast}</MealContent>
        
        <MealTitle>점심</MealTitle>
        <MealContent>{dayPlan.meals.lunch}</MealContent>
        
        <MealTitle>저녁</MealTitle>
        <MealContent>{dayPlan.meals.dinner}</MealContent>
        
        {dayPlan.meals.snacks && (
          <>
            <MealTitle>간식</MealTitle>
            <MealContent>{dayPlan.meals.snacks}</MealContent>
          </>
        )}
      </MealsSection>
      
      <ExerciseSection>
        <ExerciseTitle>{dayPlan.exercise.type}</ExerciseTitle>
        <ExerciseDetail>
          <span>시간: {dayPlan.exercise.duration}분</span>
          <span>강도: {dayPlan.exercise.intensity === 'low' ? '낮음' : 
            dayPlan.exercise.intensity === 'medium' ? '중간' : '높음'}</span>
        </ExerciseDetail>
        <ExerciseDescription>{dayPlan.exercise.description}</ExerciseDescription>
      </ExerciseSection>
      
      <CaloriesSection>
        <div>섭취 예상: {dayPlan.estimatedCalories.intake}kcal</div>
        <div>소모 예상: {dayPlan.estimatedCalories.burned}kcal</div>
      </CaloriesSection>
      
      <TipSection>💡 {dayPlan.tips}</TipSection>
    </DayCard>
  );
  
  return (
    <Container>
      <Title>월간 목표</Title>
      <MonthNavigation>
        <NavButton 
          onClick={handlePrevMonth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isLoading}
        >
          &lt;
        </NavButton>
        <MonthName>
          {format(currentDate, 'yyyy년 MM월', { locale: ko })}
        </MonthName>
        <NavButton 
          onClick={handleNextMonth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isLoading || 
            (currentDate.getMonth() >= new Date().getMonth() && 
             currentDate.getFullYear() >= new Date().getFullYear())}
        >
          &gt;
        </NavButton>
      </MonthNavigation>
      
      {isLoading ? (
        <LoadingContainer>
          <div role="img" aria-label="loading">⏳</div>
          <LoadingText>월간 목표 정보를 불러오는 중입니다...</LoadingText>
        </LoadingContainer>
      ) : !scheduleData ? (
        <EmptyState>
          <EmptyMessage>
            이 달에 대한 목표 스케줄이 아직 없습니다. 아래 버튼을 클릭하여 AI가 이 달의 식단과 운동 계획을 생성하도록 해보세요.
          </EmptyMessage>
          
          <CreateButton
            onClick={handleCreateSchedule}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? '생성 중...' : '월간 스케줄 생성하기'}
          </CreateButton>
        </EmptyState>
      ) : (
        <ScheduleContainer>
          <OverviewSection>
            {scheduleData.schedule.overview}
          </OverviewSection>
          
          <WeeklySections>
            {scheduleData.schedule.weeklyPlans.map((weekPlan) => (
              <WeekSection key={`week-${weekPlan.week}`}>
                <WeekHeader>
                  <WeekTitle>{weekPlan.week}주차</WeekTitle>
                  <WeekFocus>중점 목표: {weekPlan.focus}</WeekFocus>
                </WeekHeader>
                
                <DailyPlansContainer>
                  {weekPlan.dailyPlans.map(renderDayCard)}
                </DailyPlansContainer>
              </WeekSection>
            ))}
          </WeeklySections>
        </ScheduleContainer>
      )}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default MonthlyScheduleSection; 