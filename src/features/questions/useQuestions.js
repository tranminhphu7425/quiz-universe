"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuestionDetail = exports.useQuestionsList = void 0;
var react_1 = require("react");
var api_1 = require("./api");
var useQuestionsList = function (subject_code, limit) {
    if (limit === void 0) { limit = 20; }
    var _a = (0, react_1.useState)(null), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    (0, react_1.useEffect)(function () {
        var alive = true;
        setLoading(true);
        api_1.QuestionsApi.list({ subject_code: subject_code, limit: limit })
            .then(function (res) { if (alive) {
            setData(res);
            setError(null);
        } })
            .catch(function (e) { if (alive)
            setError(e.message); })
            .finally(function () { if (alive)
            setLoading(false); });
        return function () { alive = false; };
    }, [subject_code, limit]);
    return { data: data, loading: loading, error: error };
};
exports.useQuestionsList = useQuestionsList;
var useQuestionDetail = function (id) {
    var _a = (0, react_1.useState)(null), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(!!id), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    (0, react_1.useEffect)(function () {
        if (!id)
            return;
        var alive = true;
        setLoading(true);
        api_1.QuestionsApi.getById(id)
            .then(function (res) { if (alive) {
            setData(res);
            setError(null);
        } })
            .catch(function (e) { if (alive)
            setError(e.message); })
            .finally(function () { if (alive)
            setLoading(false); });
        return function () { alive = false; };
    }, [id]);
    return { data: data, loading: loading, error: error };
};
exports.useQuestionDetail = useQuestionDetail;
