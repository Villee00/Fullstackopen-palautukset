import { Field, Formik } from "formik";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useStateValue } from "../state";
import { EntryFormValues } from "../types";
import { DiagnosisSelection, NumberField } from "./FormField";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
    initialValues={{
      description : "",
      date : "",
      specialist : "",
      healthCheckRating : 1,
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
    {({isValid, dirty, setFieldValue, setFieldTouched, handleSubmit }) => {

      return (
        <Form className="form ui" onSubmit={handleSubmit}>
          <b>description</b>
          <Field name="description" placeholder="description" type="text"/>
          <b>date</b>
          <Field name="date" type="date"/>
          <b>specialist</b>
          <Field name="specialist" placeholder="specialist" type="text"/>
          <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          />    
          <Button type="button" onClick={onCancel} color="red">Cancel</Button>
          <Button type="submit" color="purple"
          disabled={!dirty || !isValid}>Submit</Button>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;