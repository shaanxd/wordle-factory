import { Provider as ReduxProvider, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import { store } from "./src/reducer";
import { getSelectedThemeSelector } from "./src/selectors/ui";
import Theme from "./src/theme";
import { SolveWordle, CreateWordle, NotFound } from "./src/screens";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  flex: 1;
`;

function Root() {
  const theme = useSelector(getSelectedThemeSelector);

  return (
    <ThemeProvider theme={Theme[theme]}>
      <Router>
        <Container>
          <Inner>
            <Routes>
              <Route path="/" index element={<CreateWordle />} />
              <Route path="/wordle/:wordleId" element={<SolveWordle />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Inner>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ReduxProvider store={store}>
      <Root />
    </ReduxProvider>
  );
}

export default App;
