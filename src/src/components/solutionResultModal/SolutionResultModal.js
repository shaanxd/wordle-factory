import React, { useMemo } from "react";
import { Modal } from "react-bootstrap";
import { IoShareSocialOutline, IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import styled from "styled-components";
import { withTheme } from "styled-components";
import { css } from "styled-components";
import { KeyState, KeyStateEmotes, SolvedState } from "../../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;

  ${({ theme }) => css`
    background-color: ${theme.MODAL.BACKGROUND};
    color: ${theme.MODAL.TEXT};
  `};
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Button = styled.button`
  flex: 1;
  margin-top: 20px;
  padding: 15px;
  border: none;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  display: flex;

  ${({ theme, alternate }) => css`
    color: ${alternate ? theme.BUTTON.SUCCESS.TEXT : theme.BUTTON.DEFAULT.TEXT};
    background-color: ${alternate
      ? theme.BUTTON.SUCCESS.BACKGROUND
      : theme.BUTTON.DEFAULT.BACKGROUND};
  `};
`;

const Separator = styled.div`
  width: 15px;
`;

const ButtonLabel = styled.label`
  margin-right: 10px;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const ChartRow = styled.div`
  margin: 5px 0px;
  display: flex;
`;

const ChartItem = styled.div`
  text-align: center;
  transition: all 1s ease-in-out;

  ${({ count, status, theme }) =>
    css`
      flex: ${count};
      background-color: ${theme.CHART.BACKGROUND[status]};
      color: ${theme.CHART.TEXT};
    `};
`;

const ChartItemList = styled.div`
  flex: 1;
  display: flex;
  border-radius: 5px;
  overflow: hidden;
`;

const ChartLabel = styled.div`
  width: 100px;
  padding: 0px 5px;
`;

const Title = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 12px;
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitle = styled(Title)`
  font-size: 1.2rem;
`;

function SolutionResultModal({ show, solution, theme, status, onClose }) {
  function handleOnClose() {
    onClose();
  }

  function handleOnShareClick() {
    const total = solution.length;
    let tried = solution.findIndex((row, idx) => row.length === 0);

    if (tried === -1) {
      tried = solution.length;
    }

    let result = `Challenge ${tried}/${total}\n\n`;

    result = result += solution
      .filter((row) => row.length !== 0)
      .map((row) => row.map(({ status }) => KeyStateEmotes[status]).join(""))
      .join("\n");

    result += `\n\nWanna give it a go? Visit ${window.location.href}`;

    navigator.clipboard.writeText(result);

    toast("Copied to clipboard.");
  }

  const chart = useMemo(() => {
    const obj = {
      [KeyState.ABSENT]: 0,
      [KeyState.MISPLACED]: 0,
      [KeyState.PLACED]: 0,
    };

    return solution
      .filter((row) => row.length !== 0)
      .map((row) => {
        const rowObj = {
          ...obj,
        };
        row.forEach(({ status }) => (rowObj[status] += 1));
        return rowObj;
      });
  }, [solution]);

  const isSuccessful = status === SolvedState.COMPLETED_SUCCESSFULLY;

  return (
    <Modal show={show} backdrop="static" centered>
      <Container>
        <Title>{isSuccessful ? "Nice work!" : "Oops!"}</Title>
        <Description>
          {isSuccessful
            ? "Nice work!. You can find a breakdown of your attempts below. You can also share your result by clicking the share button."
            : "Looks like you didn't manage to solve this challenge. Better luck next time!"}
        </Description>
        <Subtitle>Guess Distribution</Subtitle>
        <ChartContainer>
          {chart.map((stats, idx) => (
            <ChartRow key={idx}>
              <ChartLabel>Attempt {idx + 1}</ChartLabel>
              <ChartItemList>
                {Object.entries(stats)
                  .filter(([key, value]) => value)
                  .map(([key, value]) => (
                    <ChartItem count={value} status={key}>
                      {value}
                    </ChartItem>
                  ))}
              </ChartItemList>
            </ChartRow>
          ))}
        </ChartContainer>
        <ButtonContainer>
          <Button onClick={handleOnShareClick}>
            <ButtonLabel>Share</ButtonLabel>
            <IoShareSocialOutline color={theme.BUTTON.SUCCESS.TEXT} />
          </Button>
          <Separator />
          <Button alternate onClick={handleOnClose}>
            <ButtonLabel>Close</ButtonLabel>
            <IoClose color={theme.BUTTON.SUCCESS.TEXT} />
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

SolutionResultModal.defaultProps = {
  status: SolvedState.COMPLETED_UNSUCCESSFULLY,
  onClose: () => {},
};

export default withTheme(SolutionResultModal);
