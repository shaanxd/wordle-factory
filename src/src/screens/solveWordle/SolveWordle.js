import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Keyboard, TitleBar, Wordle } from "../../components";
import { KeyMappings, KeyState, SolvedState } from "../../constants";
import { createSolution, updateSolution } from "../../reducer/data";

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

const KeyboardContainer = styled.div`
  margin-top: auto;
`;

const WordleContainer = styled.div`
  flex: 1;
  display: flex;
  overflow: auto;
`;

const sample = {
  attempts: 5,
  wordle: "HELLO",
  id: "sample",
};

function SolveWordle() {
  const dispatch = useDispatch();

  const [challenge, setChallenge] = useState(sample);
  const [solution, setSolution] = useState([]);
  const [row, setRow] = useState(0);
  const [keyboardStatusMap, setKeyboardStatusMap] = useState({});

  const storedSolution = useSelector(
    (state) => state.data.wordles[challenge?.id]
  );

  useEffect(() => {
    if (!storedSolution) {
      return;
    }

    const clonedStoredSolution = JSON.parse(
      JSON.stringify(storedSolution.solution)
    );

    const row =
      storedSolution.status === SolvedState.SOLVED
        ? -1
        : clonedStoredSolution.findIndex((row) => row.length === 0);

    setSolution(JSON.parse(JSON.stringify(storedSolution.solution)));
    setRow(row);
  }, [storedSolution]);

  useEffect(() => {
    if (row === -1) {
    }
  }, [row]);

  const handleOnSubmit = useCallback(() => {
    const { id, wordle } = challenge;

    if (row === -1 || solution[row].length !== wordle.length) {
      return;
    }

    let updated = [...solution];
    updated[row] = updated[row].map(({ key }, idx) => ({
      key,
      status:
        wordle[idx] === key
          ? KeyState.PLACED
          : wordle.includes(key)
          ? KeyState.MISPLACED
          : KeyState.ABSENT,
    }));

    dispatch(
      updateSolution({
        id,
        solution: updated,
        status: updated[row].every(({ status }) => status === KeyState.PLACED)
          ? SolvedState.SOLVED
          : SolvedState.SOLVING,
      })
    );
  }, [row, solution, challenge, dispatch]);

  const handleOnDelete = useCallback(() => {
    if (row === -1 || solution[row].length === 0) {
      return;
    }

    let updated = [...solution];
    updated[row].pop();

    setSolution(updated);
  }, [row, solution]);

  const handleOnKeyPress = useCallback(
    (key) => {
      const { wordle } = challenge;

      if (row === -1 || solution[row].length === wordle.length) {
        return;
      }

      const updated = [...solution];
      updated[row].push({ key, state: KeyState.UNVERIFIED });

      setSolution(updated);
    },
    [row, challenge, solution]
  );

  const handleOnKeyboardPress = useCallback(
    ({ key }) => {
      const upperCaseKey = key?.toUpperCase();

      if (KeyMappings[upperCaseKey]) {
        return handleOnKeyPress(upperCaseKey);
      }
      if (upperCaseKey === "ENTER") {
        return handleOnSubmit();
      }
      if (upperCaseKey === "BACKSPACE") {
        return handleOnDelete();
      }
    },
    [handleOnKeyPress, handleOnDelete, handleOnSubmit]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleOnKeyboardPress);

    return () => {
      document.removeEventListener("keydown", handleOnKeyboardPress);
    };
  }, [handleOnKeyboardPress]);

  useEffect(() => {
    if (!challenge || storedSolution) {
      return;
    }
    const { attempts, id } = challenge;

    const arr = [];

    for (let i = 0; i < attempts; i++) {
      arr.push([]);
    }

    dispatch(createSolution({ id, solution: arr }));
  }, [challenge, dispatch, storedSolution]);

  useEffect(() => {
    if (!storedSolution) {
      return;
    }

    const map = {
      ...keyboardStatusMap,
    };

    storedSolution.solution.forEach((row, idx) =>
      row.forEach(({ key, status }) => {
        if (map[key] !== KeyState.PLACED) {
          map[key] = status;
        }
      })
    );

    setKeyboardStatusMap(map);
    //  eslint-disable-next-line
  }, [storedSolution]);

  return (
    <Container>
      <TitleBar title="Wordlab" />
      <ContentContainer>
        {(() => {
          if (!challenge) {
            //  Replace with loading screen
            return null;
          }

          const { wordle, attempts } = challenge;

          return (
            <>
              <WordleContainer>
                <Wordle
                  solution={solution}
                  columns={wordle.length}
                  rows={attempts}
                />
              </WordleContainer>
              <KeyboardContainer>
                <Keyboard
                  statusMap={keyboardStatusMap}
                  onKeyPress={handleOnKeyPress}
                  onDelete={handleOnDelete}
                  onSubmit={handleOnSubmit}
                />
              </KeyboardContainer>
            </>
          );
        })()}
      </ContentContainer>
    </Container>
  );
}

export default SolveWordle;
