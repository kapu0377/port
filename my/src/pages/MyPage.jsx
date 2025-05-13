import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const MyPageContainer = styled.div`
  padding: 2rem;
  text-align: center;
  min-height: calc(100vh - 160px);
  background-color: var(--main-bg);
  color: var(--primary-color);
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const Card = styled.div`
  background-color: var(--secondary-bg);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: inline-block;
  text-align: left;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 600px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
`;

const InfoItem = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  
  strong {
    color: var(--accent-color);
    margin-right: 0.5rem;
  }
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

const Message = styled.p`
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.9rem;
  
  &.success {
    background-color: var(--success-color-opacity-10);
    color: var(--success-color);
  }
  
  &.error {
    background-color: var(--error-color-opacity-10);
    color: var(--error-color);
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid var(--placeholder-bg);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--main-bg);
  color: var(--primary-color);
  width: 100%;
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px var(--accent-color-opacity-30);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid var(--placeholder-bg);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--main-bg);
  color: var(--primary-color);
  width: 100%;
  min-height: 100px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px var(--accent-color-opacity-30);
  }
`;

function MyPage({ currentUser, API_BASE_URL }) {
  const [userDetails, setUserDetails] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const [weightValue, setWeightValue] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  
  const [apiKey, setApiKey] = useState('');
  const [isApiKeyUpdating, setIsApiKeyUpdating] = useState(false);
  const [apiKeyMessage, setApiKeyMessage] = useState({ text: '', type: '' });
  
  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/details`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setUserDetails(data.user);
        if (data.user.current_weight_kg) {
          setWeightValue(data.user.current_weight_kg.toString());
        }
        if (data.user.height_cm) {
          setHeightValue(data.user.height_cm.toString());
        }
      } else {
        setMessage({ text: data.message || '사용자 정보를 가져오는데 실패했습니다.', type: 'error' });
      }
    } catch (error) {
      console.error('사용자 정보 조회 중 오류:', error);
      setMessage({ text: '서버와 통신 중 오류가 발생했습니다.', type: 'error' });
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    if (currentUser) {
      fetchUserDetails();
    }
  }, [currentUser, fetchUserDetails]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsProfileUpdating(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/profile/update`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_weight_kg: weightValue ? parseFloat(weightValue) : null,
          height_cm: heightValue ? parseFloat(heightValue) : null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ text: data.message || '신체 정보가 성공적으로 업데이트되었습니다.', type: 'success' });
        fetchUserDetails(); 
      } else {
        setMessage({ text: data.message || '신체 정보 업데이트에 실패했습니다.', type: 'error' });
      }
    } catch (error) {
      console.error('신체 정보 업데이트 중 오류:', error);
      setMessage({ text: '서버와 통신 중 오류가 발생했습니다.', type: 'error' });
    } finally {
      setIsProfileUpdating(false);
    }
  };

  const handleUpdateApiKey = async (e) => {
    e.preventDefault();
    setIsApiKeyUpdating(true);
    setApiKeyMessage({ text: '', type: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/profile/api-key`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: apiKey
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setApiKeyMessage({ 
          text: data.message || 'API 키가 성공적으로 저장되었습니다.', 
          type: 'success' 
        });
        setApiKey('');
      } else {
        setApiKeyMessage({ 
          text: data.message || 'API 키 저장에 실패했습니다.', 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('API 키 저장 중 오류:', error);
      setApiKeyMessage({ 
        text: '서버와 통신 중 오류가 발생했습니다.', 
        type: 'error' 
      });
    } finally {
      setIsApiKeyUpdating(false);
    }
  };

  return (
    <MyPageContainer>
      <Title>마이페이지</Title>
      
      <Card>
        <SectionTitle>기본 정보</SectionTitle>
        {userDetails && (
          <>
            <InfoItem>
              <strong>사용자명:</strong> {userDetails.username}
            </InfoItem>
            <InfoItem>
              <strong>가입일:</strong> {new Date(userDetails.created_at).toLocaleDateString()}
            </InfoItem>
          </>
        )}
      </Card>

      <Card>
        <SectionTitle>신체 정보</SectionTitle>
        <form onSubmit={handleUpdateProfile}>
          <InfoItem>
            <strong>현재 체중 (kg):</strong>
            <Input
              type="number"
              step="0.1"
              value={weightValue}
              onChange={(e) => setWeightValue(e.target.value)}
              placeholder="체중을 입력하세요"
            />
          </InfoItem>
          <InfoItem>
            <strong>신장 (cm):</strong>
            <Input
              type="number"
              step="0.1"
              value={heightValue}
              onChange={(e) => setHeightValue(e.target.value)}
              placeholder="신장을 입력하세요"
            />
          </InfoItem>
          <Button type="submit" disabled={isProfileUpdating}>
            {isProfileUpdating ? '업데이트 중...' : '신체 정보 업데이트'}
          </Button>
          
          {message.text && (
            <Message className={message.type}>{message.text}</Message>
          )}
        </form>
      </Card>
      
      <Card>
        <SectionTitle>Gemini API 키 설정</SectionTitle>
        <form onSubmit={handleUpdateApiKey}>
          <InfoItem>
            <strong>API 키:</strong>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Gemini API 키를 입력하세요"
            />
          </InfoItem>
          <Button type="submit" disabled={isApiKeyUpdating}>
            {isApiKeyUpdating ? '저장 중...' : 'API 키 저장'}
          </Button>
          
          {apiKeyMessage.text && (
            <Message className={apiKeyMessage.type}>{apiKeyMessage.text}</Message>
          )}
        </form>
      </Card>
    </MyPageContainer>
  );
}

export default MyPage; 