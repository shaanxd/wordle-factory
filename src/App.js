import { Provider as ReduxProvider, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";

import { store } from "./src/reducer";
import { getSelectedThemeSelector } from "./src/selectors/ui";
import Theme, { ThemeType } from "./src/theme";
import { SolveWordle, CreateWordle, NotFound } from "./src/screens";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${({ theme }) => theme.BACKDROP.BACKGROUND};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
`;

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background-color: ${({ theme }) => theme.GLOBAL.BACKGROUND};
  }
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
          <ToastContainer
            limit={2}
            position="bottom-right"
            theme={theme === ThemeType.DARK ? "dark" : "light"}
            hideProgressBar
          />
        </Container>
        <GlobalStyles />
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
