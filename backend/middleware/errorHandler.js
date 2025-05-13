const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || '서버 내부 오류가 발생했습니다. 관리자에게 문의해주세요.';

  
  if (err.isOperational) {

  } else {
  
    if (process.env.NODE_ENV === 'production') {
        message = '요청 처리 중 예기치 않은 오류가 발생했습니다.';
    } else {

        message = err.message || '알 수 없는 서버 오류 (개발용)';
    }
    statusCode = 500; 
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = errorHandler; 