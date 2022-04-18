import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 4px 10px;
`;

const Label = styled.div`
  margin: auto 10px;
`;

function NumberPicker({ value, onValueChange, maxValue, minValue, step }) {
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
      <Button type="button" onClick={handleOnDecrement}>
        -
      </Button>
      <Label>{value}</Label>
      <Button type="button" onClick={handleOnIncrement}>
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
};

export default NumberPicker;
