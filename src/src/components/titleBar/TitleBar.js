import React from "react";
import styled, { css } from "styled-components";
import { IoMenuOutline } from "react-icons/io5";

const Container = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

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

const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 12px;

  ${({ theme, type }) =>
    css`
      color: ${theme.BUTTON.DEFAULT.TEXT};
      margin-${type}: auto;
    `};
`;

function TitleBar({ title, rightIcon, onRightIconClick }) {
  return (
    <Container>
      <Button type="right">
        <IoMenuOutline size={25} />
      </Button>
      <Title>{title}</Title>
      <Button type="left" onClick={onRightIconClick}>
        {rightIcon}
      </Button>
    </Container>
  );
}

TitleBar.defaultProps = {
  title: "",
  rightIcon: null,
  onRightIconClick: () => {},
};

export default TitleBar;
