import express from "express";
import patientsService from '../services/patientsService';
import toNewPatient from  '../utils';

const router = express.Router();

router.get('/', (_req, res) =>{
  res.json(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) =>{
  try {
    const patient = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(patient);

    res.json(newPatient);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
export default router;