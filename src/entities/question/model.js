"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionSchema = exports.optionSchema = void 0;
// Validation schema với Zod
var zod_1 = require("zod");
exports.optionSchema = zod_1.z.object({
    label: zod_1.z.string().min(1, 'Nhãn không được để trống'),
    content: zod_1.z.string().min(1, 'Nội dung đáp án không được để trống'),
    isCorrect: zod_1.z.boolean(),
    sortOrder: zod_1.z.number().min(0),
});
exports.questionSchema = zod_1.z.object({
    stem: zod_1.z.string().min(1, 'Câu hỏi không được để trống'),
    explanation: zod_1.z.string().optional(),
    questionType: zod_1.z.enum(['mcq_single', 'mcq_multiple', 'true_false', 'short_answer']),
    status: zod_1.z.enum(['draft', 'pending', 'approved', 'rejected']).optional(),
    options: zod_1.z.array(exports.optionSchema)
        .min(2, 'Cần ít nhất 2 đáp án')
        .refine(function (options) { return options.some(function (opt) { return opt.isCorrect; }); }, {
        message: 'Cần ít nhất 1 đáp án đúng'
    })
        .refine(function (options) {
        var singleChoiceTypes = ['mcq_single', 'true_false'];
        return !singleChoiceTypes.includes(exports.questionSchema.shape.questionType._def.value) ||
            options.filter(function (opt) { return opt.isCorrect; }).length === 1;
    }, {
        message: 'Câu hỏi single choice chỉ được có 1 đáp án đúng'
    }),
});
