import React, { useCallback, useEffect, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";
import { css } from "styled-components";
import { withTheme } from "styled-components";

import {
  Keyboard,
  ScreenContainer,
  SolutionResultModal,
  Wordle,
} from "../../components";
import { KeyMappings, KeyState, SolvedState } from "../../constants";
import { getWordle } from "../../firebase/wordle";
import { createSolution, updateSolution } from "../../reducer/data";
import { getDecryptedWord } from "../../utils/encryption";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => css`
    background: ${theme.LOADER.BACKGROUND};
    color: ${theme.LOADER.TEXT};
  `}
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

const OverlayError = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 1.1rem;
  text-align: center;
`;

const Retry = styled.button`
  margin-top: 20px;
  padding: 15px;
  border: none;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;

  ${({ theme }) => css`
    color: ${theme.BUTTON.DEFAULT.TEXT};
    background-color: ${theme.BUTTON.DEFAULT.BACKGROUND};
  `};
`;

function SolveWordle({ theme }) {
  const dispatch = useDispatch();
  const { wordleId } = useParams();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState([]);
  const [row, setRow] = useState(0);
  const [keyboardStatusMap, setKeyboardStatusMap] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const storedSolution = useSelector(
    (state) => state.data.wordles[challenge?.id]
  );

  async function fetchChallenge() {
    if (!wordleId) {
      return;
    }
    try {
      setLoading(true);

      const { wordle, ...rest } = await getWordle(wordleId);

      const decryptedWord = getDecryptedWord(wordle);

      setChallenge({
        ...rest,
        wordle: decryptedWord,
      });
    } catch (error) {
      console.log("[X]", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchChallenge();
    //  eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!storedSolution) {
      return;
    }

    const clonedStoredSolution = JSON.parse(
      JSON.stringify(storedSolution.solution)
    );

    const isChallengeSolved =
      storedSolution.status === SolvedState.COMPLETED_SUCCESSFULLY ||
      storedSolution.status === SolvedState.COMPLETED_UNSUCCESSFULLY;

    const row = isChallengeSolved
      ? -1
      : clonedStoredSolution.findIndex((row) => row.length === 0);

    setSolution(JSON.parse(JSON.stringify(storedSolution.solution)));
    setModalVisible(isChallengeSolved);
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
          ? SolvedState.COMPLETED_SUCCESSFULLY
          : row === updated.length - 1
          ? SolvedState.COMPLETED_UNSUCCESSFULLY
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

  function handleOnModalClose() {
    setModalVisible(false);
  }

  function handleOnModalClick() {
    setModalVisible(true);
  }

  const isChallengeSolved =
    storedSolution?.status === SolvedState.COMPLETED_SUCCESSFULLY ||
    storedSolution?.status === SolvedState.COMPLETED_UNSUCCESSFULLY;

  return (
    <ScreenContainer
      titleBarParams={{
        title: "Wordlab",
        rightIcon: isChallengeSolved && (
          <FiBarChart2 size={25} color={theme.TITLE_BAR.TEXT} />
        ),
        onRightIconClick: isChallengeSolved && handleOnModalClick,
      }}
    >
      <ContentContainer>
        {(() => {
          if (loading) {
            //  Replace with loading screen
            return (
              <Overlay>
                <SyncLoader size={20} color={theme.LOADER.SPINNER} />
              </Overlay>
            );
          }

          if (!challenge) {
            return (
              <Overlay>
                <OverlayError>
                  Error occurred while retrieving data.
                  <Retry onClick={fetchChallenge}>Retry</Retry>
                </OverlayError>
              </Overlay>
            );
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
      <SolutionResultModal
        show={isChallengeSolved && isModalVisible}
        solution={solution}
        status={storedSolution?.status}
        onClose={handleOnModalClose}
      />
    </ScreenContainer>
  );
}

export default withTheme(SolveWordle);
