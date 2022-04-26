import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  IoMoonOutline,
  IoPartlySunnyOutline,
  IoLogoGithub,
  IoCodeSlashOutline,
} from "react-icons/io5";
import { AiOutlineIdcard } from "react-icons/ai";
import { RiHomeGearLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { ToggleButton } from "..";
import { getSelectedThemeSelector } from "../../selectors/ui";
import { ThemeType } from "../../theme";
import { switchTheme } from "../../reducer/ui";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  * {
    font-family: Comfortaa;
  }

  ${({ theme }) => css`
    color: ${theme.SIDE_BAR.TEXT};
  `};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  opacity: 0.9;

  ${({ theme }) => css`
    background-color: ${theme.SIDE_BAR.BACKGROUND};
  `};
`;

const Footer = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;

  ${({ theme }) => css`
    color: ${theme.SIDE_BAR.FOOTER.TEXT};
    border-top: 1px solid ${theme.SIDE_BAR.FOOTER.BORDER};
    background-color: ${theme.SIDE_BAR.BACKGROUND};
  `}
`;

const FooterTag = styled.div`
  font-size: 14px;
  display: flex;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.3rem;
  margin-top: 20px;
`;

const StyledLink = styled.div`
  font-size: 15px;
  text-decoration: none;
  margin: 10px 0px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;

  ${({ theme }) => css`
    color: ${theme.SIDE_BAR.TEXT};
  `}
`;

const StyledLabel = styled.span`
  margin-left: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterLabel = styled.div`
  margin-left: 5px;
`;

function SideBar({ onToggle }) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const theme = useSelector(getSelectedThemeSelector);

  function handleOnCreateClick() {
    onToggle();
    navigation("/");
  }

  function handleOnThemeToggle() {
    dispatch(switchTheme());
  }

  function handleOnPortfolioClick() {
    window?.open("https://shahid.ninja");
  }

  function handleOnGithubClick() {
    window?.open("https://github.com/shaanxd");
  }

  return (
    <Container>
      <Content>
        <Title>More on Wordlab</Title>
        <StyledLink onClick={handleOnCreateClick}>
          <RiHomeGearLine size={20} />{" "}
          <StyledLabel>Create Challenge</StyledLabel>
        </StyledLink>
        <Title>Settings</Title>
        <Row>
          <StyledLink onClick={handleOnThemeToggle}>
            {theme === ThemeType.LIGHT ? (
              <IoPartlySunnyOutline size={20} />
            ) : (
              <IoMoonOutline size={20} />
            )}
            <StyledLabel>Dark Mode</StyledLabel>
          </StyledLink>
          <ToggleButton
            checked={theme === ThemeType.DARK}
            onToggle={handleOnThemeToggle}
          />
        </Row>
        <Title>Feedback</Title>
        <Row>
          <StyledLink onClick={handleOnPortfolioClick}>
            <AiOutlineIdcard size={20} />
            <StyledLabel>Developer Portfolio</StyledLabel>
          </StyledLink>
        </Row>
        <Row>
          <StyledLink onClick={handleOnGithubClick}>
            <IoLogoGithub size={20} />
            <StyledLabel>GitHub</StyledLabel>
          </StyledLink>
        </Row>
      </Content>
      <Footer>
        <FooterTag>
          <FooterLabel>v{process.env.REACT_APP_VERSION}</FooterLabel>
        </FooterTag>
        <FooterTag>
          <IoCodeSlashOutline size={20} />
          <FooterLabel>By Shahid Hassan</FooterLabel>
        </FooterTag>
      </Footer>
    </Container>
  );
}

export default SideBar;
