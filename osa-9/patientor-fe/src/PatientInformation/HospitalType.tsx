import React from "react";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";

const HospitalType: React.FC<{entry:HospitalEntry}> = ({entry}) =>{
  const [{diagnosis}] = useStateValue();
  return(
    <div>
      <h4>{entry.date} {entry.description}</h4>
      <b>Discharged</b>
      <p>{entry.discharge.date} {entry.discharge.criteria}</p>
      <ul>
      {entry.diagnosisCodes?.map(n => <li key={n}>{n} {diagnosis[n]}</li>)}
      </ul>
    </div>
  );
};

export default HospitalType;