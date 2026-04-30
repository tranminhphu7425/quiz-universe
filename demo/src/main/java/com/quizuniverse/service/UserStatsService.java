package com.quizuniverse.service;

import org.springframework.stereotype.Service;
import com.quizuniverse.dto.UserStatsDTO;
import com.quizuniverse.entity.QuestionBank;
import com.quizuniverse.repository.QuestionBankRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserStatsService {
    
    private final QuestionBankRepository bankRepository;

    public UserStatsDTO getUserStats(String userId) {
        // 1. Tổng số bộ câu hỏi (không tính các bộ đã bị xóa - DELETED)
        long total = bankRepository.countByCreatedBy_UserIdAndStatusNot(userId, QuestionBank.Status.DELETED);
        
        // 2. Số bộ câu hỏi đã được duyệt (ACTIVE)
        long approved = bankRepository.countByCreatedBy_UserIdAndStatus(userId, QuestionBank.Status.ACTIVE);
        
        // 3. Logic tính điểm uy tín (Mock: 10 điểm cho mỗi bộ được duyệt)
        long reputation = approved * 10;
        
        // 4. Tính tỉ lệ phê duyệt
        double approvalRate = (total > 0) ? ((double) approved / total * 100) : 0;
        
        // Làm tròn 1 chữ số thập phân
        approvalRate = Math.round(approvalRate * 10) / 10.0;

        return UserStatsDTO.builder()
                .totalBanks(total)
                .reputation(reputation)
                .totalLikes(0) // Cần triển khai thêm LikeRepository để lấy số thực tế
                .approvalRate(approvalRate)
                .build();
    }
}
