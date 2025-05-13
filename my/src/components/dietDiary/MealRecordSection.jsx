import React, { useState } from 'react';
import styled from 'styled-components';
import { format, isValid } from 'date-fns';
import { motion } from 'framer-motion';

import { saveMeal } from '../../services/dietService';

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

const MealList = styled.div`
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

const MealCard = styled.div`
  border: 1px solid var(--placeholder-bg);
  border-radius: 8px;
  padding: 1rem;
  background-color: var(--button-bg);
`;

const MealTypeLabel = styled.div`
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const MealDescription = styled.div`
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const CaloriesInfo = styled.div`
  font-weight: 500;
  color: var(--secondary-text-color);
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

const Label = styled.label`
  font-weight: 500;
  color: var(--text-color);
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--placeholder-bg);
  font-size: 1rem;
  background-color: var(--main-bg);
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--placeholder-bg);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
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

const getMealTypeLabel = (type) => {
  const types = {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁',
    snack: '간식'
  };
  return types[type] || type;
};

const MealRecordSection = ({ selectedDate, meals = [], onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    meal_type: 'breakfast',
    meal_description: '',
    meal_date: selectedDate && isValid(selectedDate) ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleOpenForm = () => {
    if (!selectedDate || !isValid(selectedDate)) {
      setError('유효하지 않은 날짜입니다.');
      return;
    }

    setFormData({
      meal_type: 'breakfast',
      meal_description: '',
      meal_date: format(selectedDate, 'yyyy-MM-dd')
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
    
    if (!formData.meal_description.trim()) {
      setError('식사 내용을 입력해주세요.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await saveMeal(formData);
      
      if (response.success) {
        setShowForm(false);
        
        if (onUpdate) {
          onUpdate();
        }
      } else {
        setError(response.message || '식단 기록 저장 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('서버 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('식단 기록 저장 중 오류:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Container>
      <SectionTitle>
        오늘의 식단
        <AddButton
          onClick={handleOpenForm}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          +
        </AddButton>
      </SectionTitle>
      
      <MealList>
        {meals.length === 0 ? (
          <EmptyState>
            오늘 기록된 식단이 없습니다. + 버튼을 클릭하여 식단을 기록해보세요.
          </EmptyState>
        ) : (
          meals.map(meal => (
            <MealCard key={meal.id}>
              <MealTypeLabel>{getMealTypeLabel(meal.meal_type)}</MealTypeLabel>
              <MealDescription>{meal.meal_description}</MealDescription>
              <CaloriesInfo>약 {Math.round(meal.calories)}kcal</CaloriesInfo>
            </MealCard>
          ))
        )}
      </MealList>
      
      {/* 식단 입력 폼 모달 */}
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
            <FormTitle>식단 기록하기</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="meal_type">식사 유형</Label>
                <Select
                  id="meal_type"
                  name="meal_type"
                  value={formData.meal_type}
                  onChange={handleChange}
                  required
                >
                  <option value="breakfast">아침</option>
                  <option value="lunch">점심</option>
                  <option value="dinner">저녁</option>
                  <option value="snack">간식</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="meal_description">식사 내용</Label>
                <Textarea
                  id="meal_description"
                  name="meal_description"
                  value={formData.meal_description}
                  onChange={handleChange}
                  placeholder="오늘 먹은 음식과 대략적인 그램수를를 적어주세요. 예: 현미밥 300g, 닭가슴살 샐러드 1인분, 사과 1개"
                  required
                />
                <small>
                  상세히 적을수록 더 정확한 칼로리 계산이 가능합니다.
                </small>
              </FormGroup>
              
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

export default MealRecordSection; 