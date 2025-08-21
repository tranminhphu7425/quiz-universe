import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionsRoute from './routes/questions';

dotenv.config();

const app = express();
app.use(cors());            // prod có thể siết origin
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/questions', questionsRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
