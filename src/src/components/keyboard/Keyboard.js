import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { BsBackspaceReverse, BsArrowReturnLeft } from "react-icons/bs";

import { KeyState } from "../../constants";

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
  padding: 10px 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;

  ${({ status, theme }) => css`
    background-color: ${theme.KEYS.BACKGROUND[status] ||
    theme.KEYS.BACKGROUND[KeyState.UNVERIFIED]};
    color: ${theme.KEYS.TEXT[status] || theme.KEYS.TEXT[KeyState.UNVERIFIED]};
    border: 1px solid
      ${theme.KEYS.BORDER[status] || theme.KEYS.BORDER[KeyState.UNVERIFIED]};
  `}
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
  [DELETE, "Z", "X", "C", "V", "B", "N", "M", ENTER],
];

function Keyboard({ onKeyPress, onDelete, onSubmit, statusMap }) {
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
                {/* {key} */}{" "}
                {key === DELETE ? (
                  <BsBackspaceReverse size={20} />
                ) : (
                  <BsArrowReturnLeft size={20} />
                )}
              </SpecialButton>
            ) : (
              <Button
                key={`${rowIdx}-${colIdx}`}
                onClick={() => {
                  onKeyPress(key);
                }}
                status={statusMap[key]}
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

Keyboard.defaultProps = {
  onKeyPress: () => {},
  onDelete: () => {},
  onSubmit: () => {},
  statusMap: {},
};

export default Keyboard;
