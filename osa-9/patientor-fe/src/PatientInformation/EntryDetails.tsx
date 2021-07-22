import React from "react";
import HospitalEntryDetail from "./HospitalType";
import OccupationalHealthcareType from "./OccupationalHealthcareType";
import { Entry } from "../types";
import assertNever from "../components/AssertNever";
import HealthCheckType from "./HealthCheckType";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }): JSX.Element => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetail entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareType entry={entry} />;
    case "HealthCheck":
      return <HealthCheckType entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;