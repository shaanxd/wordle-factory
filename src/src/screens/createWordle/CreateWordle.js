import React, { useRef } from "react";
import styled from "styled-components";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";

import { TitleBar, NumberPicker } from "../../components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
  border: 1px solid red;
`;

const StyledField = styled(Field)`
  font-size: 1.2rem;
  padding: 10px 5px;
  border: none;
  border-bottom: 2px solid red;

  &:focus {
    outline: none;
  }
`;

const Label = styled.div`
  margin-top: 20px;
`;

const Submit = styled.button`
  margin-top: auto;
  padding: 8px 10px;
`;

const Error = styled.div`
  font-size: 12px;
`;

function CreateWordle() {
  const formikRef = useRef();

  function handleOnCountChange(number) {
    formikRef.current.setFieldValue("attempts", number);
  }

  return (
    <Container>
      <TitleBar title="Create Wordle!" />
      <Formik
        initialValues={{ attempts: 3, wordle: "" }}
        innerRef={formikRef}
        validationSchema={Yup.object({
          wordle: Yup.string()
            .required("Wordle is required.")
            .max(10, "The wordle cannot exceed 10 characters.")
            .min(4, "The wordle should contain atleast 4 characters."),
        })}
      >
        {({ values: { attempts }, submitForm }) => (
          <Form>
            <Label>Wordle</Label>
            <StyledField name="wordle" />
            <ErrorMessage
              name="wordle"
              render={(message) => <Error>{message}</Error>}
            />
            <Label>No. of attempts</Label>
            <NumberPicker
              value={attempts}
              onValueChange={handleOnCountChange}
              step={1}
              minValue={3}
              maxValue={10}
            />
            <Submit type="button" onClick={submitForm}>
              Create!
            </Submit>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default CreateWordle;
