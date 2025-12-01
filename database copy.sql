-- ============================================
-- CHƯƠNG 2: Các câu hỏi về sự hình thành và phát triển tư tưởng Hồ Chí Minh
-- ============================================

-- Câu hỏi 1 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Tiền đề tư tưởng, lý luận quyết định nội dung, bản chất tư tưởng Hồ Chí Minh là:', 'Chủ nghĩa Mác-Lênin là tiền đề tư tưởng, lý luận quyết định nội dung và bản chất tư tưởng Hồ Chí Minh.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q20 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q20, 'A', 'Chủ nghĩa Mác-Lênin', 1, 1),
(@q20, 'B', 'Văn hóa phương Đông', 0, 2),
(@q20, 'C', 'Văn hóa phương Tây', 0, 3),
(@q20, 'D', 'Giá trị truyền thống dân tộc', 0, 4);

-- Câu hỏi 2 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Địa danh nào sau đây là quê hương của chủ tịch Hồ Chí Minh?', 'Quê hương của Chủ tịch Hồ Chí Minh là Kim Liên – Nam Đàn – Nghệ An.', 1, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q21 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q21, 'A', 'Kim Liên – Thanh Chương – Nghệ An', 0, 1),
(@q21, 'B', 'Kim Liên – Nam Đàn – Nghệ An', 1, 2),
(@q21, 'C', 'Kim Liên – Nam Đàn – Nghệ Tĩnh', 0, 3),
(@q21, 'D', 'Kim Liên – Thanh Chương – Hà Tĩnh', 0, 4);

-- Câu hỏi 3 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nhân tố nào sau đây thuộc về phẩm chất căn bản nhất xuyên suốt cuộc đời hoạt động của Nguyễn Tất Thành - Nguyễn Ái Quốc - Hồ Chí Minh đã giúp Người trở thành nhà tư tưởng?', 'Tình cảm mãnh liệt yêu nước, thương dân là phẩm chất căn bản nhất.', 3, 3, 'mcq_single', 'approved', 6, 7, 1);
SET @q22 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q22, 'A', 'Tình cảm mãnh liệt của một con người suốt đời yêu nước, thương dân', 1, 1),
(@q22, 'B', 'Tư duy độc lập, tự chủ sáng tạo, với đầu óc phê bình tinh tường sáng suốt trong nghiên cứu lý luận và tổng kết thực tiễn', 0, 2),
(@q22, 'C', 'Sự khổ công học tập lý luận và thực tiễn', 0, 3),
(@q22, 'D', 'Ý chí kiên định của một chiến sĩ cộng sản nhiệt thành cách mạng', 0, 4);

-- Câu hỏi 4 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Sự thất bại của phong trào yêu nước chống Pháp cuối thế kỷ XIX - đầu thế kỷ XX cho thấy cách mạng Việt Nam lâm vào tình trạng khủng hoảng sâu sắc về:', 'Cách mạng Việt Nam khủng hoảng về đường lối.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q23 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q23, 'A', 'Tiềm lực quân sự', 0, 1),
(@q23, 'B', 'Văn hóa', 0, 2),
(@q23, 'C', 'Kinh tế', 0, 3),
(@q23, 'D', 'Đường lối', 1, 4);

-- Câu hỏi 5 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Giai đoạn có ý nghĩa vạch đường đi cho cách mạng Việt Nam là giai đoạn:', 'Giai đoạn 1921-1930 là giai đoạn vạch đường đi cho cách mạng Việt Nam.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q24 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q24, 'A', 'Từ 1921 đến 1930', 1, 1),
(@q24, 'B', 'Từ 1911 đến 1920', 0, 2),
(@q24, 'C', 'Từ 1930 đến 1945', 0, 3),
(@q24, 'D', 'Trước năm 1911', 0, 4);

-- Câu hỏi 6 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Trước sự xâm lược của thực dân Pháp, phong trào đấu tranh nào sau đây theo hệ tư tưởng phong kiến?', 'Phong trào Cần Vương theo hệ tư tưởng phong kiến.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q25 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q25, 'A', 'Phong trào Đông kinh nghĩa thục', 0, 1),
(@q25, 'B', 'Phong trào Đông du', 0, 2),
(@q25, 'C', 'Phong trào Duy Tân', 0, 3),
(@q25, 'D', 'Phong trào Cần Vương', 1, 4);

-- Câu hỏi 7 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Tất Thành lần đầu tiên tiếp xúc với khẩu hiệu "TỰ DO – BÌNH ĐẲNG – BÁC ÁI" khi nào?', 'Nguyễn Tất Thành tiếp xúc với khẩu hiệu này khi học ở Trường tiểu học Pháp – bản xứ ở thành phố Vinh năm 1905.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q26 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q26, 'A', 'Đến Huế lần thứ hai', 0, 1),
(@q26, 'B', 'Đến Pháp năm 1911', 0, 2),
(@q26, 'C', 'Khi học ở Trường tiểu học Pháp – bản xứ ở thành phố Vinh năm 1905', 1, 3),
(@q26, 'D', 'Đến Huế lần thứ nhất', 0, 4);

-- Câu hỏi 8 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nhân tố nào sau đây thuộc phẩm chất trí tuệ đặc sắc nhất làm điều kiện cho Nguyễn Ái Quốc trở thành một nhà tư tưởng?', 'Tư duy độc lập, tự chủ sáng tạo là phẩm chất trí tuệ đặc sắc nhất.', 3, 3, 'mcq_single', 'approved', 6, 7, 1);
SET @q27 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q27, 'A', 'Tình cảm mãnh liệt của một con người suốt đời yêu nước, thương dân', 0, 1),
(@q27, 'B', 'Tư duy độc lập, tự chủ sáng tạo, với đầu óc phê bình tinh tường sáng suốt trong nghiên cứu lý luận và tổng kết thực tiễn', 1, 2),
(@q27, 'C', 'Ý chí kiên định của một chiến sĩ cộng sản nhiệt thành cách mạng', 0, 3),
(@q27, 'D', 'Sự khổ công học tập lý luận và thực tiễn', 0, 4);

-- Câu hỏi 9 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Sự kiện nào đánh dấu Nguyễn Ái Quốc tiếp thu chủ nghĩa Mác-Lênin trở thành người cộng sản?', 'Việc bỏ phiếu tán thành Quốc tế Cộng sản (1920) đánh dấu Nguyễn Ái Quốc trở thành người cộng sản.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q28 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q28, 'A', 'Bỏ phiếu tán thành Quốc tế Cộng sản', 1, 1),
(@q28, 'B', 'Đọc Luận cương của Lênin', 0, 2),
(@q28, 'C', 'Gửi Yêu sách 8 điểm đến Hội nghị Vécxay', 0, 3),
(@q28, 'D', 'Thành lập Đảng Cộng sản Việt Nam', 0, 4);

-- Câu hỏi 10 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Sinh Cung cùng anh theo cha, mẹ đến Huế vào năm nào?', 'Nguyễn Sinh Cung đến Huế năm 1895.', 1, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q29 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q29, 'A', 'Năm 1905', 0, 1),
(@q29, 'B', 'Năm 1895', 1, 2),
(@q29, 'C', 'Năm 1898', 0, 3),
(@q29, 'D', 'Năm 1901', 0, 4);

-- Câu hỏi 11 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Ái Quốc đã tán thành Quốc tế Cộng sản do ai sáng lập?', 'Nguyễn Ái Quốc tán thành Quốc tế Cộng sản do V.I.Lênin sáng lập.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q30 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q30, 'A', 'C.Mác', 0, 1),
(@q30, 'B', 'V.I.Lênin', 1, 2),
(@q30, 'C', 'Xtalin', 0, 3),
(@q30, 'D', 'Ph.Ăngghen', 0, 4);

-- Câu hỏi 12 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Tháng 12/1920, Nguyễn Ái Quốc gia nhập vào tổ chức nào sau đây?', 'Tháng 12/1920, Nguyễn Ái Quốc gia nhập Quốc tế Cộng sản.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q31 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q31, 'A', 'Đảng xã hội Pháp', 0, 1),
(@q31, 'B', 'Quốc tế Cộng sản', 1, 2),
(@q31, 'C', 'Hội những người Việt Nam yêu nước', 0, 3),
(@q31, 'D', 'Hội Liên hiệp các dân tộc thuộc địa', 0, 4);

-- Câu hỏi 13 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Ai là người đã có công lớn trong việc giúp Nguyễn Ái Quốc thoát ra khỏi nhà tù của thực dân Anh ở Hồng Kông?', 'Luật sư Lôdobai đã giúp Nguyễn Ái Quốc thoát khỏi nhà tù ở Hồng Kông.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q32 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q32, 'A', 'Tômát Xautôn (Phó Thống đốc Hồng Kông)', 0, 1),
(@q32, 'B', 'Luật sư Nôen Prít', 0, 2),
(@q32, 'C', 'Luật sư Lôdobai', 1, 3),
(@q32, 'D', 'Luật sư Phan Văn Trường', 0, 4);

-- Câu hỏi 14 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Thay mặt những người Việt Nam yêu nước tại Pháp, Nguyễn Ái Quốc viết Yêu sách của nhân dân An Nam gửi đến Hội nghị Vecxay vào tháng, năm nào?', 'Nguyễn Ái Quốc gửi Yêu sách vào tháng 6/1919.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q33 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q33, 'A', 'Tháng 7/1920', 0, 1),
(@q33, 'B', 'Tháng 7/1919', 0, 2),
(@q33, 'C', 'Tháng 6/1919', 1, 3),
(@q33, 'D', 'Tháng 6/1920', 0, 4);

-- Câu hỏi 15 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Tất Thành lấy tên là Nguyễn Ái Quốc khi nào?', 'Nguyễn Tất Thành lấy tên Nguyễn Ái Quốc khi viết Yêu sách 8 điểm gửi Hội nghị Vecxay năm 1919.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q34 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q34, 'A', 'Khi lên tàu từ bến Nhà Rông năm 1911', 0, 1),
(@q34, 'B', 'Khi viết Yêu sách 8 điểm gửi Hội nghị Vecxay năm 1919', 1, 2),
(@q34, 'C', 'Khi dự Đại hội lần thứ V Quốc tế Cộng sản ở Liên Xô năm 1924', 0, 3),
(@q34, 'D', 'Khi tham gia sáng lập Đảng Cộng sản Pháp năm 1920', 0, 4);

-- Câu hỏi 16 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Năm 1911 khi ra đi tìm đường cứu nước Chủ tịch Hồ Chí Minh có tên là gì?', 'Khi ra đi tìm đường cứu nước năm 1911, Người có tên là Nguyễn Văn Ba.', 1, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q35 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q35, 'A', 'Nguyễn Tất Thành', 0, 1),
(@q35, 'B', 'Nguyễn Văn Ba', 1, 2),
(@q35, 'C', 'Nguyễn Sinh Cung', 0, 3),
(@q35, 'D', 'Nguyễn Ái Quốc', 0, 4);

-- Câu hỏi 17 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Xã hội Việt Nam cuối thế kỷ XIX - đầu thế kỷ XX có hai mâu thuẫn cơ bản nào?', 'Xã hội Việt Nam có mâu thuẫn giữa nông dân với địa chủ và giữa dân tộc với thực dân Pháp, tay sai.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q36 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q36, 'A', 'Mâu thuẫn giữa nông dân với địa chủ và giữa công nhân với tư sản', 0, 1),
(@q36, 'B', 'Mâu thuẫn giữa công nhân với tư sản và giữa dân tộc với thực dân Pháp', 0, 2),
(@q36, 'C', 'Mâu thuẫn giữa nông dân với địa chủ và giữa dân tộc với thực dân Pháp, tay sai', 1, 3),
(@q36, 'D', 'Mâu thuẫn giữa công nhân với tư sản và giữa tư sản với địa chủ', 0, 4);

-- Câu hỏi 18 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Thực dân Pháp nổ tiếng súng xâm lược Việt Nam tại bán đảo Sơn Trà - Đà Nẵng vào năm nào?', 'Thực dân Pháp xâm lược Việt Nam năm 1858.', 1, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q37 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q37, 'A', 'Năm 1858', 1, 1),
(@q37, 'B', 'Năm 1885', 0, 2),
(@q37, 'C', 'Năm 1865', 0, 3),
(@q37, 'D', 'Năm 1856', 0, 4);

-- Câu hỏi 19 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Ái Quốc đã thành lập Hội Việt Nam Cách mạng Thanh niên ở đâu?', 'Hội Việt Nam Cách mạng Thanh niên được thành lập ở Quảng Châu – Trung Quốc.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q38 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q38, 'A', 'Quảng Châu – Trung Quốc', 1, 1),
(@q38, 'B', 'Thượng Hải – Trung Quốc', 0, 2),
(@q38, 'C', 'Cao Bằng – Việt Nam', 0, 3),
(@q38, 'D', 'Hương Cảng – Trung Quốc', 0, 4);

-- Câu hỏi 20 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Ái Quốc dự Đại hội lần thứ V Quốc tế Cộng sản tại Liên Xô vào năm nào?', 'Nguyễn Ái Quốc dự Đại hội lần thứ V Quốc tế Cộng sản năm 1924.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q39 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q39, 'A', 'Năm 1926', 0, 1),
(@q39, 'B', 'Năm 1924', 1, 2),
(@q39, 'C', 'Năm 1923', 0, 3),
(@q39, 'D', 'Năm 1925', 0, 4);

-- Câu hỏi 21 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Tác phẩm "Bản án chế độ thực dân Pháp" xuất bản lần đầu tiên vào năm nào? Bằng tiếng gì?', '"Bản án chế độ thực dân Pháp" xuất bản lần đầu năm 1925 bằng tiếng Pháp.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q40 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q40, 'A', 'Năm 1925 – Tiếng Pháp', 1, 1),
(@q40, 'B', 'Năm 1927 – Tiếng Hán', 0, 2),
(@q40, 'C', 'Năm 1926 – Tiếng Anh', 0, 3),
(@q40, 'D', 'Năm 1924 – Tiếng Nga', 0, 4);

-- Câu hỏi 22 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Ái Quốc tham dự Đại hội Tua, tán thành Quốc tế 3, tham gia thành lập Đảng Cộng sản Pháp khi nào?', 'Nguyễn Ái Quốc tham dự Đại hội Tua tháng 12/1920.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q41 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q41, 'A', 'Tháng 12/1921', 0, 1),
(@q41, 'B', 'Tháng 12/1919', 0, 2),
(@q41, 'C', 'Tháng 12/1920', 1, 3),
(@q41, 'D', 'Tháng 12/1918', 0, 4);

-- Câu hỏi 23 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Cụ Nguyễn Sinh Sắc - thân phụ của Hồ Chí Minh qua đời tại đâu?', 'Cụ Nguyễn Sinh Sắc qua đời tại Cao Lãnh.', 1, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q42 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q42, 'A', 'Sài Gòn', 0, 1),
(@q42, 'B', 'Cao Lãnh', 1, 2),
(@q42, 'C', 'Đà Nẵng', 0, 3),
(@q42, 'D', 'Huế', 0, 4);

-- Câu hỏi 24 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Tất Thành đã tham dự cuộc biểu tình chống thuế của nông dân Trung kỳ vào thời gian nào?', 'Nguyễn Tất Thành tham dự cuộc biểu tình chống thuế năm 1908.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q43 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q43, 'A', 'Năm 1907', 0, 1),
(@q43, 'B', 'Năm 1908', 1, 2),
(@q43, 'C', 'Năm 1909', 0, 3),
(@q43, 'D', 'Năm 1906', 0, 4);

-- Câu hỏi 25 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Các bài giảng của Nguyễn Ái Quốc tại các lớp huấn luyện cán bộ được tập hợp và xuất bản thành tác phẩm nào?', 'Các bài giảng được tập hợp thành tác phẩm "Đường Kách mệnh".', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q44 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q44, 'A', 'Cương lĩnh thành lập Đảng', 0, 1),
(@q44, 'B', 'Đường Kách mệnh', 1, 2),
(@q44, 'C', 'Luận cương tháng 10 năm 1930', 0, 3),
(@q44, 'D', 'Bản án chế độ thực dân Pháp', 0, 4);

-- Câu hỏi 26 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Sinh Cung đổi tên là Nguyễn Tất Thành năm nào?', 'Nguyễn Sinh Cung đổi tên thành Nguyễn Tất Thành năm 1901.', 1, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q45 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q45, 'A', 'Năm 1911', 0, 1),
(@q45, 'B', 'Năm 1908', 0, 2),
(@q45, 'C', 'Năm 1905', 0, 3),
(@q45, 'D', 'Năm 1901', 1, 4);

-- Câu hỏi 27 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Ái Quốc đọc "Sơ thảo lần thứ nhất những Luận cương về vấn đề dân tộc và vấn đề thuộc địa" của V.I.Lênin, tìm thấy con đường giải phóng cho dân tộc Việt Nam vào tháng, năm nào?', 'Nguyễn Ái Quốc đọc Luận cương của Lênin tháng 7/1920.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q46 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q46, 'A', 'Tháng 12/1920', 0, 1),
(@q46, 'B', 'Tháng 9/1920', 0, 2),
(@q46, 'C', 'Tháng 7/1920', 1, 3),
(@q46, 'D', 'Tháng 6/1920', 0, 4);

-- Câu hỏi 28 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Ái Quốc lấy tên Hồ Chí Minh khi nào?', 'Nguyễn Ái Quốc lấy tên Hồ Chí Minh khi bị quân Tưởng Giới Thạch bắt năm 1942.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q47 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q47, 'A', 'Khi bị quân Tưởng Giới Thạch bắt 1942', 1, 1),
(@q47, 'B', 'Khi viết Tuyên ngôn độc lập năm 1945', 0, 2),
(@q47, 'C', 'Khi viết Di chúc năm 1965', 0, 3),
(@q47, 'D', 'Khi trở về nước năm 1941', 0, 4);

-- Câu hỏi 29 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Tiền đề tư tưởng, lý luận giữ vai trò xuất phát hình thành tư tưởng Hồ Chí Minh là:', 'Giá trị truyền thống dân tộc là tiền đề xuất phát hình thành tư tưởng Hồ Chí Minh.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q48 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q48, 'A', 'Văn hóa phương Đông', 0, 1),
(@q48, 'B', 'Văn hóa phương Tây', 0, 2),
(@q48, 'C', 'Giá trị truyền thống dân tộc', 1, 3),
(@q48, 'D', 'Chủ nghĩa Mác-Lênin', 0, 4);

-- Câu hỏi 30 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Ái Quốc về Pác Bó – Cao Bằng năm nào?', 'Nguyễn Ái Quốc về Pác Bó năm 1941.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q49 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q49, 'A', 'Năm 1942', 0, 1),
(@q49, 'B', 'Năm 1944', 0, 2),
(@q49, 'C', 'Năm 1943', 0, 3),
(@q49, 'D', 'Năm 1941', 1, 4);

-- Câu hỏi 31 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Ái Quốc triệu tập Hội nghị hợp nhất thành lập Đảng Cộng sản Việt Nam ở đâu?', 'Hội nghị hợp nhất thành lập Đảng Cộng sản Việt Nam được triệu tập ở Hương Cảng – Trung Quốc.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q50 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q50, 'A', 'Quảng Châu – Trung Quốc', 0, 1),
(@q50, 'B', 'Hương Cảng – Trung Quốc', 1, 2),
(@q50, 'C', 'Thượng Hải – Trung Quốc', 0, 3),
(@q50, 'D', 'Cao Bằng – Việt Nam', 0, 4);

-- Câu hỏi 32 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Nguyễn Ái Quốc bị thực dân Anh giam giữ ở Hồng Kông trong thời gian nào?', 'Nguyễn Ái Quốc bị giam giữ ở Hồng Kông từ 6/1931 đến 1/1933.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q51 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q51, 'A', '6/1931 – 1/1934', 0, 1),
(@q51, 'B', '6/1931 – 1/1933', 1, 2),
(@q51, 'C', '6/1931 – 1/1935', 0, 3),
(@q51, 'D', '6/1931 – 1/1932', 0, 4);

-- Câu hỏi 33 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Huyện Bình Khê, nơi cụ Nguyễn Sinh Sắc - thân phụ của Hồ Chí Minh có thời kỳ làm quan trị huyện thuộc tỉnh nào?', 'Huyện Bình Khê thuộc tỉnh Bình Định.', 2, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q52 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q52, 'A', 'Bình Định', 1, 1),
(@q52, 'B', 'Quảng Bình', 0, 2),
(@q52, 'C', 'Quảng Ngãi', 0, 3),
(@q52, 'D', 'Quảng Nam', 0, 4);

-- Câu hỏi 34 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Thay mặt những người Việt Nam yêu nước tại Pháp, Nguyễn Ái Quốc gửi đến Hội nghị Vecxay bản Yêu sách của nhân dân An Nam gồm mấy điểm?', 'Yêu sách gồm 8 điểm.', 1, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q53 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q53, 'A', '6 điểm', 0, 1),
(@q53, 'B', '7 điểm', 0, 2),
(@q53, 'C', '8 điểm', 1, 3),
(@q53, 'D', '9 điểm', 0, 4);

-- Câu hỏi 35 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Phát hiện câu có sự nhầm lẫn khi ghi lại ý kiến của Hồ Chí Minh về tinh thần độc lập, sáng tạo trong học tập lý luận:', 'Câu "Phải biết khéo lợi dụng kinh nghiệm. Nghe người ta nói giai cấp đấu tranh, mình cũng nên áp dụng giai cấp đấu tranh" là sai vì không phù hợp với tư tưởng độc lập sáng tạo của Hồ Chí Minh.', 3, 4, 'mcq_single', 'approved', 6, 7, 1);
SET @q54 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q54, 'A', 'Phải bảo vệ chân lý, không được ba phải', 0, 1),
(@q54, 'B', 'Không nên nhắm mắt tin theo sách vở một cách xuôi chiều', 0, 2),
(@q54, 'C', 'Không học sách vở Mác-Lênin mà học tinh thần Mác-Lênin', 0, 3),
(@q54, 'D', 'Phải biết khéo lợi dụng kinh nghiệm. Nghe người ta nói giai cấp đấu tranh, mình cũng nên áp dụng giai cấp đấu tranh', 1, 4);

-- Câu hỏi 36 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Giai đoạn hình thành tư tưởng yêu nước và chí hướng cách mạng của Hồ Chí Minh là giai đoạn:', 'Giai đoạn hình thành tư tưởng yêu nước là trước năm 1911.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q55 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q55, 'A', 'Từ 1921 đến 1930', 0, 1),
(@q55, 'B', 'Từ 1911 đến 1920', 0, 2),
(@q55, 'C', 'Trước năm 1911', 1, 3),
(@q55, 'D', 'Từ 1930 đến 1945', 0, 4);

-- Câu hỏi 37 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Tài sản có giá trị nhất trong hành trình của Nguyễn Tất Thành lúc ra đi tìm đường cứu nước năm 1911 là:', 'Tài sản giá trị nhất là chủ nghĩa yêu nước Việt Nam.', 3, 3, 'mcq_single', 'approved', 6, 7, 1);
SET @q56 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q56, 'A', 'Một vốn học vấn chắc chắn cùng với năng lực trí tuệ sắc sảo của bản thân', 0, 1),
(@q56, 'B', 'Tinh thần nhân nghĩa, truyền thống đoàn kết của nhân dân', 0, 2),
(@q56, 'C', 'Truyền thống cần cù, lạc quan, yêu đời của con người Việt Nam', 0, 3),
(@q56, 'D', 'Chủ nghĩa yêu nước Việt Nam trong dựng nước và giữ nước', 1, 4);

-- Câu hỏi 38 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Người thanh niên Việt Nam Nguyễn Tất Thành ra đi tìm đường cứu nước vào ngày, tháng năm nào?', 'Nguyễn Tất Thành ra đi tìm đường cứu nước ngày 5/6/1911.', 1, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q57 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q57, 'A', 'Ngày 15/9/1911', 0, 1),
(@q57, 'B', 'Ngày 19/5/1911', 0, 2),
(@q57, 'C', 'Ngày 6/5/1911', 0, 3),
(@q57, 'D', 'Ngày 5/6/1911', 1, 4);

-- Câu hỏi 39 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Xã hội Việt Nam cuối thế kỷ XIX - đầu thế kỷ XX có mâu thuẫn chủ yếu nào?', 'Mâu thuẫn chủ yếu là giữa toàn thể dân tộc với thực dân Pháp, tay sai.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q58 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q58, 'A', 'Mâu thuẫn giữa toàn thể dân tộc với thực dân Pháp, tay sai', 1, 1),
(@q58, 'B', 'Mâu thuẫn giữa tư sản với tiểu tư sản', 0, 2),
(@q58, 'C', 'Mâu thuẫn giữa nông dân với địa chủ', 0, 3),
(@q58, 'D', 'Mâu thuẫn giữa công nhân với tư sản', 0, 4);

-- Câu hỏi 40 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Động lực thôi thúc chàng thanh niên Nguyễn Tất Thành ra đi tìm đường cứu nước là:', 'Động lực thôi thúc là lòng yêu nước, thương dân.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q59 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q59, 'A', 'Thắng lợi của cuộc cách mạng tháng Mười Nga', 0, 1),
(@q59, 'B', 'Sự phát triển của nền kinh tế phương Tây', 0, 2),
(@q59, 'C', 'Khẩu hiệu "Tự do – Bình đẳng – Bác ái" trong cuộc đại cách mạng Pháp', 0, 3),
(@q59, 'D', 'Lòng yêu nước, thương dân', 1, 4);

-- Câu hỏi 41 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Theo Hồ Chí Minh, ưu điểm lớn nhất của chủ nghĩa Tam dân là:', 'Ưu điểm lớn nhất là chính sách phù hợp với điều kiện nước ta.', 3, 3, 'mcq_single', 'approved', 6, 7, 1);
SET @q60 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q60, 'A', 'Chính sách phù hợp với điều kiện nước ta', 1, 1),
(@q60, 'B', 'Đấu tranh vì độc lập, tự do, hạnh phúc', 0, 2),
(@q60, 'C', 'Đấu tranh giải phóng dân tộc thuộc địa', 0, 3),
(@q60, 'D', 'Đánh đế quốc, thực dân', 0, 4);

-- Câu hỏi 42 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Với Hồ Chí Minh, yếu tố lúc đầu đưa Người tin theo Lênin, tin theo Quốc tế thứ ba là:', 'Yếu tố ban đầu là chủ nghĩa yêu nước Việt Nam.', 3, 3, 'mcq_single', 'approved', 6, 7, 1);
SET @q61 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q61, 'A', 'Chủ nghĩa yêu nước Việt Nam', 1, 1),
(@q61, 'B', 'Khát vọng giải phóng dân tộc', 0, 2),
(@q61, 'C', 'Bản chất khoa học và cách mạng của chủ nghĩa Mác-Lênin', 0, 3),
(@q61, 'D', 'Vốn hiểu biết sâu rộng cùng với năng lực trí tuệ sắc sảo của bản thân', 0, 4);

-- Câu hỏi 43 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Trước sự xâm lược của thực dân Pháp, phong trào đấu tranh nào sau đây theo khuynh hướng dân chủ tư sản?', 'Phong trào Đông du theo khuynh hướng dân chủ tư sản.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q62 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q62, 'A', 'Khởi nghĩa nông dân Yên Thế', 0, 1),
(@q62, 'B', 'Khởi nghĩa Ba Đình', 0, 2),
(@q62, 'C', 'Phong trào Đông du', 1, 3),
(@q62, 'D', 'Khởi nghĩa Hương Khê', 0, 4);

-- Câu hỏi 44 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Giai đoạn hình thành cơ bản tư tưởng Hồ Chí Minh về con đường cách mạng Việt Nam được tính từ:', 'Giai đoạn hình thành cơ bản là từ năm 1921 đến năm 1930.', 2, 2, 'mcq_single', 'approved', 6, 7, 1);
SET @q63 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q63, 'A', 'Năm 1921 đến năm 1930', 1, 1),
(@q63, 'B', 'Năm 1930 đến năm 1945', 0, 2),
(@q63, 'C', 'Năm 1911 đến năm 1920', 0, 3),
(@q63, 'D', 'Năm 1945 đến năm 1969', 0, 4);

-- Câu hỏi 45 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Thân mẫu của Hồ Chí Minh là bà Hoàng Thị Loan, bà sinh được mấy người con?', 'Bà Hoàng Thị Loan sinh được bốn người con.', 1, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q64 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q64, 'A', 'Bốn người con', 1, 1),
(@q64, 'B', 'Hai người con', 0, 2),
(@q64, 'C', 'Năm người con', 0, 3),
(@q64, 'D', 'Ba người con', 0, 4);

-- Câu hỏi 46 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Chủ trương thành Quốc tế Cộng sản của V.I.Lênin là:', 'Chủ trương của Lênin là đoàn kết vô sản với nhân dân thuộc địa; giúp đỡ phong trào giải phóng dân tộc.', 3, 3, 'mcq_single', 'approved', 6, 7, 1);
SET @q65 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q65, 'A', 'Thức tỉnh nhân dân các dân tộc thuộc địa', 0, 1),
(@q65, 'B', 'Vạch trần tội ác của chủ nghĩa đế quốc', 0, 2),
(@q65, 'C', 'Giải phóng giai cấp vô sản ở chính quốc', 0, 3),
(@q65, 'D', 'Đoàn kết vô sản với nhân dân thuộc địa; giúp đỡ phong trào giải phóng dân tộc ở các nước thuộc địa', 1, 4);

-- Câu hỏi 47 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Thân mẫu của Hồ Chí Minh là bà Hoàng Thị Loan, bà mất ở đâu?', 'Bà Hoàng Thị Loan mất ở Huế.', 1, 1, 'mcq_single', 'approved', 6, 7, 1);
SET @q66 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q66, 'A', 'Huế', 1, 1),
(@q66, 'B', 'Nghệ An', 0, 2),
(@q66, 'C', 'Hà Tĩnh', 0, 3),
(@q66, 'D', 'Vinh', 0, 4);

-- Câu hỏi 48 Chương 2
INSERT INTO questions (bank_id, subject_id, stem, explanation, difficulty_id, bloom_id, question_type, status, source_id, section_id, created_by) 
VALUES (10, 11, 'Theo Hồ Chí Minh, ưu điểm lớn nhất của Học thuyết Khổng Tử là:', 'Ưu điểm lớn nhất là sự tu dưỡng đạo đức cá nhân.', 3, 3, 'mcq_single', 'approved', 6, 7, 1);
SET @q67 = LAST_INSERT_ID();
INSERT INTO question_options (question_id, label, content, is_correct, sort_order) VALUES
(@q67, 'A', 'Sự tu dưỡng đạo đức cá nhân', 1, 1),
(@q67, 'B', 'Quản lý xã hội bằng đạo đức', 0, 2),
(@q67, 'C', 'Tinh thần nhân nghĩa', 0, 3),
(@q67, 'D', 'Tinh thần hiếu học', 0, 4);