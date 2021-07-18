import { patientsList } from "../../data/patients";
import { NonSensitivePatientsEntries, PatientsEntery, NewPatientEntire } from "../types";
import { v1 as uuid } from 'uuid';

const getEnteries = (): Array<PatientsEntery> => {
  return patientsList;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntries[] => {
  return patientsList.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patent: NewPatientEntire): PatientsEntery => {
  const id = uuid();

  const newPatient: PatientsEntery = {
    id,
    ...patent
  };
  patientsList.push(newPatient);

  return newPatient;
};

const getPatient = (id: string): PatientsEntery | undefined => {
  return getEnteries().find(n => n.id === id);
};

export default { getNonSensitiveEntries, getEnteries, addPatient, getPatient };