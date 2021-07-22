import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { Button, Form, Grid, Modal } from "semantic-ui-react";
import { useStateValue } from "../state";
import { EntryFormValues } from "../types";
import { DiagnosisSelection } from "../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const HospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 1,
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        }
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
        if (!values.healthCheckRating) {
          errors.occupation = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        if (!values.discharge.date || !values.discharge.criteria) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
      onSubmit={onSubmit}
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
            </Form.Field>

            <Form.Field>
              <label>Specialist</label>
              <Field name="specialist" placeholder="specialist" type="text" />
              <ErrorMessage name="specialist" />
            </Form.Field>

            <Form.Field>
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
              />
            </Form.Field>

            <h3>Discharge</h3>
            <Form.Field>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <label>Date</label>
                    <Field name="discharge.date" placeholder="specialist" type="date" />
                    <ErrorMessage name="discharge.date" />
                  </Grid.Column>
                  <Grid.Column>
                    <label>Criteria</label>
                    <Field name="discharge.criteria" placeholder="criteria" type="text" />
                    <ErrorMessage name="discharge.criteria" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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

export default HospitalEntryForm;