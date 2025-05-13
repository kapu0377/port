CREATE TABLE daily_meals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    meal_date DATE NOT NULL,
    meal_type ENUM('breakfast', 'lunch', 'dinner', 'snack') NOT NULL,
    meal_description TEXT NOT NULL,
    calories FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE daily_exercises (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    exercise_date DATE NOT NULL,
    exercise_type VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    intensity ENUM('low', 'medium', 'high') NOT NULL,
    calories_burned FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE daily_evaluations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    evaluation_date DATE NOT NULL,
    total_calories_consumed FLOAT,
    total_calories_burned FLOAT,
    score INT CHECK (score BETWEEN 0 AND 100),
    strengths TEXT,
    weaknesses TEXT,
    improvements TEXT,
    llm_evaluation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE weekly_evaluations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    week_start_date DATE NOT NULL,
    week_end_date DATE NOT NULL,
    average_daily_calories_consumed FLOAT,
    average_daily_calories_burned FLOAT,
    score INT CHECK (score BETWEEN 0 AND 100),
    strengths TEXT,
    weaknesses TEXT,
    improvements TEXT,
    llm_evaluation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE monthly_evaluations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    month_date DATE NOT NULL,
    average_daily_calories_consumed FLOAT,
    average_daily_calories_burned FLOAT,
    score INT CHECK (score BETWEEN 0 AND 100),
    strengths TEXT,
    weaknesses TEXT,
    improvements TEXT,
    llm_evaluation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
); 

  CREATE TABLE `users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `gemini_api_key` varchar(255) DEFAULT NULL,
  `current_weight_kg` decimal(5,2) DEFAULT NULL,
  `height_cm` decimal(5,1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `idx_username` (`username`)
);  
CREATE TABLE user_goals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    start_date DATE NOT NULL COMMENT '목표 시작일',
    target_date DATE NOT NULL COMMENT '목표 달성 희망일',
    
    activity_level ENUM('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active') NOT NULL COMMENT '활동량 수준',
    
    target_weight_kg DECIMAL(5,2) NOT NULL COMMENT '목표 체중 (kg)',
    target_daily_calories BIGINT NOT NULL COMMENT '목표 일일 칼로리 섭취량',
    target_daily_exercise_minutes BIGINT NOT NULL COMMENT '목표 일일 운동 시간(분)',
    diet_goal ENUM('weight_loss', 'weight_gain', 'maintenance', 'muscle_gain') NOT NULL COMMENT '식단 목표',
    
    notes TEXT DEFAULT NULL COMMENT '추가 목표 설명 및 특이사항',
    is_active BOOLEAN DEFAULT TRUE COMMENT '현재 활성화된 목표 여부',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    
    INDEX idx_user_active (user_id, is_active)
) COMMENT '사용자 건강/다이어트 목표 설정';

-- 목표 진행 상황 추적 테이블
CREATE TABLE goal_progress_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    goal_id BIGINT NOT NULL,
    log_date DATE NOT NULL,
    
    -- 진행 상황 측정
    current_weight_kg DECIMAL(5,2) NOT NULL COMMENT '현재 체중',
    daily_calories_consumed BIGINT NOT NULL COMMENT '실제 섭취 칼로리',
    daily_exercise_minutes BIGINT NOT NULL COMMENT '실제 운동 시간',
    
    -- 목표 달성률 등
    weight_progress_percentage DECIMAL(5,2) COMMENT '체중 목표 달성률',
    overall_progress_percentage DECIMAL(5,2) COMMENT '전체 목표 달성률',
    
    -- 시간 정보
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 외래키 설정
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (goal_id) REFERENCES user_goals(id),
    
    -- 인덱스 설정
    INDEX idx_user_date (user_id, log_date)
) COMMENT '목표 진행 상황 기록';
-- 월간 스케줄 테이블 생성
CREATE TABLE monthly_schedules (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    month_start_date DATE NOT NULL,
    month_end_date DATE NOT NULL,
    schedule_data JSON NOT NULL COMMENT '월간 스케줄 데이터 (JSON 형식)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    
    INDEX idx_user_date (user_id, month_start_date, month_end_date)
) COMMENT '사용자 월간 식단 및 운동 스케줄'; 
-- 일일 목표 달성 평가 테이블
CREATE TABLE daily_achievements (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    achievement_date DATE NOT NULL,
    schedule_id BIGINT NOT NULL,
    achievement_percentage INT CHECK (achievement_percentage BETWEEN 0 AND 100),
    meal_achievement JSON NOT NULL COMMENT '식단 달성도 평가 (JSON 형식)',
    exercise_achievement JSON NOT NULL COMMENT '운동 달성도 평가 (JSON 형식)',
    overall_feedback TEXT NOT NULL COMMENT '종합적인 피드백 및 조언',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (schedule_id) REFERENCES monthly_schedules(id),
    
    UNIQUE KEY idx_user_date (user_id, achievement_date)
) COMMENT '사용자 일일 목표 달성 평가'; 