import React, { useRef } from "react";
import styled from "styled-components";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";

import { TitleBar, NumberPicker } from "../../components";
import { css } from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.SCREEN.BACKGROUND};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0px auto;
  max-width: 500px;
  width: 100%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
`;

const StyledField = styled(Field)`
  font-size: 1.2rem;
  padding: 10px 5px;
  border: none;

  &:focus {
    outline: none;
  }

  ${({ theme }) => css`
    color: ${theme.INPUT.TEXT};
    border-bottom: 2px solid ${theme.INPUT.BORDER};
    background-color: ${theme.INPUT.BACKGROUND};
  `};
`;

const Label = styled.div`
  margin: 30px 0px 10px 0px;

  ${({ theme }) => css`
    color: ${theme.LABEL.TEXT};
  `};
`;

const Submit = styled.button`
  margin-top: auto;
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-size: 1.3rem;

  ${({ theme }) => css`
    color: ${theme.BUTTON.TEXT};
    background-color: ${theme.BUTTON.BACKGROUND};
  `};
`;

const Error = styled.div`
  font-size: 12px;
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;

  ${({ theme }) => css`
    color: ${theme.ERROR.TEXT};
    background-color: ${theme.ERROR.BACKGROUND};
  `};
`;

function CreateWordle() {
  const formikRef = useRef();

  function handleOnCountChange(number) {
    formikRef.current.setFieldValue("attempts", number);
  }

  return (
    <Container>
      <TitleBar title="Create Wordle" />
      <ContentContainer>
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
                Create
              </Submit>
            </Form>
          )}
        </Formik>
      </ContentContainer>
    </Container>
  );
}

export default CreateWordle;
