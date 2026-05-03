package com.quizuniverse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStatsDTO {
    private long totalBanks;      // Tổng bộ câu hỏi đã tạo
    private long reputation;      // Điểm uy tín
    private long totalLikes;      // Tổng lượt thích
    private double approvalRate;  // Tỉ lệ phê duyệt (%)
}
