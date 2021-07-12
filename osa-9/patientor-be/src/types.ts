
export interface DiagnosesEntery {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entery {

}
export interface PatientsEntery {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entery[]
}

export type NonSensitivePatientsEntries = Omit<PatientsEntery,'ssn' | 'entries'>;

export type NewPatientEntire = Omit<PatientsEntery, "id">;