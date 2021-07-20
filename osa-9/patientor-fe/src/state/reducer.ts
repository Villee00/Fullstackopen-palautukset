import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |
    {
      type: "SET_PATIENT";
      payload: Patient;
    }
  |
    {
      type:"SET_DIAGNOSIS";
      payload: Array<Diagnosis>;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return{
        ...state,
        patient: action.payload
      };
    
    case "SET_DIAGNOSIS":
      return{
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]):Action =>{
  return{ 
    type: "SET_PATIENT_LIST", 
    payload: patientList };
};

export const setPatientInformation = (patient: Patient):Action =>{
  return{
    type: "SET_PATIENT",
    payload: patient
  };
};

export const setDiagnosis = (diagnosis: Array<Diagnosis>):Action =>{
  return{
    type:"SET_DIAGNOSIS",
    payload:diagnosis
  };
};
export const addPatient = (patient:Patient):Action =>{
  return{
    type: "ADD_PATIENT",
    payload: patient
  };
};