package com.quizuniverse.dto;
import java.util.List;

public class UpdateQuestionPayload {
    private String stem;
    private String explanation;    
    private String questionType;
    private List<QuestionOptionDTO> options;
    public String getStem() {
        return stem;
    }
    public String getExplanation() {
        return explanation;
    }
    public String getQuestionType() {
        return questionType;
    }
    public List<QuestionOptionDTO> getOptions() {
        return options;
    }
    public void setStem(String stem) {
        this.stem = stem;
    }
    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }
    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }
    public void setOptions(List<QuestionOptionDTO> options) {
        this.options = options;
    }

        

}
