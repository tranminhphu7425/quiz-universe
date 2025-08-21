import { Router } from 'express';
import { pool } from '../db/connection';

const router = Router();

/** GET /api/questions?subject_code=CSE201&limit=20 */
router.get('/', async (req, res) => {
  try {
    const { subject_code, limit = 20 } = req.query as { subject_code?: string; limit?: any };
    const lim = Number(limit) || 20;

    const sql = `
      SELECT q.question_id, q.stem, q.question_type, dl.name AS difficulty, s.code AS subject_code
      FROM questions q
      JOIN subjects s ON s.subject_id = q.subject_id
      JOIN difficulty_levels dl ON dl.difficulty_id = q.difficulty_id
      WHERE q.status = 'approved' AND (? IS NULL OR s.code = ?)
      ORDER BY q.question_id DESC
      LIMIT ?
    `;
    const [rows] = await pool.query(sql, [subject_code || null, subject_code || null, lim]);
    res.json(rows);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err?.message });
  }
});

/** GET /api/questions/:id (trả kèm options) */
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [qrows] = await pool.query(
      `SELECT q.*, dl.name AS difficulty, bl.name AS bloom
       FROM questions q
       JOIN difficulty_levels dl ON dl.difficulty_id = q.difficulty_id
       LEFT JOIN bloom_levels bl ON bl.bloom_id = q.bloom_id
       WHERE q.question_id = ?`, [id]
    );

    if (!Array.isArray(qrows) || qrows.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const [opts] = await pool.query(
      `SELECT option_id, label, content, is_correct, sort_order
       FROM question_options
       WHERE question_id = ?
       ORDER BY sort_order ASC`, [id]
    );

    res.json({ ...qrows[0], options: opts });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err?.message });
  }
});

export default router;
