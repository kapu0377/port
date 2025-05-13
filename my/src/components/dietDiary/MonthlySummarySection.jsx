import React, { useState } from 'react';
import styled from 'styled-components';
import { format, startOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';
import { motion } from 'framer-motion';

// API 서비스
import { createMonthlyEvaluation } from '../../services/dietService';

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

const MonthInfo = styled.div`
  background-color: var(--button-bg);
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 500;
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

const EvaluateButton = styled(motion.button)`
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

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ScoreSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--placeholder-bg);
`;

const ScoreLabel = styled.div`
  font-weight: bold;
  color: var(--text-color);
`;

const ScoreValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => {
    if (props.value >= 80) return 'green';
    if (props.value >= 60) return 'orange';
    return 'red';
  }};
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--button-bg);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--primary-color);
`;

const EvaluationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EvaluationTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.2rem;
`;

const EvaluationContent = styled.div`
  line-height: 1.6;
  color: var(--text-color);
  white-space: pre-line;
`;

const EvaluationItem = styled.div`
  margin-bottom: 1rem;
`;

const EvaluationItemTitle = styled.h4`
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const MonthlySummarySection = ({ selectedDate, monthlyData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 선택된 월의 첫 날 (1일)
  const firstDayOfMonth = startOfMonth(selectedDate);
  
  // 월간 평가 요청 핸들러
  const handleRequestEvaluation = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const monthDateStr = format(firstDayOfMonth, 'yyyy-MM-dd');
      
      const response = await createMonthlyEvaluation(monthDateStr);
      
      if (!response.success) {
        setError(response.message || '월간 평가 요청 중 오류가 발생했습니다.');
      }
      
      // 결과는 부모 컴포넌트에서 처리 (데이터 다시 로드)
    } catch (error) {
      setError('서버 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('월간 평가 요청 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Container>
      <Title>월간 요약</Title>
      <MonthInfo>
        {format(firstDayOfMonth, 'yyyy년 MM월', { locale: ko })}
      </MonthInfo>
      
      {isLoading ? (
        <LoadingContainer>
          <div role="img" aria-label="loading">⏳</div>
          <LoadingText>LLM을 통해 이번 달 다이어트를 분석 중입니다...</LoadingText>
        </LoadingContainer>
      ) : monthlyData ? (
        <SummaryContainer>
          <ScoreSection>
            <ScoreLabel>월간 평가 점수</ScoreLabel>
            <ScoreValue value={monthlyData.score}>{monthlyData.score}/100</ScoreValue>
          </ScoreSection>
          
          <StatsContainer>
            <StatItem>
              <StatLabel>일일 평균 섭취 칼로리</StatLabel>
              <StatValue>{Math.round(monthlyData.average_daily_calories_consumed)}kcal</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>일일 평균 소모 칼로리</StatLabel>
              <StatValue>{Math.round(monthlyData.average_daily_calories_burned)}kcal</StatValue>
            </StatItem>
          </StatsContainer>
          
          <EvaluationSection>
            <EvaluationItem>
              <EvaluationItemTitle>
                <span role="img" aria-label="strength">💪</span>
                강점
              </EvaluationItemTitle>
              <EvaluationContent>{monthlyData.strengths}</EvaluationContent>
            </EvaluationItem>
            
            <EvaluationItem>
              <EvaluationItemTitle>
                <span role="img" aria-label="weakness">🔍</span>
                개선할 점
              </EvaluationItemTitle>
              <EvaluationContent>{monthlyData.weaknesses}</EvaluationContent>
            </EvaluationItem>
            
            <EvaluationItem>
              <EvaluationItemTitle>
                <span role="img" aria-label="improvements">📈</span>
                개선 방안
              </EvaluationItemTitle>
              <EvaluationContent>{monthlyData.improvements}</EvaluationContent>
            </EvaluationItem>
          </EvaluationSection>
          
          <EvaluationSection>
            <EvaluationTitle>월간 상세 평가</EvaluationTitle>
            <EvaluationContent>{monthlyData.llm_evaluation}</EvaluationContent>
          </EvaluationSection>
        </SummaryContainer>
      ) : (
        <EmptyState>
          <EmptyMessage>
            이번 달에 대한 평가가 아직 없습니다. 평가 요청 버튼을 클릭하여 AI가 이번 달을 평가하도록 해보세요.
          </EmptyMessage>
          
          <EvaluateButton
            onClick={handleRequestEvaluation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            월간 평가 요청하기
          </EvaluateButton>
        </EmptyState>
      )}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default MonthlySummarySection;