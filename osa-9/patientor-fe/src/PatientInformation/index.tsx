import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { setPatientInformation, useStateValue } from "../state";
import { Patient } from "../types";

const PatientInformation = () =>{
  const [{ patient, diagnosis }, dispatch] = useStateValue();
  const {id} = useParams<{id:string}>();

  useEffect(() =>{
    const fetchPatient = async () =>{
      try {
        const {data: foundPatient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setPatientInformation(foundPatient));
      } catch (error) {
        console.log(error);
      }
    };
    if(patient === null || patient.id !== id){
      fetchPatient()
      .catch((e) => console.log(e));
    }
    
  }, [patient, id]);

  if(patient === null){
    return(
      <p>No user found with that id</p>
    );
  }
  return(
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.map((entry) =>{
        return(
          <div key={entry.id}>
            <p>{entry.date} {entry.description}</p>
            <ul>
            {entry.diagnosisCodes?.map(n => <li key={n}>{n} {diagnosis[n]}</li>)}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PatientInformation;