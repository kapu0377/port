const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');
const { decrypt } = require('../utils/encryption');



class APIKeyService {
    constructor() {
        this.apiKey = null;
    }

    async loadApiKeyFromDB(userId) {
        let connection;
        try {
            connection = await pool.getConnection();
            
            const [rows] = await connection.query(
                'SELECT gemini_api_key FROM users WHERE id = ?',
                [userId]
            );
            
            if (rows.length > 0 && rows[0].gemini_api_key) {
                const encryptedKeyFromDB = rows[0].gemini_api_key;
                const decryptedKey = decrypt(encryptedKeyFromDB);
                
                if (decryptedKey === null) {
                    console.error('Failed to decrypt API key for user', userId);
                    return null;
                }
                
                this.apiKey = decryptedKey;
                return decryptedKey;
            } else {
                console.log('사용자의 API 키가 설정되지 않았습니다.');
                return null;
            }
        } catch (error) {
            console.error('DB에서 API 키 로드 중 오류:', error);
            throw new Error('DB에서 API 키를 로드할 수 없습니다: ' + error.message);
        } finally {
            if (connection) connection.release();
        }
    }

    async getApiKey(userId) {
        if (!userId) {
            console.error('사용자 ID가 제공되지 않았습니다.');
            throw new Error('API 키를 로드하려면 사용자 ID가 필요합니다.');
        }
        return await this.loadApiKeyFromDB(userId);
    }
}

module.exports = new APIKeyService(); 