import { BrowserRouter as Router } from "react-router-dom";

import styled from "styled-components";

import { Pages } from "./Pages";
import { Navbar } from "./Navbar";

const MainContent = styled("div")`
  display: flex;
`;

function App() {
  return (
    <Router>
      <MainContent>
        <Navbar />
        <Pages/>
      </MainContent>
    </Router>
  );
}

export default App;
