package com.quizuniverse.exception;

public class SubjectCodeAlreadyExistsException extends RuntimeException {
    public SubjectCodeAlreadyExistsException(String code) {
        super("Mã môn học " + code + " đã tồn tại");
    }
}
