import express, { json } from "express";
import cors from 'cors';
import diagnosesRouter from './routes/diagnoseRouter';
import patientsRouter from './routes/patientsRouter';

const PORT = 3001;
const app = express();

app.use(json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`app started at ${PORT}`);
});