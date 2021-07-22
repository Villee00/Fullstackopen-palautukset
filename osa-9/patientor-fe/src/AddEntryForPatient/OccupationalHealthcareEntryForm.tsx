import { ErrorMessage, Field, Formik } from "formik";
import React, { useState } from "react";
import { Button, Checkbox, Form, Grid, Modal } from "semantic-ui-react";
import { useStateValue } from "../state";
import { EntryFormValues, OccupationalEntryFormValues } from "../types";
import { DiagnosisSelection } from "../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const OccupationalHealthcareEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  const [isSickLeave, setIsSickLeave] = useState(false);

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        diagnosisCodes: []
      }}

      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.ssn = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if((!values.sickLeave.startDate && isSickLeave) || (!values.sickLeave.endDate && isSickLeave)){
          errors.sickLeave = requiredError;
        }
        return errors;
      }}

      onSubmit={(values: OccupationalEntryFormValues) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sickLeave, ...rest } = values;
        if (!isSickLeave) {
          return onSubmit(rest);
        }
        return onSubmit(values);
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, handleSubmit }) => {

        return (
          <Form className="form ui" onSubmit={handleSubmit}>
            <Form.Field>
              <label>Description</label>
              <Field name="description" placeholder="description" type="text" />
              <ErrorMessage name="description" />
            </Form.Field>

            <Form.Field>
              <label>Date</label>
              <Field name="date" type="date" />
              <ErrorMessage name="date" />
              c           </Form.Field>

            <Form.Field>
              <label>Specialist</label>
              <Field name="specialist" placeholder="specialist" type="text" />
              <ErrorMessage name="specialist" />
            </Form.Field>

            <Form.Field>
              <label>Employer name</label>
              <Field name="employerName" placeholder="employer Name" type="text" />
              <ErrorMessage name="employerName" />
            </Form.Field>

            <Form.Field>
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
              />
              <ErrorMessage name="DiagnosisSelection" />
            </Form.Field>

            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <label>Start Date</label>
                  <Field name="sickLeave.startDate" placeholder="Start Date" type="date" disabled={!isSickLeave} />
                  <ErrorMessage name="sickLeave.startDate" />
                </Grid.Column>

                <Grid.Column>
                  <label>End Date</label>
                  <Field name="sickLeave.endDate" placeholder="End Date" type="date" disabled={!isSickLeave} />
                  <ErrorMessage name="sickLeave.endDate" />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Form.Field>
              <Checkbox label="Add sick leave" onChange={() => setIsSickLeave(!isSickLeave)} />
            </Form.Field>

            <Modal.Actions>
              <Button type="button" onClick={onCancel} color="red">Cancel</Button>
              <Button type="submit"
                disabled={!dirty || !isValid}>Submit</Button>
            </Modal.Actions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareEntryForm;