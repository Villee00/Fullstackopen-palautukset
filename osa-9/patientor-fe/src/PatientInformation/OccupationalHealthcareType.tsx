import React from "react";
import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcareType: React.FC<{entry:OccupationalHealthcareEntry}> = ({entry}) =>{
  const [{diagnosis}] = useStateValue();

  return(
    <div>
      <h4>{entry.date} {entry.description}</h4>
      <b>Employer: {entry.employerName} </b>
      {entry.sickLeave? <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
      : <p>No sick leave</p>}
      <ul>
      {entry.diagnosisCodes?.map(n => <li key={n}>{n} {diagnosis[n]}</li>)}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareType;