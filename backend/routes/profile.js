const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { checkAuth } = require('../middleware/auth');
const { encrypt } = require('../utils/encryption');

router.get('/details', checkAuth, async (req, res) => {
  const redisClient = req.app.get('redisClient');
  if (!redisClient) {
    console.error('Redis 클라이언트를 app 객체에서 찾을 수 없습니다.');
    return res.status(500).json({ success: false, message: '서버 설정 오류' });
  }
  
  const userId = req.session.user.id;
  const cacheKey = `user:${userId}:profile`;
  let connection;

  try {
    const cachedProfile = await redisClient.get(cacheKey);
    if (cachedProfile) {
      console.log('사용자 프로필 캐시 히트:', cacheKey);
      return res.status(200).json(JSON.parse(cachedProfile));
    }

    console.log('사용자 프로필 캐시 미스:', cacheKey);
    connection = await pool.getConnection();
    
    const [users] = await connection.query(
      'SELECT id, username, current_weight_kg, height_cm, created_at, updated_at FROM users WHERE id = ?', 
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: '사용자 정보를 찾을 수 없습니다.' 
      });
    }

    const user = users[0];
    const responseData = {
      success: true,
      message: '사용자 정보 조회 성공',
      user
    };

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(responseData));

    res.status(200).json(responseData);

  } catch (error) {
    console.error('사용자 정보 조회 중 오류 발생:', error);
    res.status(500).json({ 
      success: false,
      message: '서버 오류로 인해 사용자 정보 조회에 실패했습니다.' 
    });
  } finally {
    if (connection) connection.release();
  }
});

router.put('/update', checkAuth, async (req, res) => {
  const { current_weight_kg, height_cm } = req.body;
  const userId = req.session.user.id;
  
  if (current_weight_kg !== undefined && (isNaN(current_weight_kg) || current_weight_kg <= 0)) {
    return res.status(400).json({
      success: false,
      message: '올바른 체중을 입력해주세요.'
    });
  }
  
  if (height_cm !== undefined && (isNaN(height_cm) || height_cm <= 0)) {
    return res.status(400).json({
      success: false,
      message: '올바른 신장을 입력해주세요.'
    });
  }
  
  let connection;
  try {
    connection = await pool.getConnection();
    
    const [result] = await connection.query(
      'UPDATE users SET current_weight_kg = ?, height_cm = ?, updated_at = NOW() WHERE id = ?',
      [current_weight_kg, height_cm, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        message: '사용자 정보를 찾을 수 없습니다.' 
      });
    }

    res.status(200).json({ 
      success: true,
      message: '신체 정보가 성공적으로 업데이트되었습니다.'
    });

  } catch (error) {
    console.error('신체 정보 업데이트 중 오류 발생:', error);
    res.status(500).json({ 
      success: false,
      message: '서버 오류로 인해 신체 정보 업데이트에 실패했습니다.' 
    });
  } finally {
    if (connection) connection.release();
  }
});

router.put('/api-key', checkAuth, async (req, res) => {
  const { apiKey } = req.body;
  const userId = req.session.user.id;

  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
    return res.status(400).json({ 
      success: false,
      message: '유효한 API 키를 입력해주세요.' 
    });
  }
  
  let connection;
  try {
    connection = await pool.getConnection();
    
    const encryptedApiKey = encrypt(apiKey.trim());
    
    const [result] = await connection.query(
      'UPDATE users SET gemini_api_key = ?, updated_at = NOW() WHERE id = ?',
      [encryptedApiKey, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        message: '사용자 정보를 찾을 수 없습니다.' 
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'API 키가 성공적으로 저장되었습니다.',
      hasApiKey: true
    });

  } catch (error) {
    console.error('API 키 저장 중 오류 발생:', error);
    res.status(500).json({ 
      success: false,
      message: '서버 오류로 인해 API 키 저장에 실패했습니다.' 
    });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router; 