const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'my_app_user', 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'my_app_db', 
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0 
});

async function testConnection() {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('MariaDB에 성공적으로 연결되었습니다. (연결 ID: ' + connection.threadId + ')');
    } catch (error) {
        console.error('MariaDB 연결 실패:', error);
     
        if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('DB 사용자 이름 또는 비밀번호가 잘못되었을 수 있습니다. .env 파일을 확인하세요.');
        } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
            console.error('DB 호스트에 연결할 수 없습니다. DB_HOST 환경변수나 DB 서버 상태를 확인하세요.');
        } else if (error.code === 'ER_BAD_DB_ERROR') {
            console.error('존재하지 않는 데이터베이스입니다. DB_DATABASE 환경변수를 확인하세요.');
        }
        process.exit(1); 
    } finally {
        if (connection) connection.release(); 
    }
}

module.exports = {
    pool,
    testConnection
}; 