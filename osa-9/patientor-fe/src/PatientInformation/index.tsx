import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EntryDetails from "./EntryDetails";
import { apiBaseUrl } from "../constants";
import { setDiagnosis, setPatientInformation, useStateValue } from "../state";
import { Diagnosis, EntryFormValues, Patient } from "../types";
import AddEntryForm from "../AddEntryForPatient/HealthCheckEntryForm";
import { Button, Modal } from "semantic-ui-react";
import HospitalEntryForm from "../AddEntryForPatient/HospitalEntry";
import OccupationalHealthcareEntryForm from "../AddEntryForPatient/OccupationalHealthcareEntryForm";

const PatientInformation = () => {
  const [{ patient, diagnosis }, dispatch] = useStateValue();
  const [openForm, setOpenForm] = useState(false);
  const [openHospitalForm, setOpenHospitalForm] = useState(false);
  const [openOccupationalForm, setOpenOccupationalForm] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: foundPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setPatientInformation(foundPatient));


      } catch (error) {
        console.log(error);
      }
    };
    const fetchDiagnosis = async () => {
      try {
        const { data: diagnosisData } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
        dispatch(setDiagnosis(diagnosisData));
      } catch (error) {
        console.log(error);
      }
    };
    if (patient === null || patient.id !== id) {
      fetchPatient()
        .catch((e) => console.log(e));
    }
    if (Object.keys(diagnosis).length === 0) {
      fetchDiagnosis()
        .catch((e) => console.log(e));
    }
  }, [patient, id, diagnosis]);

  if (patient === null) {
    return (
      <p>No user found with that id</p>
    );
  }

  if (Object.keys(diagnosis).length === 0) {
    return (
      <p>Loading diagnosis...</p>
    );
  }

  const onSubmit = async (values: EntryFormValues) => {
    try {
      const sendData = { ...values };
      const { data: newPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${patient.id}/entries`, sendData);
      dispatch(setPatientInformation(newPatient));
      closeAllForms();
    }
    catch (error) {
      console.log(error);
    }
  };

  const onCancel = () => {
    closeAllForms();
  };

  const closeAllForms = () => {
    setOpenForm(false);
    setOpenHospitalForm(false);
    setOpenOccupationalForm(false);
  };

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries.map((entry) =>
        <EntryDetails key={entry.id} entry={entry} />)}

      <Modal
        onClose={() => setOpenForm(false)}
        onOpen={() => setOpenForm(true)}
        open={openForm}
        trigger={<Button>Add health check entry</Button>}>
        <Modal.Header>{`Add health check entry for ${patient.name}`} </Modal.Header>
        <Modal.Content>
          <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Modal.Content>
      </Modal>

      <Modal
        onClose={() => setOpenHospitalForm(false)}
        onOpen={() => setOpenHospitalForm(true)}
        open={openHospitalForm}
        trigger={<Button>Add hospital entry</Button>}>
        <Modal.Header>{`Add hospital entry for ${patient.name}`} </Modal.Header>
        <Modal.Content>
          <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Modal.Content>
      </Modal>

      <Modal
        onClose={() => setOpenOccupationalForm(false)}
        onOpen={() => setOpenOccupationalForm(true)}
        open={openOccupationalForm}
        trigger={<Button>Add occupational healthcare</Button>}>
        <Modal.Header>{`Add occupational healthcare entry for ${patient.name}`} </Modal.Header>
        <Modal.Content>
          <OccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default PatientInformation;