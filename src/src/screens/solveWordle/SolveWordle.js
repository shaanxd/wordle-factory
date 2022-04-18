import React from "react";
import styled from "styled-components";
import { Keyboard, TitleBar, Wordle } from "../../components";

const Container = styled.div`
  flex: 1;
  border: 2px solid red;
  display: flex;
  flex-direction: column;
`;

const KeyboardContainer = styled.div`
  margin-top: auto;
`;

const WordleContainer = styled.div``;

function SolveWordle() {
  return (
    <Container>
      <TitleBar title="Got what it takes?" />
      <WordleContainer>
        <Wordle />
      </WordleContainer>
      <KeyboardContainer>
        <Keyboard />
      </KeyboardContainer>
    </Container>
  );
}

export default SolveWordle;
