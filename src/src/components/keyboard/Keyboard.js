import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  flex: 1;
  margin: 2.5px;
  padding: 20px 4px;
  font-size: 12px;
`;

const Space = styled.div`
  flex: 0.5;
`;

const SpecialButton = styled(Button)`
  flex: 1.5;
`;

const SPACE = "SPACE";
const ENTER = "ENTER";
const DELETE = "DELETE";

const Keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  [SPACE, "A", "S", "D", "F", "G", "H", "J", "K", "L", SPACE],
  [ENTER, "Z", "X", "C", "V", "B", "N", "M", DELETE],
];

function Keyboard({ onKeyPress, onDelete, onSubmit }) {
  return (
    <Container>
      {Keys.map((row, rowIdx) => (
        <Row key={rowIdx}>
          {row.map((key, colIdx) =>
            key === SPACE ? (
              <Space key={`${rowIdx}-${colIdx}`} />
            ) : [ENTER, DELETE].includes(key) ? (
              <SpecialButton
                key={`${rowIdx}-${colIdx}`}
                onClick={key === DELETE ? onDelete : onSubmit}
              >
                {key}
              </SpecialButton>
            ) : (
              <Button
                key={`${rowIdx}-${colIdx}`}
                onClick={() => {
                  onKeyPress(key);
                }}
              >
                {key}
              </Button>
            )
          )}
        </Row>
      ))}
    </Container>
  );
}

export default Keyboard;
