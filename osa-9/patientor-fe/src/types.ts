export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}


export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

/* eslint-disable @typescript-eslint/no-unused-vars */
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface discharge {
  date: string;
  criterian: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: discharge;
}

interface sickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: sickLeave;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries: Entry[]
}
