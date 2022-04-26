import React from "react";
import styled, { css } from "styled-components";
import { withTheme } from "styled-components";
import Hamburger from "hamburger-react";

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => css`
    background-color: ${theme.TITLE_BAR.BACKGROUND};
    border-bottom: 1px solid ${theme.TITLE_BAR.BORDER};
  `}
`;

const Title = styled.div`
  padding-top: 10px;
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
  padding: 0px;
  width: 48px;
  height: 48px;

  ${({ theme, type }) =>
    css`
      color: ${theme.BUTTON.DEFAULT.TEXT};
      margin-${type}: auto;
    `};
`;

function TitleBar({
  title,
  rightIcon,
  onRightIconClick,
  onMenuClick,
  theme,
  isSideBarOpen,
}) {
  return (
    <Container>
      <Button type="right" onClick={onMenuClick}>
        <Hamburger
          toggle={isSideBarOpen}
          onToggle={() => {}}
          size={20}
          color={theme.TITLE_BAR.TEXT}
        />
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
  onMenuClick: () => {},
  isSideBarOpen: false,
};

export default withTheme(TitleBar);
