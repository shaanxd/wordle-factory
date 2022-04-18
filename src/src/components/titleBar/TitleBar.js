import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  border: 1px solid red;
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Title = styled.div``;

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
