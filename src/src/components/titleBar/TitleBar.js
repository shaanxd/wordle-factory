import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 30px 10px;
  display: flex;
  font-size: 1.5rem;
`;

const Title = styled.div`
  margin: auto;
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
