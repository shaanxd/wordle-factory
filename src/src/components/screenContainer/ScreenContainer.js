import React, { useState } from "react";
import styled, { css } from "styled-components";
import SideBar from "../sideBar/SideBar";

import TitleBar from "../titleBar/TitleBar";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.SCREEN.BACKGROUND};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SideBarContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 1;

  ${({ open }) => css`
    transform: translateX(${open ? 0 : -100}%);
    opacity: ${open ? 1 : 0.5};
  `}
`;

function ScreenContainer({ children, titleBarParams }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  function handleOnMenuClick() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <Container>
      <TitleBar {...titleBarParams} onMenuClick={handleOnMenuClick} />
      <Content>
        <SideBarContainer open={isSideBarOpen}>
          <SideBar onToggle={handleOnMenuClick} isSideBarOpen={isSideBarOpen} />
        </SideBarContainer>
        {children}
      </Content>
    </Container>
  );
}

ScreenContainer.defaultProps = {
  titleBarParams: {},
};

export default ScreenContainer;
