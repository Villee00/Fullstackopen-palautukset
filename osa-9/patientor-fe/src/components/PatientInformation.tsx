import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";

const PatientInformation = () =>{
  const [{ patients }] = useStateValue();
  const {id} = useParams<{id: string}>();
  const patient = Object.values(patients).find(patient => patient.id === id);

  console.log(patient);
  if(patient === undefined){
    return(
      <p>No patient with that id</p>
    );
  }
  return(
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientInformation;