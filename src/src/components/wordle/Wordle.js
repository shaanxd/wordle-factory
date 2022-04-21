import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { KeyState } from "../../constants";

const Root = styled.div`
  flex: 1;
`;

const Container = styled.div`
  padding: 5px;
  max-width: 400px;
  margin: auto;
`;

const Row = styled.div`
  display: flex;
`;

const Letter = styled.div`
  flex: 1;
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  padding: 2.5px;
  display: flex;
  perspective: 1000px;
  background-color: transparent;
}
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  ${({ flipped }) =>
    flipped && `transform: rotateY(180deg);transform-delay: 2s`}
`;

const FlipCardStyles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
`;

const FlipCardFront = styled(FlipCardStyles)`
  background-color: #bbb;
}
`;

const FlipCardBack = styled(FlipCardStyles)`
  background-color: ${({ status }) => {
    switch (status) {
      case KeyState.ABSENT:
        return "red";
      case KeyState.MISPLACED:
        return "yellow";
      case KeyState.PLACED:
        return "green";
      default:
        return "none";
    }
  }};

  transform: rotateY(180deg);
`;

function getWidthPerTile(width, numberOfTiles) {
  return width / numberOfTiles;
}

function getFlippedState(status) {
  return status !== undefined && status !== KeyState.UNVERIFIED;
}

function Word({ letter, status, width, idx }) {
  const [flipped, setFlipped] = useState(getFlippedState(status));

  useEffect(() => {
    setTimeout(() => {
      setFlipped(getFlippedState(status));
    }, [idx * 100]);
    //  eslint-disable-next-line
  }, [status]);

  return (
    <Letter height={width}>
      <FlipCardInner flipped={flipped}>
        <FlipCardFront>{letter}</FlipCardFront>
        <FlipCardBack status={status}>{letter}</FlipCardBack>
      </FlipCardInner>
    </Letter>
  );
}

Word.defaultProps = {
  letter: "",
  status: KeyState.UNVERIFIED,
  idx: 0,
  width: 0,
};

function Wordle({ solution, rows, columns }) {
  const ref = useRef();

  const [matrix, setMatrix] = useState([]);
  const [width, setWidth] = useState(0);
  const [widthAdjusted, setWidthAdjusted] = useState(false);
  const [widthPerTab, setWidthPerTile] = useState(0);

  useEffect(() => {
    const matrix = [];
    const column = [];

    for (let i = 0; i < columns; i++) {
      column.push({});
    }

    for (let i = 0; i < rows; i++) {
      matrix.push(column);
    }

    setMatrix(matrix);
    //  eslint-disable-next-line
  }, [rows, columns, solution]);

  useEffect(() => {
    let timeout = null;

    function handleResize() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setWidth(ref.current.offsetWidth);
      }, 100);
    }

    setWidth(ref.current.offsetWidth);
    setWidthAdjusted(true);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    setWidthPerTile(getWidthPerTile(width, columns));
  }, [width, columns]);

  return (
    <Root>
      <Container ref={ref}>
        {(() => {
          if (!widthAdjusted) {
            return null;
          }

          return matrix.map((row, rowIdx) => (
            <Row key={rowIdx}>
              {row.map((_, colIdx) => {
                const { key, status } = solution[rowIdx]?.[colIdx] || {};

                return (
                  <Word
                    width={widthPerTab}
                    letter={key}
                    status={status}
                    key={`${key}-${colIdx}`}
                    idx={colIdx}
                  />
                );
              })}
            </Row>
          ));
        })()}
      </Container>
    </Root>
  );
}

Wordle.defaultProps = {
  solution: [],
  wordle: "",
};

export default Wordle;
