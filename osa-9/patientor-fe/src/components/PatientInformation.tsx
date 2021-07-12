import React from "react";
import { Patient } from "../types";

const PatientInformation = (props:Patient) =>{
  
  return(
    <div>
      <h2>{props.name}</h2>
      <p>ssn: {props.ssn}</p>
      <p>occupation: {props.occupation}</p>
    </div>
  );
};

export default PatientInformation;