const { pool } = require('../config/db');

async function executeQuery(query, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(query, params);
    return rows;
  } catch (error) {
    console.error(`[DB Error] Query: ${query}, Params: ${params}, Error: ${error.message}`);
    throw new Error('데이터베이스 작업 중 오류가 발생했습니다.'); 
  } finally {
    if (connection) {
      connection.release();
    }
  }
}


async function executeTransaction(transactionCallback) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    
    const result = await transactionCallback(connection);
    
    await connection.commit();
    return result;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error(`[DB Transaction Error] ${error.message}`);
    throw new Error('데이터베이스 트랜잭션 처리 중 오류가 발생했습니다.');
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  executeQuery,
  executeTransaction,
}; 