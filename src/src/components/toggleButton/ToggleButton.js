import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

const Container = styled.div`
  width: 40px;
  margin: auto 0px;
  border-radius: 100px;
  padding: 2px;

  ${({ theme }) => css`
    border: 1px solid ${theme.TOGGLE_BUTTON};
  `}
`;

const Inner = styled.div`
  height: 20px;
  width: 20px;
  background-color: red;
  border-radius: 100px;
  transition: all 0.3s ease-in-out;

  ${({ checked, theme }) => css`
    transform: translateX(${checked ? 14 : 0}px);
    background-color: ${theme.TOGGLE_BUTTON};
  `}
`;

function ToggleButton({ checked, onToggle }) {
  return (
    <Container onClick={onToggle}>
      <Inner checked={checked} />
    </Container>
  );
}

export default ToggleButton;
