import React from "react";
import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";

const HealthCheckType: React.FC<{entry:HealthCheckEntry}> = ({entry}) =>{
  const [{diagnosis}] = useStateValue();

  return(
    <div>
      <h4>{entry.date} {entry.description}</h4>
      <b>Health check rating</b>
      <p>{entry.healthCheckRating}</p>
      <ul>
      {entry.diagnosisCodes?.map(n => <li key={n}>{n} {diagnosis[n].name}</li>)}
      </ul>
    </div>
  );
};

export default HealthCheckType;