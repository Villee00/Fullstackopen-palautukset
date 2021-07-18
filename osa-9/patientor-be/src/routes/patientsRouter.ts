import express from "express";
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const patient = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(patient);

    res.json(newPatient);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatient(req.params.id);

  if (patient) {
    res.json(patientsService.getPatient(req.params.id));
  }
  else {
    res.status(404).json({
      error: "User with that id was not found"
    });
  }

});
export default router;