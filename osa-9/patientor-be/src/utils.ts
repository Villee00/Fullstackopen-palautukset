import { NewPatientEntire } from "./types";

const isString = (value: unknown):value is string =>{
  return typeof value ==='string' || value instanceof String;
};

const isDate = (date: string): boolean =>{
  return Boolean(Date.parse(date));
};

const validateName = (name:unknown):string =>{
  if(!isString(name)){
    throw new Error("Name is in invalid format");
  }
  return name;
};

const validateDateOfBirth = (dateOfBirth:string):string =>{
  if(!isString(dateOfBirth) || !isDate(dateOfBirth)){
    throw new Error("date of birthday is in wrong format");
  }
  return dateOfBirth;
};

const validateSsn = (ssn:unknown):string =>{
  if(!isString(ssn)){
    throw new Error("Ssn is in invalid format");
  }
  return ssn;
};

const validateGender = (gender:unknown):string =>{
  if(!isString(gender)){
    throw new Error("Gender is in invalid format");
  }
  return gender;
};

const validateOccupation = (occupation:unknown):string =>{
  if(!isString(occupation)){
    throw new Error("Occupation is in invalid format");
  }
  return occupation;
};

type Fields = {name :string, dateOfBirth:string, ssn:string, gender:string, occupation:string};
  
const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}:Fields): NewPatientEntire =>{
  const newPatient: NewPatientEntire = {
    name: validateName(name),
    dateOfBirth: validateDateOfBirth(dateOfBirth),
    ssn: validateSsn(ssn),
    gender: validateGender(gender),
    occupation: validateOccupation(occupation),
    entries: []
  };

  return newPatient;
};

export default toNewPatient;