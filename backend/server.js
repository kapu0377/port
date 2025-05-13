require('dotenv').config(); 

const express = require('express');
const session = require('express-session');
const cors = require('cors'); 
const { createClient } = require('redis'); 
const { RedisStore } = require('connect-redis');

const { pool, testConnection } = require('./config/db');

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  },
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.connect().catch(err => {
  console.error('Redis 클라이언트 연결 실패:', err);
  process.exit(1);
});

redisClient.on('connect', () => {
  console.log('Redis 클라이언트에 성공적으로 연결되었습니다.');
  redisClient.ping()
    .then(reply => console.log('Redis PING 테스트 성공:', reply))
    .catch(err => console.error('Redis PING 테스트 오류:', err));
});

redisClient.on('error', (err) => {
  console.error('Redis 클라이언트 오류 발생:', err);
});

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'session:', 
});

const app = express();

app.set('redisClient', redisClient);

const PORT = process.env.PORT || 3001; 

app.set('trust proxy', 1); 

const HOST = process.env.HOST || 'localhost';
const BASE_URL = `http${process.env.NODE_ENV === 'production' ? 's' : ''}://${HOST}:${PORT}`;

const normalizeUrl = (url) => {
  try {
    if (!url) return '';
    url = url.trim().toLowerCase();
    new URL(url);
    return url.endsWith('/') ? url.slice(0, -1) : url;
  } catch (error) {
    console.error(`잘못된 URL 형식: ${url}`);
    return '';
  }
};

let rawOrigins = [];

const allowedOrigins = process.env.ALLOWED_ORIGINS || '';

const DEFAULT_DEV_URL = 'http://localhost:5173';

const isProduction = process.env.NODE_ENV === 'production';

if (process.env.CLIENT_URL) {
  const normalizedClientUrl = normalizeUrl(process.env.CLIENT_URL);
  if (normalizedClientUrl) {
    rawOrigins.push(normalizedClientUrl);
  } else {
    console.error('잘못된 CLIENT_URL 형식이 감지되었습니다.');
  }
}

if (allowedOrigins) {
  const originsArray = allowedOrigins.split(',')
    .map(url => normalizeUrl(url.trim()))
    .filter(url => url); 

  originsArray.forEach(origin => {
    if (!rawOrigins.includes(origin)) {
      rawOrigins.push(origin);
    }
  });
}

if (!isProduction && rawOrigins.length === 0) {
  console.warn('개발 환경: 기본 localhost:5173 URL을 사용합니다.');
  rawOrigins.push(DEFAULT_DEV_URL);
} else if (isProduction && rawOrigins.length === 0) {
  console.error('프로덕션 환경: CORS 허용 출처가 설정되지 않았습니다. 보안을 위해 모든 출처가 차단됩니다.');
}

const uniqueOrigins = [...new Set(rawOrigins)];

console.log('환경:', isProduction ? '프로덕션' : '개발');
console.log('설정된 CLIENT_URL:', process.env.CLIENT_URL);
console.log('설정된 ALLOWED_ORIGINS:', allowedOrigins);
console.log('CORS 허용 출처 목록:', uniqueOrigins);

app.use(cors({
    origin: function(origin, callback) {
      if (!origin && !isProduction) {
        return callback(null, true);
      }

      const normalizedOrigin = origin ? normalizeUrl(origin) : null;
      
      if (!normalizedOrigin || uniqueOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        console.error(`CORS 거부 - Origin: ${origin}, 정규화된 Origin: ${normalizedOrigin}`);
        callback(new Error('CORS 정책에 의해 차단된 요청'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Request-Id'],
    maxAge: 86400 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production' || process.env.FORCE_SECURE_COOKIE === 'true',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax'
    }
}));

app.get('/', (req, res) => {
    res.send('Hello from Express Backend! DB 연결 테스트는 서버 로그를 확인하세요.');
});

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const dietRoutes = require('./routes/diet');
app.use('/my-api/auth', authRoutes); 
app.use('/my-api/profile', profileRoutes);
app.use('/my-api/diet', dietRoutes);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

async function startServer() {
    try {
        await testConnection(); 
        app.listen(PORT, () => {
            console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
        });
    } catch (error) {
        console.error('서버 시작 중 오류 발생:', error);
        process.exit(1);
    }
}

startServer(); 