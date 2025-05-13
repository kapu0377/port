import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { createDietPlan } from '../../services/dietService';

const Container = styled.div`
  background-color: var(--main-bg);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const Description = styled.p`
  color: var(--text-color);
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const Textarea = styled.textarea`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--placeholder-bg);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: var(--accent-color);
  color: var(--main-bg);
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  align-self: flex-end;
  
  &:disabled {
    background-color: var(--secondary-text-color);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: rgba(255, 0, 0, 0.1);
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: rgba(0, 255, 0, 0.1);
`;

const DietPlanSection = ({ onPlanCreated }) => {
  const [formData, setFormData] = useState({
    target_weight_kg: '',
    target_daily_calories: '',
    target_daily_exercise_minutes: '',
    activity_level: 'moderately_active',
    diet_goal: 'weight_loss',
    target_date: '',
    notes: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await createDietPlan(formData);
      
      if (response.success) {
        setSuccess(response.message);
        
        if (onPlanCreated) {
          onPlanCreated(formData, response.scheduleCreated);
        }
        
        setFormData({
          target_weight_kg: '',
          target_daily_calories: '',
          target_daily_exercise_minutes: '',
          activity_level: 'moderately_active',
          diet_goal: 'weight_loss',
          target_date: '',
          notes: ''
        });
      } else {
        setError(response.message || '목표 설정 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('목표 설정 오류:', error);
      setError('서버 연결 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Container>
      <Title>다이어트 계획 작성</Title>
      <Description>
        다이어트 일기를 시작하기 전에 나만의 다이어트 계획을 설정해주세요. 
        이 계획은 일일 평가, 주간 평가, 월간 평가의 기준이 됩니다.
      </Description>
      
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="target_weight_kg">목표 체중 (kg)</Label>
            <Input
              type="number"
              id="target_weight_kg"
              name="target_weight_kg"
              value={formData.target_weight_kg}
              onChange={handleChange}
              min="30"
              max="200"
              step="0.1"
              placeholder="예: 65.0"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="target_daily_calories">목표 일일 칼로리 섭취량</Label>
            <Input
              type="number"
              id="target_daily_calories"
              name="target_daily_calories"
              value={formData.target_daily_calories}
              onChange={handleChange}
              min="500"
              max="5000"
              placeholder="예: 1800"
              required
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="target_daily_exercise_minutes">목표 일일 운동 시간 (분)</Label>
            <Input
              type="number"
              id="target_daily_exercise_minutes"
              name="target_daily_exercise_minutes"
              value={formData.target_daily_exercise_minutes}
              onChange={handleChange}
              min="0"
              max="300"
              placeholder="예: 30"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="target_date">목표 달성 희망일</Label>
            <Input
              type="date"
              id="target_date"
              name="target_date"
              value={formData.target_date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="activity_level">운동량 목표</Label>
            <Select
              id="activity_level"
              name="activity_level"
              value={formData.activity_level}
              onChange={handleChange}
              required
            >
              <option value="sedentary">거의 활동 없음</option>
              <option value="lightly_active">가벼운 활동 (주 1-3일 운동)</option>
              <option value="moderately_active">중간 활동 (주 3-5일 운동)</option>
              <option value="very_active">활발한 활동 (주 6-7일 운동)</option>
              <option value="extremely_active">매우 활발한 활동 (하루 2회 이상 운동)</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="diet_goal">다이어트 목표</Label>
            <Select
              id="diet_goal"
              name="diet_goal"
              value={formData.diet_goal}
              onChange={handleChange}
              required
            >
              <option value="weight_loss">체중 감량</option>
              <option value="weight_gain">체중 증가</option>
              <option value="maintenance">체중 유지</option>
              <option value="muscle_gain">근육 증가</option>
            </Select>
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <Label htmlFor="notes">추가 목표 및 특이사항</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="다이어트 계획에 대한 추가 목표나 특이사항을 자유롭게 작성해주세요."
          />
        </FormGroup>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? '저장 중...' : '다이어트 계획 저장하기'}
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default DietPlanSection; 