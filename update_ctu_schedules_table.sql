-- MySQL: tạo bảng lưu lịch CTU theo từng user
-- Chạy trong DB quiz_universe (hoặc schema bạn đang dùng)

CREATE TABLE IF NOT EXISTS ctu_schedules (
  id BIGINT NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(36) NOT NULL,
  data_json LONGTEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_ctu_schedules_user_id (user_id),
  CONSTRAINT fk_ctu_schedules_user_id
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

