import { Field, Formik } from "formik";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useStateValue } from "../state";
import { EntryFormValues } from "../types";
import { DiagnosisSelection } from "./FormField";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [{ diagnosis }] = useStateValue();
  console.log(Object.values(diagnosis));
  return (
    <Formik
    initialValues={{
      description : "",
      date : "",
      specialist : "",
      healthCheckRating : 0,
      diagnosisCodes: []
    }}
    onSubmit={onSubmit}
  >
    {({setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field name="description" type="text"/>
          <Field name="date" type="text"/>
          <Field name="specialist" type="text"/>
          <Field name="healthCheckRating" type="number"/>

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          />    
          <Button type="submit">Submit</Button>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;