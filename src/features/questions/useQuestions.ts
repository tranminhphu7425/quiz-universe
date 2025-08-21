import { useEffect, useState } from 'react';
import { QuestionsApi } from './api';
import type { QuestionBrief, QuestionFull } from '@/entities/question/types';

export const useQuestionsList = (subject_code?: string, limit = 20) => {
  const [data, setData] = useState<QuestionBrief[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    QuestionsApi.list({ subject_code, limit })
      .then((res) => { if (alive) { setData(res); setError(null); }})
      .catch((e) => { if (alive) setError(e.message); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [subject_code, limit]);

  return { data, loading, error };
};

export const useQuestionDetail = (id?: number) => {
  const [data, setData] = useState<QuestionFull | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let alive = true;
    setLoading(true);
    QuestionsApi.getById(id)
      .then((res) => { if (alive) { setData(res); setError(null); }})
      .catch((e) => { if (alive) setError(e.message); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [id]);

  return { data, loading, error };
};
