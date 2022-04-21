import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

const Container = styled.div`
  padding: 10px;
  padding-top: 15px;
  display: flex;

  ${({ theme }) => css`
    background-color: ${theme.TITLE_BAR.BACKGROUND};
    border-bottom: 1px solid ${theme.TITLE_BAR.BORDER};
  `}
`;

const Title = styled.div`
  font-weight: 600;
  margin: auto;
  font-size: 2rem;
  font-family: Comfortaa;
  color: ${({ theme }) => theme.TITLE_BAR.TEXT};
`;

function TitleBar({ title }) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

TitleBar.defaultProps = {
  title: "",
};

export default TitleBar;
