import express from "express";
import { patientsList } from "../../data/patients";

const router = express.Router();

router.get('/', (_req, res) =>{
  res.json(patientsList);
});


export default router;