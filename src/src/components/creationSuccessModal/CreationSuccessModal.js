import React from "react";
import { Modal } from "react-bootstrap";
import styled, { css, withTheme } from "styled-components";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiArrowGoForwardLine } from "react-icons/ri";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;

  ${({ theme }) => css`
    background-color: ${theme.MODAL.BACKGROUND};
    color: ${theme.MODAL.TEXT};
  `};
`;

const Header = styled.div`
  display: flex;
  font-size: 15px;
  text-align: center;
`;

const Title = styled.div`
  font-size: 2rem;
  margin: auto;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Button = styled.button`
  flex: 1;
  margin-top: 20px;
  padding: 15px;
  border: none;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  display: flex;

  ${({ theme, alternate }) => css`
    color: ${alternate ? theme.BUTTON.SUCCESS.TEXT : theme.BUTTON.DEFAULT.TEXT};
    background-color: ${alternate
      ? theme.BUTTON.SUCCESS.BACKGROUND
      : theme.BUTTON.DEFAULT.BACKGROUND};
  `};
`;

const Separator = styled.div`
  width: 15px;
`;

const ButtonLabel = styled.label`
  margin-right: 10px;
`;

function CreationSuccessModal({ url, onReset, theme }) {
  function handleOnShareClick() {
    navigator.clipboard.writeText(
      `💡 Got what it takes? Try this challenge.\n\n${url}`
    );

    toast("Copied to clipboard.");
  }

  function handleOnReset() {
    onReset();
  }

  return (
    <Modal show={url} backdrop="static" centered>
      <Container>
        <Title>Success!</Title>
        <Header>
          Click the Share button to copy the link to the challenge! To create
          another, click the Reset button.
        </Header>
        <ButtonContainer>
          <Button onClick={handleOnShareClick}>
            <ButtonLabel>Share</ButtonLabel>
            <IoShareSocialOutline color={theme.BUTTON.SUCCESS.TEXT} />
          </Button>
          <Separator />
          <Button alternate onClick={handleOnReset}>
            <ButtonLabel>Reset</ButtonLabel>
            <RiArrowGoForwardLine color={theme.BUTTON.SUCCESS.TEXT} />
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

CreationSuccessModal.defaultProps = {
  url: null,
  onReset: () => {},
};

export default withTheme(CreationSuccessModal);
