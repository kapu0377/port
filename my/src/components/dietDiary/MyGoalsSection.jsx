import React from 'react';
import styled from 'styled-components';
import { format, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';

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

const EmptyState = styled.div`
  text-align: center;
  padding: 1rem;
  color: var(--secondary-text-color);
  font-style: italic;
`;

const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GoalItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.div`
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.9rem;
`;

const Value = styled.div`
  font-weight: bold;
  color: var(--primary-color);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: var(--placeholder-bg);
  border-radius: 6px;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => Math.min(Math.max(props.percent, 0), 100)}%;
  background-color: ${props => {
    if (props.percent >= 90) return 'green';
    if (props.percent >= 50) return 'orange';
    return 'red';
  }};
  transition: width 0.3s ease;
`;

const DaysLeft = styled.div`
  text-align: center;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: var(--button-bg);
  border-radius: 6px;
  font-weight: bold;
  color: ${props => props.days <= 7 ? 'red' : 'var(--text-color)'};
`;

const DietGoalText = styled.div`
  margin-top: 0.25rem;
  padding: 0.5rem;
  border-radius: 6px;
  background-color: ${props => {
    switch (props.goal) {
      case 'weight_loss': return 'rgba(255, 0, 0, 0.1)';
      case 'weight_gain': return 'rgba(0, 128, 0, 0.1)';
      case 'maintenance': return 'rgba(0, 0, 255, 0.1)';
      case 'muscle_gain': return 'rgba(128, 0, 128, 0.1)';
      default: return 'var(--button-bg)';
    }
  }};
  font-weight: 500;
  text-align: center;
  color: var(--text-color);
`;

const ActivityLevel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.25rem;
`;

const ActivityDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--accent-color)' : 'var(--placeholder-bg)'};
  margin: 0 3px;
`;

// 다이어트 목표를 한글로 표시하는 함수
const getDietGoalLabel = (goal) => {
  const goals = {
    weight_loss: '체중 감량',
    weight_gain: '체중 증가',
    maintenance: '체중 유지',
    muscle_gain: '근육 증가'
  };
  return goals[goal] || goal;
};

// 활동량 수준을 한글로 표시하는 함수
const getActivityLevelLabel = (level) => {
  const levels = {
    sedentary: '거의 활동 없음',
    lightly_active: '가벼운 활동 (주 1-3일 운동)',
    moderately_active: '중간 활동 (주 3-5일 운동)',
    very_active: '활발한 활동 (주 6-7일 운동)',
    extremely_active: '매우 활발한 활동 (하루 2회 이상 운동)'
  };
  return levels[level] || level;
};

// 활동량 수준에 따라 점수(1-5) 반환
const getActivityLevelScore = (level) => {
  const scores = {
    sedentary: 1,
    lightly_active: 2,
    moderately_active: 3,
    very_active: 4,
    extremely_active: 5
  };
  return scores[level] || 3;
};

const MyGoalsSection = ({ goals }) => {
  if (!goals) {
    return (
      <Container>
        <Title>나의 목표</Title>
        <EmptyState>
          설정된 목표가 없습니다.
        </EmptyState>
      </Container>
    );
  }
  
  // 목표 달성까지 남은 일수 계산
  const today = new Date();
  const targetDate = new Date(goals.target_date);
  const daysLeft = differenceInDays(targetDate, today);
  
  // 활동량 수준 점수
  const activityScore = getActivityLevelScore(goals.activity_level);
  
  return (
    <Container>
      <Title>나의 목표</Title>
      
      <GoalsList>
        <GoalItem>
          <Label>목표 체중</Label>
          <Value>{goals.target_weight_kg}kg</Value>
        </GoalItem>
        
        <GoalItem>
          <Label>목표 일일 칼로리</Label>
          <Value>{goals.target_daily_calories}kcal</Value>
        </GoalItem>
        
        <GoalItem>
          <Label>목표 일일 운동 시간</Label>
          <Value>{goals.target_daily_exercise_minutes}분</Value>
        </GoalItem>
        
        <GoalItem>
          <Label>다이어트 목표</Label>
          <DietGoalText goal={goals.diet_goal}>
            {getDietGoalLabel(goals.diet_goal)}
          </DietGoalText>
        </GoalItem>
        
        <GoalItem>
          <Label>활동량 수준</Label>
          <ActivityLevel>
            {[1, 2, 3, 4, 5].map(score => (
              <ActivityDot key={score} active={score <= activityScore} />
            ))}
          </ActivityLevel>
          <div style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {getActivityLevelLabel(goals.activity_level)}
          </div>
        </GoalItem>
        
        {daysLeft >= 0 && (
          <DaysLeft days={daysLeft}>
            목표일까지 {daysLeft}일 남음
            <div style={{ fontSize: '0.8rem', fontWeight: 'normal', marginTop: '0.25rem' }}>
              {format(targetDate, 'yyyy년 MM월 dd일', { locale: ko })}
            </div>
          </DaysLeft>
        )}
      </GoalsList>
    </Container>
  );
};

export default MyGoalsSection; 