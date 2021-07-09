import express from "express";
import patientsService from '../services/patientsService';
import toNewPatient from  '../utils';

const router = express.Router();

router.get('/', (_req, res) =>{
  res.json(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) =>{
  const patient = toNewPatient(req.body);

  const newPatient = patientsService.addPatient(patient);
  res.json(newPatient);
});
export default router;