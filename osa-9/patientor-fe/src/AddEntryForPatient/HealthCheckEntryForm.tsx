import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { useStateValue } from "../state";
import { EntryFormValues } from "../types";
import { DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 1,
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
        if (!values.healthCheckRating) {
          errors.occupation = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
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
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
              <ErrorMessage name="healthCheckRating" />
            </Form.Field>

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
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

export default AddEntryForm;