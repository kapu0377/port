import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

import { createDailyEvaluation } from '../../services/dietService';

const Container = styled.div`
  background-color: var(--main-bg);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const SectionTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const EvaluationContainer = styled.div`
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

const DailyEvaluationSection = ({ selectedDate, evaluation, meals = [], exercises = [], onEvaluationCreated }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 평가 요청 가능 여부 확인
  const canRequestEvaluation = meals.length > 0 || exercises.length > 0;
  
  // 평가 요청 핸들러
  const handleRequestEvaluation = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await createDailyEvaluation(format(selectedDate, 'yyyy-MM-dd'));
      
      if (response.success) {
        // 부모 컴포넌트에 평가 결과 전달
        if (onEvaluationCreated) {
          onEvaluationCreated(response.evaluation);
        }
      } else {
        setError(response.message || '일일 평가 요청 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('서버 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('일일 평가 요청 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Container>
      <SectionTitle>일일 평가</SectionTitle>
      
      {isLoading ? (
        <LoadingContainer>
          <div role="img" aria-label="loading">⏳</div>
          <LoadingText>LLM을 통해 당신의 하루를 분석 중입니다...</LoadingText>
        </LoadingContainer>
      ) : evaluation ? (
        <EvaluationContainer>
          <ScoreSection>
            <ScoreLabel>오늘의 점수</ScoreLabel>
            <ScoreValue value={evaluation.score}>{evaluation.score}/100</ScoreValue>
          </ScoreSection>
          
          <EvaluationSection>
            <EvaluationItem>
              <EvaluationItemTitle>
                <span role="img" aria-label="strength">💪</span>
                강점
              </EvaluationItemTitle>
              <EvaluationContent>{evaluation.strengths}</EvaluationContent>
            </EvaluationItem>
            
            <EvaluationItem>
              <EvaluationItemTitle>
                <span role="img" aria-label="weakness">🔍</span>
                개선할 점
              </EvaluationItemTitle>
              <EvaluationContent>{evaluation.weaknesses}</EvaluationContent>
            </EvaluationItem>
            
            <EvaluationItem>
              <EvaluationItemTitle>
                <span role="img" aria-label="improvements">📈</span>
                개선 방안
              </EvaluationItemTitle>
              <EvaluationContent>{evaluation.improvements}</EvaluationContent>
            </EvaluationItem>
          </EvaluationSection>
          
          <EvaluationSection>
            <EvaluationTitle>상세 평가</EvaluationTitle>
            <EvaluationContent>{evaluation.llm_evaluation}</EvaluationContent>
          </EvaluationSection>
        </EvaluationContainer>
      ) : (
        <EmptyState>
          <EmptyMessage>
            {canRequestEvaluation
              ? '아직 오늘의 평가가 없습니다. 평가 요청 버튼을 클릭하여 AI가 당신의 하루를 평가하도록 해보세요.'
              : '식단이나 운동을 먼저 기록해야 평가를 요청할 수 있습니다.'}
          </EmptyMessage>
          
          <EvaluateButton
            onClick={handleRequestEvaluation}
            disabled={!canRequestEvaluation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            평가 요청하기
          </EvaluateButton>
        </EmptyState>
      )}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default DailyEvaluationSection; 