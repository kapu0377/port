const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const { checkAuth } = require('../middleware/auth');
const { hashPassword, comparePassword } = require('../utils/encryption');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 
            success: false,
            message: '사용자 이름과 비밀번호를 모두 입력해주세요.' 
        });
    }

    if (password.length < 6) { 
        return res.status(400).json({ 
            success: false,
            message: '비밀번호는 최소 6자 이상이어야 합니다.' 
        });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        const [users] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length > 0) {
            return res.status(409).json({ 
                success: false,
                message: '이미 사용 중인 사용자 이름입니다.' 
            });
        }

        const hashedPassword = await hashPassword(password);

        const [result] = await connection.query(
            'INSERT INTO users (username, password_hash) VALUES (?, ?)',
            [username, hashedPassword]
        );

        if (result.affectedRows === 1) {
            console.log(`새로운 사용자 등록: ${username} (ID: ${result.insertId})`);
            res.status(201).json({ 
                success: true,
                message: '회원가입이 성공적으로 완료되었습니다.',
                userId: result.insertId 
            });
        } else {
            throw new Error('사용자 등록에 실패했습니다.');
        }

    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        res.status(500).json({ 
            success: false,
            message: '서버 오류로 인해 회원가입에 실패했습니다.' 
        });
    } finally {
        if (connection) connection.release();
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 
            success: false,
            message: '사용자 이름과 비밀번호를 모두 입력해주세요.' 
        });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        const [users] = await connection.query(
            'SELECT id, username, password_hash FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ 
                success: false,
                message: '사용자 이름 또는 비밀번호가 올바르지 않습니다.' 
            });
        }

        const user = users[0];
        const passwordMatch = await comparePassword(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ 
                success: false,
                message: '사용자 이름 또는 비밀번호가 올바르지 않습니다.' 
            });
        }

        req.session.user = {
            id: user.id,
            username: user.username
        };
        
        console.log(`사용자 로그인 성공: ${user.username} (ID: ${user.id}), 세션 ID: ${req.session.id}`);
        res.status(200).json({ 
            success: true,
            message: '로그인 성공', 
            user: { 
                id: user.id, 
                username: user.username 
            } 
        });

    } catch (error) {
        console.error('로그인 중 오류 발생:', error);
        res.status(500).json({ 
            success: false,
            message: '서버 오류로 인해 로그인에 실패했습니다.' 
        });
    } finally {
        if (connection) connection.release();
    }
});

router.post('/logout', checkAuth, (req, res) => {
    console.log(`사용자 로그아웃: ${req.session.user.username} (ID: ${req.session.user.id}), 세션 ID: ${req.session.id}`);
    req.session.destroy(err => {
        if (err) {
            console.error('세션 파기 중 오류 발생:', err);
            return res.status(500).json({ 
                success: false,
                message: '로그아웃 중 오류가 발생했습니다.' 
            });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ 
            success: true,
            message: '성공적으로 로그아웃되었습니다.' 
        });
    });
});

router.get('/status', (req, res) => {
    if (req.session.user) {
        res.status(200).json({
            success: true,
            isLoggedIn: true,
            user: {
                id: req.session.user.id,
                username: req.session.user.username
            }
        });
    } else {
        res.status(200).json({ 
            success: true,
            isLoggedIn: false 
        }); 
    }
});

module.exports = router; 