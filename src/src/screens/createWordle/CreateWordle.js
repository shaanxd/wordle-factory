import React, { useRef, useState } from "react";
import styled, { withTheme, css } from "styled-components";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { v4 } from "uuid";
import { SyncLoader } from "react-spinners";
import { BsCheckLg } from "react-icons/bs";
import { toast } from "react-toastify";

import {
  NumberPicker,
  CreationSuccessModal,
  ScreenContainer,
} from "../../components";
import { createWordle } from "../../firebase/wordle";
import { getEncryptedWord } from "../../utils/encryption";

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

  ${({ theme, uppercase }) => css`
    color: ${theme.INPUT.TEXT};
    border-bottom: 2px solid ${theme.INPUT.BORDER};
    background-color: ${theme.INPUT.BACKGROUND};
  `};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Label = styled.div`
  ${({ theme }) => css`
    color: ${theme.LABEL.TEXT};
  `};
`;

const ButtonLabel = styled.span`
  margin-right: 10px;
`;

const Submit = styled.button`
  margin-top: auto;
  padding: 15px;
  border: none;
  border-radius: 5px;

  ${({ theme, success }) => css`
    color: ${success ? theme.BUTTON.SUCCESS.TEXT : theme.BUTTON.DEFAULT.TEXT};
    background-color: ${success
      ? theme.BUTTON.SUCCESS.BACKGROUND
      : theme.BUTTON.DEFAULT.BACKGROUND};
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

const Subtitle = styled.div`
  font-size: 14px;
  text-align: justify;

  ${({ theme }) => css`
    color: ${theme.LABEL.TEXT};
  `}
`;

function CreateWordle({ theme }) {
  const formikRef = useRef();

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);

  async function handleOnSubmit({ wordle, ...rest }) {
    try {
      setLoading(true);
      const id = v4();

      await createWordle(id, {
        id,
        wordle: getEncryptedWord(wordle.toUpperCase()).toString(),
        ...rest,
      });
      setUrl(`${window.location.origin}/wordle/${id}`);
    } catch (err) {
      toast("Error occurred while creating the challenge.");
    }
    setLoading(false);
  }

  function handleOnCountChange(number) {
    formikRef.current.setFieldValue("attempts", number);
  }

  function handleOnReset() {
    setUrl(null);
    formikRef.current?.resetForm?.();
  }

  function handleOnWordChange({ target: { value } }) {
    formikRef.current?.setFieldValue(
      "wordle",
      value.replace(/[^A-Za-z]/gi, "")
    );
  }
  return (
    <ScreenContainer titleBarParams={{ title: "Wordlabs" }}>
      <ContentContainer>
        <Formik
          initialValues={{ attempts: 3, wordle: "" }}
          innerRef={formikRef}
          validationSchema={Yup.object({
            wordle: Yup.string()
              .required("Word is required.")
              .max(10, "Word cannot exceed 10 characters.")
              .min(4, "Word should contain atleast 4 characters."),
          })}
          onSubmit={handleOnSubmit}
        >
          {({ values: { attempts }, submitForm }) => (
            <Form>
              <Subtitle>
                Welcome to Wordlabs! Looking to challenge your friends with a
                brain teaser? You're in the right place! Go ahead and create a
                challenge. You can define the word to be guessed, the no. of
                attempts and voila!
              </Subtitle>
              <InputContainer>
                <Label>Word*</Label>
                <StyledField
                  name="wordle"
                  disabled={loading}
                  onChange={handleOnWordChange}
                  placeholder="Enter Word"
                />
                <ErrorMessage
                  name="wordle"
                  render={(message) => <Error>{message}</Error>}
                />
              </InputContainer>
              <InputContainer>
                <Label>No. of attempts*</Label>
                <NumberPicker
                  value={attempts}
                  onValueChange={handleOnCountChange}
                  step={1}
                  minValue={3}
                  maxValue={10}
                  disabled={loading}
                />
              </InputContainer>
              <Submit
                type="button"
                onClick={submitForm}
                success={url}
                disabled={loading}
              >
                {loading ? (
                  <SyncLoader size={10} color={theme.BUTTON.SPINNER} />
                ) : url ? (
                  <>
                    <ButtonLabel>Success</ButtonLabel>
                    <BsCheckLg size={12} color={theme.BUTTON.SUCCESS.TEXT} />
                  </>
                ) : (
                  "Create"
                )}
              </Submit>
            </Form>
          )}
        </Formik>
      </ContentContainer>
      <CreationSuccessModal url={url} onReset={handleOnReset} />
    </ScreenContainer>
  );
}

export default withTheme(CreateWordle);
