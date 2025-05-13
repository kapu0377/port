import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const RegisterPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: calc(100vh - 160px); // 헤더와 푸터 높이를 고려
  background-color: var(--main-bg);
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  background-color: var(--secondary-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid var(--placeholder-bg);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--main-bg);
  color: var(--primary-color);
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px var(--accent-color-opacity-30);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--accent-color-dark);
  }

  &:disabled {
    background-color: var(--placeholder-bg);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: var(--error-color);
  text-align: center;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  min-height: 1.2em; // 메시지 없을 때도 공간 차지
`;

function RegisterPage({ API_BASE_URL }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('회원가입 성공:', data.message);
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
      } else {
        setError(data.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('회원가입 요청 오류:', err);
      setError('회원가입 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterPageContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <Input
          type="text"
          placeholder="사용자 아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-label="사용자 아이디"
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="비밀번호"
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          aria-label="비밀번호 확인"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '가입 처리 중...' : '회원가입'}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </RegisterForm>
    </RegisterPageContainer>
  );
}

export default RegisterPage; 