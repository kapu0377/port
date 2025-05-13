import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: calc(100vh - 160px); // 헤더와 푸터 높이를 고려한 값
  background-color: var(--main-bg);
`;

const LoginForm = styled.form`
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
  min-height: 1.2em; // 에러 메시지가 없을 때도 공간 차지
`;

function LoginPage({ API_BASE_URL, setIsLoggedIn, setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        console.log('로그인 성공:', data.user);
        
        // 이전 페이지가 있으면 해당 페이지로, 없으면 홈으로 이동
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        setError(data.message || '로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
      }
    } catch (err) {
      console.error('로그인 요청 오류:', err);
      setError('로그인 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>로그인</Title>
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </LoginPageContainer>
  );
}

export default LoginPage; 