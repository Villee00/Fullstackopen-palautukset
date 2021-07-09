import { NewPatientEntire } from "./types";


type Fields = {name :string, dateOfBirth:string, ssn:string, gender:string, occupation:string};
  
const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}:Fields): NewPatientEntire =>{
  const newPatient: NewPatientEntire = {
    name: name,
    dateOfBirth: dateOfBirth,
    ssn: ssn,
    gender: gender,
    occupation: occupation,
  };

  return newPatient;
};

export default toNewPatient;