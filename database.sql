-- Tạo database & cấu hình
CREATE DATABASE IF NOT EXISTS quiz_universe
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE quiz_universe;

-- =========================
-- DANH MỤC CƠ BẢN
-- =========================

-- Người dùng/tác giả/biên tập viên
CREATE TABLE users (
  user_id       BIGINT PRIMARY KEY AUTO_INCREMENT,
  full_name     VARCHAR(120) NOT NULL,
  email         VARCHAR(160) UNIQUE,
  role          ENUM('author','editor','reviewer','admin') DEFAULT 'author',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Môn học
CREATE TABLE subjects (
  subject_id    BIGINT PRIMARY KEY AUTO_INCREMENT,
  code          VARCHAR(32) UNIQUE NOT NULL,
  name          VARCHAR(160) NOT NULL,
  description   TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Chủ đề/chương (có thể phân cấp)
CREATE TABLE topics (
  topic_id      BIGINT PRIMARY KEY AUTO_INCREMENT,
  subject_id    BIGINT NOT NULL,
  parent_id     BIGINT NULL,
  code          VARCHAR(64) NULL,
  name          VARCHAR(200) NOT NULL,
  description   TEXT,
  sort_order    INT DEFAULT 0,
  CONSTRAINT fk_topics_subject FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
  CONSTRAINT fk_topics_parent  FOREIGN KEY (parent_id)  REFERENCES topics(topic_id)
) ENGINE=InnoDB;

CREATE INDEX idx_topics_subject ON topics(subject_id);
CREATE INDEX idx_topics_parent  ON topics(parent_id);

-- Tag từ khóa cho câu hỏi
CREATE TABLE tags (
  tag_id        BIGINT PRIMARY KEY AUTO_INCREMENT,
  tag           VARCHAR(64) UNIQUE NOT NULL
) ENGINE=InnoDB;

-- Mức độ khó & Bloom (tham chiếu mềm)
CREATE TABLE difficulty_levels (
  difficulty_id TINYINT PRIMARY KEY,
  name          VARCHAR(32) NOT NULL,
  weight        DECIMAL(4,2) NOT NULL DEFAULT 1.00  -- có thể dùng khi tạo đề
) ENGINE=InnoDB;

CREATE TABLE bloom_levels (
  bloom_id      TINYINT PRIMARY KEY,
  name          VARCHAR(32) NOT NULL,   -- Remember, Understand, Apply, Analyze, Evaluate, Create
  description   VARCHAR(255)
) ENGINE=InnoDB;

-- =========================
-- NGUỒN DỮ LIỆU & NGÂN HÀNG
-- =========================

-- Nguồn: tài liệu/giáo trình/ngân hàng bên ngoài
CREATE TABLE sources (
  source_id     BIGINT PRIMARY KEY AUTO_INCREMENT,
  source_type   ENUM('document','external_bank','webpage','manual') NOT NULL,
  title         VARCHAR(255) NOT NULL,
  origin        VARCHAR(255),     -- ví dụ: NXB, URL, trường/đơn vị cung cấp
  file_path     VARCHAR(500),     -- nếu có file đính kèm trên hệ thống
  notes         TEXT,
  created_by    BIGINT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sources_user FOREIGN KEY (created_by) REFERENCES users(user_id)
) ENGINE=InnoDB;

-- Nếu là tài liệu có các phần/tiểu mục (để map câu hỏi về đúng đoạn)
CREATE TABLE source_sections (
  section_id    BIGINT PRIMARY KEY AUTO_INCREMENT,
  source_id     BIGINT NOT NULL,
  label         VARCHAR(128),           -- Chương 1, Mục 2.3...
  title         VARCHAR(255),
  page_start    INT,
  page_end      INT,
  CONSTRAINT fk_sections_source FOREIGN KEY (source_id) REFERENCES sources(source_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_sections_source ON source_sections(source_id);

-- Khái niệm "ngân hàng" nội bộ để gom nhóm câu hỏi (có thể là theo môn/kỳ/đơn vị…)
CREATE TABLE question_banks (
  bank_id       BIGINT PRIMARY KEY AUTO_INCREMENT,
  name          VARCHAR(200) NOT NULL,
  subject_id    BIGINT NOT NULL,
  description   TEXT,
  visibility    ENUM('private','org','public') DEFAULT 'private',
  created_by    BIGINT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_banks_subject FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
  CONSTRAINT fk_banks_user    FOREIGN KEY (created_by)  REFERENCES users(user_id)
) ENGINE=InnoDB;

CREATE INDEX idx_banks_subject ON question_banks(subject_id);

-- =========================
-- CÂU HỎI & PHIÊN BẢN
-- =========================

-- Câu hỏi trắc nghiệm (stem + metadata)
CREATE TABLE questions (
  question_id     BIGINT PRIMARY KEY AUTO_INCREMENT,
  bank_id         BIGINT NOT NULL,
  subject_id      BIGINT NOT NULL,
  stem            TEXT NOT NULL,                  -- nội dung câu hỏi
  explanation     TEXT,                           -- lời giải/giải thích
  difficulty_id   TINYINT NOT NULL,
  bloom_id        TINYINT,
  question_type   ENUM('mcq_single','mcq_multi','true_false') DEFAULT 'mcq_single',
  status          ENUM('draft','review','approved','retired') DEFAULT 'draft',
  source_id       BIGINT NULL,
  section_id      BIGINT NULL,
  created_by      BIGINT,
  updated_by      BIGINT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  version_no      INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_q_bank     FOREIGN KEY (bank_id)       REFERENCES question_banks(bank_id),
  CONSTRAINT fk_q_subject  FOREIGN KEY (subject_id)    REFERENCES subjects(subject_id),
  CONSTRAINT fk_q_diff     FOREIGN KEY (difficulty_id) REFERENCES difficulty_levels(difficulty_id),
  CONSTRAINT fk_q_bloom    FOREIGN KEY (bloom_id)      REFERENCES bloom_levels(bloom_id),
  CONSTRAINT fk_q_source   FOREIGN KEY (source_id)     REFERENCES sources(source_id),
  CONSTRAINT fk_q_section  FOREIGN KEY (section_id)    REFERENCES source_sections(section_id),
  CONSTRAINT fk_q_cby      FOREIGN KEY (created_by)    REFERENCES users(user_id),
  CONSTRAINT fk_q_uby      FOREIGN KEY (updated_by)    REFERENCES users(user_id)
) ENGINE=InnoDB;

CREATE INDEX idx_q_bank         ON questions(bank_id);
CREATE INDEX idx_q_subject      ON questions(subject_id);
CREATE INDEX idx_q_status       ON questions(status);
CREATE INDEX idx_q_source       ON questions(source_id);

-- Lựa chọn phương án cho câu hỏi (giữ thứ tự)
CREATE TABLE question_options (
  option_id     BIGINT PRIMARY KEY AUTO_INCREMENT,
  question_id   BIGINT NOT NULL,
  label         VARCHAR(8) NOT NULL,           -- A,B,C,D...
  content       TEXT NOT NULL,
  is_correct    BOOLEAN NOT NULL DEFAULT 0,
  feedback      VARCHAR(255),                  -- nhận xét riêng cho lựa chọn
  sort_order    INT DEFAULT 0,
  CONSTRAINT fk_opt_q FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_opt_q ON question_options(question_id);

-- Gắn tag cho câu hỏi (n-n)
CREATE TABLE question_tags (
  question_id BIGINT NOT NULL,
  tag_id      BIGINT NOT NULL,
  PRIMARY KEY (question_id, tag_id),
  CONSTRAINT fk_qt_q   FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
  CONSTRAINT fk_qt_tag FOREIGN KEY (tag_id)      REFERENCES tags(tag_id)         ON DELETE CASCADE
) ENGINE=InnoDB;

-- Gắn câu hỏi vào nhiều topic (n-n), mỗi câu tối đa 3-4 topic nên thêm unique
CREATE TABLE question_topics (
  question_id BIGINT NOT NULL,
  topic_id    BIGINT NOT NULL,
  PRIMARY KEY (question_id, topic_id),
  CONSTRAINT fk_qtp_q  FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
  CONSTRAINT fk_qtp_tp FOREIGN KEY (topic_id)    REFERENCES topics(topic_id)       ON DELETE CASCADE
) ENGINE=InnoDB;

-- Lịch sử phiên bản (lưu chênh lệch note)
CREATE TABLE question_versions (
  qv_id        BIGINT PRIMARY KEY AUTO_INCREMENT,
  question_id  BIGINT NOT NULL,
  version_no   INT NOT NULL,
  stem         TEXT,
  explanation  TEXT,
  updated_by   BIGINT,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  change_note  VARCHAR(255),
  CONSTRAINT fk_qv_q   FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
  CONSTRAINT fk_qv_uby FOREIGN KEY (updated_by)  REFERENCES users(user_id)
) ENGINE=InnoDB;

CREATE UNIQUE INDEX uq_qv ON question_versions(question_id, version_no);

-- =========================
-- ĐỀ THI & CẤU HÌNH XÁO TRỘN
-- =========================

-- Đề thi
CREATE TABLE exams (
  exam_id        BIGINT PRIMARY KEY AUTO_INCREMENT,
  title          VARCHAR(255) NOT NULL,
  subject_id     BIGINT NOT NULL,
  duration_min   INT NOT NULL DEFAULT 45,
  total_marks    DECIMAL(6,2) DEFAULT 10.00,
  created_by     BIGINT,
  created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes          TEXT,
  CONSTRAINT fk_exam_subject FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
  CONSTRAINT fk_exam_cby     FOREIGN KEY (created_by)  REFERENCES users(user_id)
) ENGINE=InnoDB;

-- Phần trong đề thi (theo chương/độ khó…)
CREATE TABLE exam_sections (
  section_id     BIGINT PRIMARY KEY AUTO_INCREMENT,
  exam_id        BIGINT NOT NULL,
  name           VARCHAR(160) NOT NULL,
  instructions   VARCHAR(255),
  weight         DECIMAL(5,2) DEFAULT 1.0,
  CONSTRAINT fk_es_exam FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_es_exam ON exam_sections(exam_id);

-- Câu hỏi trong đề thi (có thể đến từ nhiều ngân hàng/nguồn)
CREATE TABLE exam_questions (
  eq_id          BIGINT PRIMARY KEY AUTO_INCREMENT,
  exam_id        BIGINT NOT NULL,
  section_id     BIGINT NULL,
  question_id    BIGINT NOT NULL,
  points         DECIMAL(5,2) DEFAULT 1.00,
  display_order  INT DEFAULT 0,
  shuffle_options BOOLEAN DEFAULT 1,
  CONSTRAINT fk_eq_exam   FOREIGN KEY (exam_id)     REFERENCES exams(exam_id) ON DELETE CASCADE,
  CONSTRAINT fk_eq_sec    FOREIGN KEY (section_id)  REFERENCES exam_sections(section_id) ON DELETE SET NULL,
  CONSTRAINT fk_eq_q      FOREIGN KEY (question_id) REFERENCES questions(question_id)
) ENGINE=InnoDB;

CREATE INDEX idx_eq_exam ON exam_questions(exam_id);

-- =========================
-- JOB NHẬP LIỆU & CHUYỂN ĐỔI (DOC → MCQ)
-- =========================

-- Job nhập liệu (ví dụ OCR/PDF parser → câu hỏi nháp)
CREATE TABLE import_jobs (
  job_id        BIGINT PRIMARY KEY AUTO_INCREMENT,
  source_id     BIGINT NOT NULL,
  initiated_by  BIGINT,
  status        ENUM('pending','running','done','failed') DEFAULT 'pending',
  started_at    TIMESTAMP NULL,
  finished_at   TIMESTAMP NULL,
  stats_json    JSON,                   -- đếm số câu, số lỗi, vv.
  log_text      MEDIUMTEXT,
  CONSTRAINT fk_job_source FOREIGN KEY (source_id)    REFERENCES sources(source_id),
  CONSTRAINT fk_job_user   FOREIGN KEY (initiated_by) REFERENCES users(user_id)
) ENGINE=InnoDB;

-- Kết quả từng mục khi trích xuất (để rà soát)
CREATE TABLE import_items (
  item_id       BIGINT PRIMARY KEY AUTO_INCREMENT,
  job_id        BIGINT NOT NULL,
  section_id    BIGINT NULL,
  raw_text      MEDIUMTEXT,            -- đoạn văn bản gốc
  parsed_stem   TEXT,
  parsed_options JSON,                 -- mảng lựa chọn tạm thời
  parsed_answer JSON,                  -- mảng/nhãn đáp án đúng tạm thời
  status        ENUM('draft','reviewed','converted','rejected') DEFAULT 'draft',
  mapped_question_id BIGINT NULL,
  note          VARCHAR(255),
  CONSTRAINT fk_ii_job   FOREIGN KEY (job_id)   REFERENCES import_jobs(job_id) ON DELETE CASCADE,
  CONSTRAINT fk_ii_sect  FOREIGN KEY (section_id) REFERENCES source_sections(section_id),
  CONSTRAINT fk_ii_mq    FOREIGN KEY (mapped_question_id) REFERENCES questions(question_id)
) ENGINE=InnoDB;

CREATE INDEX idx_ii_job ON import_items(job_id);

