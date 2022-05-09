import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import SideBar from "../sideBar/SideBar";

import TitleBar from "../titleBar/TitleBar";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  position: relative;

  background-color: ${({ theme }) => theme.SCREEN.BACKGROUND};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const SideBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 1;

  ${({ open, top }) => css`
    transform: translateX(${open ? 0 : -100}%);
    opacity: ${open ? 1 : 0.5};
    top: ${top}px;
  `}
`;

function ScreenContainer({ children, titleBarParams }) {
  const contentRef = useRef();

  const [top, setTop] = useState(0);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  function handleOnMenuClick() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  useEffect(() => {
    let timeout = null;

    function handleResize() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setTop(contentRef?.current?.getBoundingClientRect().y);
      }, 100);
    }

    setTop(contentRef?.current?.getBoundingClientRect().y);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Container>
      <TitleBar {...titleBarParams} onMenuClick={handleOnMenuClick} />
      <SideBarContainer open={isSideBarOpen} top={top}>
        <SideBar onToggle={handleOnMenuClick} isSideBarOpen={isSideBarOpen} />
      </SideBarContainer>
      <Content ref={contentRef}>{children}</Content>
    </Container>
  );
}

ScreenContainer.defaultProps = {
  titleBarParams: {},
};

export default ScreenContainer;
