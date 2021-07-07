
import express from "express";
import { diagnosesList } from "../../data/dignoses";

const router = express.Router();

router.get('/', (_req, res) =>{
  res.json(diagnosesList);
});

export default router;