import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 1.3rem;

  ${({ theme }) => css`
    color: ${theme.NUMBER_PICKER.BUTTON.TEXT};
    background-color: ${theme.NUMBER_PICKER.BUTTON.BACKGROUND};
  `};
`;

const Label = styled.div`
  min-width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => css`
    color: ${theme.NUMBER_PICKER.TEXT};
  `};
`;

function NumberPicker({
  value,
  onValueChange,
  maxValue,
  minValue,
  step,
  disabled,
}) {
  function handleOnIncrement() {
    const updated = value + step;

    onValueChange(updated >= maxValue ? maxValue : updated);
  }

  function handleOnDecrement() {
    const updated = value - step;

    onValueChange(updated <= minValue ? minValue : updated);
  }

  return (
    <Container>
      <Button type="button" onClick={handleOnDecrement} disabled={disabled}>
        -
      </Button>
      <Label>{value}</Label>
      <Button type="button" onClick={handleOnIncrement} disabled={disabled}>
        +
      </Button>
    </Container>
  );
}

NumberPicker.defaultProps = {
  minValue: 0,
  maxValue: 10,
  value: 0,
  onValueChange: () => {},
  step: 1,
  disabled: false,
};

export default NumberPicker;
