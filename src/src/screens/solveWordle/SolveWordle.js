import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Keyboard, TitleBar, Wordle } from "../../components";
import { KeyState } from "../../constants";
import { createSolution, updateSolution } from "../../reducer/data";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const KeyboardContainer = styled.div`
  margin-top: auto;
`;

const WordleContainer = styled.div`
  flex: 1;
  display: flex;
`;

const sample = {
  attempts: 7,
  wordle: "JHINXED",
  id: "sample",
};

function SolveWordle() {
  const dispatch = useDispatch();

  const [challenge, setChallenge] = useState(sample);
  const [solution, setSolution] = useState([]);
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);

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

    const row = clonedStoredSolution.findIndex((row) => row.length === 0);

    setSolution(JSON.parse(JSON.stringify(storedSolution.solution)));
    setRow(row);
  }, [storedSolution]);

  useEffect(() => {
    if (row === -1) {
      // alert("Done!");
    }
  }, [row]);

  useEffect(() => {
    if (!challenge) {
      return;
    }
    const { attempts, id } = challenge;

    if (!storedSolution) {
      const arr = [];

      for (let i = 0; i < attempts; i++) {
        arr.push([]);
      }

      dispatch(createSolution({ id, solution: arr }));
    }
    //  eslint-disable-next-line
  }, [challenge]);

  function handleOnKeyPress(key) {
    const { wordle } = challenge;

    if (solution[row].length === wordle.length) {
      return;
    }

    const updated = [...solution];
    updated[row].push({ key, state: KeyState.UNVERIFIED });

    setSolution(updated);
    setColumn(column + 1);
  }

  function handleOnSubmit() {
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

    dispatch(updateSolution({ id, solution: updated }));
  }

  function handleOnDelete() {
    if (row === -1 || solution[row].length === 0) {
      return;
    }

    let updated = [...solution];
    updated[row].pop();

    setSolution(updated);
    setColumn(column - 1);
  }

  return (
    <Container>
      <TitleBar title="Got what it takes?" />
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
                onKeyPress={handleOnKeyPress}
                onDelete={handleOnDelete}
                onSubmit={handleOnSubmit}
              />
            </KeyboardContainer>
          </>
        );
      })()}
    </Container>
  );
}

export default SolveWordle;
