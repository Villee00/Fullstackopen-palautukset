import { patientsList } from "../../data/patients";
import { NonSensitivePatientsEntries, PatientsEntery } from "../types";

const getEnteries = (): Array<PatientsEntery> => {
  console.log(patientsList);
  return patientsList;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntries[] => {
  return patientsList.map(({ id, name, dateOfBirth, gender, occupation }) =>({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

export default {getNonSensitiveEntries, getEnteries};