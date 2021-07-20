import { BaseEntryWithoutId, discharge, Entry, EntryWithoutId, HealthCheckRating, NewPatientEntire, sickLeave } from "./types";


export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const validateName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Name is in invalid format");
  }
  return name;
};

const validateDateOfBirth = (dateOfBirth: string): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("date of birthday is in wrong format");
  }
  return dateOfBirth;
};

const validateSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Ssn is in invalid format");
  }
  return ssn;
};

const validateGender = (gender: unknown): string => {
  if (!isString(gender)) {
    throw new Error("Gender is in invalid format");
  }
  return gender;
};

const validateOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Occupation is in invalid format");
  }
  return occupation;
};

const validateEmployer = (employerName: unknown): string =>{
  if (!isString(employerName)) {
    throw new Error("Employer is in invalid format");
  }
  return employerName;
};

const validateHealthCheckRating = (healthCheckRating: HealthCheckRating): HealthCheckRating =>{
  if (!healthCheckRating) {
    throw new Error("Health Check Rating of birthday is in wrong format");
  }
  return healthCheckRating;
};

const validateSickLeave = (sickLeave: sickLeave): sickLeave => {
  if (!isString(sickLeave.startDate) || !isDate(sickLeave.startDate)) {
    throw new Error("sickLeave of birthday is in wrong format");
  }
  if (!isString(sickLeave.endDate) || !isDate(sickLeave.endDate)) {
    throw new Error("sickLeave of birthday is in wrong format");
  }
  return sickLeave;
};

const validateDischarge = (discharge: discharge ): discharge =>{
  if(discharge)
  if(!isDate(discharge.date) || !isString(discharge.date)){
    throw new Error("discharge is in invalid format");
  }
  if(!isString(discharge.criteria)){
    throw new Error("discharge is in invalid format");
  }
  return discharge;
};


type Fields = { name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntire => {
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

export const toNewEntry = (props:Entry):EntryWithoutId =>{

  const newEntry:BaseEntryWithoutId = {
    description: props.description,
    date: props.date,
    specialist: props.specialist,
    diagnosisCodes: props.diagnosisCodes,
  };

  switch(props.type){
    case "Hospital":
      return {
        ...newEntry,
        type: props.type,
        discharge: validateDischarge(props.discharge)
      };
    case "OccupationalHealthcare":
      if(props.sickLeave === undefined){
        throw new Error("sickLeave is in invalid format");
      }
      return {
        ...newEntry,
        type: props.type,
        employerName: validateEmployer(props.employerName),
        sickLeave: validateSickLeave(props.sickLeave),
      };
    case "HealthCheck":
      return {
        ...newEntry,
        type: props.type,
        healthCheckRating: validateHealthCheckRating(props.healthCheckRating),
      };
    default:
      return assertNever(props);
  }
};



