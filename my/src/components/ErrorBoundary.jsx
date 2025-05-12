import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: var(--primary-color);
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: var(--text-color);
  margin-bottom: 1.5rem;
`;

const RetryButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("에러 발생:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>페이지 로딩 중 오류가 발생했습니다</ErrorTitle>
          <ErrorMessage>
            죄송합니다. 페이지를 불러오는 중 문제가 발생했습니다. 
            네트워크 연결을 확인하시거나 잠시 후 다시 시도해 주세요.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            새로고침
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 