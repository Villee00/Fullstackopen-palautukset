import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EntryDetails from "./EntryDetails";
import { apiBaseUrl } from "../constants";
import { setPatientInformation, useStateValue } from "../state";
import { Patient } from "../types";

const PatientInformation = () =>{
  const [{ patient }, dispatch] = useStateValue();
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
      {patient.entries.map((entry) =>
      <EntryDetails key={entry.id} entry={entry}/>)}
    </div>
  );
};

export default PatientInformation;