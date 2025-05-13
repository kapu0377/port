import React, { useState } from 'react';
import styled from 'styled-components';
import { format, isValid } from 'date-fns';
import { motion } from 'framer-motion';

import { saveExercise } from '../../services/dietService';

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

const AddButton = styled(motion.button)`
  background-color: var(--accent-color);
  color: var(--main-bg);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 0;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--secondary-text-color);
  font-style: italic;
`;

const ExerciseCard = styled.div`
  border: 1px solid var(--placeholder-bg);
  border-radius: 8px;
  padding: 1rem;
  background-color: var(--button-bg);
`;

const ExerciseType = styled.div`
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const ExerciseDetails = styled.div`
  margin-bottom: 0.5rem;
  line-height: 1.4;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CaloriesBurned = styled.div`
  font-weight: 500;
  color: var(--secondary-text-color);
  margin-top: 0.25rem;
`;

const FormOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FormContainer = styled(motion.div)`
  background-color: var(--main-bg);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  width: 90%;
  max-width: 500px;
`;

const FormTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--placeholder-bg);
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--placeholder-bg);
  font-size: 1rem;
  background-color: var(--main-bg);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: var(--button-bg);
  color: var(--text-color);
  border: none;
`;

const SubmitButton = styled(Button)`
  background-color: var(--accent-color);
  color: var(--main-bg);
  border: none;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const getIntensityLabel = (intensity) => {
  const intensities = {
    low: '낮음',
    medium: '중간',
    high: '높음'
  };
  return intensities[intensity] || intensity;
};

const ExerciseRecordSection = ({ selectedDate, exercises = [], onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    exercise_type: '',
    duration_minutes: '',
    intensity: 'medium',
    exercise_date: selectedDate && isValid(selectedDate) ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleOpenForm = () => {
    if (!selectedDate || !isValid(selectedDate)) {
      setError('유효하지 않은 날짜입니다.');
      return;
    }

    setFormData({
      exercise_type: '',
      duration_minutes: '',
      intensity: 'medium',
      exercise_date: format(selectedDate, 'yyyy-MM-dd')
    });
    setError('');
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (!formData.exercise_type.trim()) {
      setError('운동 종류를 입력해주세요.');
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.duration_minutes || parseInt(formData.duration_minutes) <= 0) {
      setError('유효한 운동 시간을 입력해주세요.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await saveExercise(formData);
      
      if (response.success) {
        // 폼 닫기
        setShowForm(false);
        
        if (onUpdate) {
          onUpdate();
        }
      } else {
        setError(response.message || '운동 기록 저장 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('서버 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('운동 기록 저장 중 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Container>
      <SectionTitle>
        오늘의 운동
        <AddButton
          onClick={handleOpenForm}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          +
        </AddButton>
      </SectionTitle>
      
      <ExerciseList>
        {exercises.length === 0 ? (
          <EmptyState>
            오늘 기록된 운동이 없습니다. + 버튼을 클릭하여 운동을 기록해보세요.
          </EmptyState>
        ) : (
          exercises.map(exercise => (
            <ExerciseCard key={exercise.id}>
              <ExerciseType>{exercise.exercise_type}</ExerciseType>
              <ExerciseDetails>
                <Detail>
                  <span role="img" aria-label="시간">⏱️</span>
                  {exercise.duration_minutes}분
                </Detail>
                <Detail>
                  <span role="img" aria-label="강도">💪</span>
                  강도: {getIntensityLabel(exercise.intensity)}
                </Detail>
              </ExerciseDetails>
              <CaloriesBurned>약 {Math.round(exercise.calories_burned)}kcal 소모</CaloriesBurned>
            </ExerciseCard>
          ))
        )}
      </ExerciseList>
      
      {/* 운동 입력 폼 모달 */}
      {showForm && (
        <FormOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseForm}
        >
          <FormContainer
            onClick={e => e.stopPropagation()}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <FormTitle>운동 기록하기</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="exercise_type">운동 종류</Label>
                <Input
                  id="exercise_type"
                  name="exercise_type"
                  value={formData.exercise_type}
                  onChange={handleChange}
                  placeholder="예: 걷기, 달리기, 수영, 자전거, 헬스 등"
                  required
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="duration_minutes">운동 시간 (분)</Label>
                  <Input
                    type="number"
                    id="duration_minutes"
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    onChange={handleChange}
                    min="1"
                    max="300"
                    placeholder="예: 30"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="intensity">운동 강도</Label>
                  <Select
                    id="intensity"
                    name="intensity"
                    value={formData.intensity}
                    onChange={handleChange}
                    required
                  >
                    <option value="low">낮음 (가벼운 활동)</option>
                    <option value="medium">중간 (숨이 약간 찬 정도)</option>
                    <option value="high">높음 (숨이 많이 차고 땀을 흘림)</option>
                  </Select>
                </FormGroup>
              </FormRow>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <ButtonGroup>
                <CancelButton
                  type="button"
                  onClick={handleCloseForm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  취소
                </CancelButton>
                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? '저장 중...' : '저장하기'}
                </SubmitButton>
              </ButtonGroup>
            </Form>
          </FormContainer>
        </FormOverlay>
      )}
    </Container>
  );
};

export default ExerciseRecordSection; 