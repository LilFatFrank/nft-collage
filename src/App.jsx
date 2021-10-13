import { Web3ReactProvider } from "@web3-react/core";
import { isMobile, isTablet } from "react-device-detect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Web3 from "web3";
import page from "./page/page";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  return isMobile || isTablet ? (
    <div className={`mobile`}>
      <img
        src={`assets/images/rainbow-cat.gif`}
        alt={"rainbow-cat"}
        style={{ width: "180px" }}
      />
      <div style={{ fontSize: isTablet ? "40px" : "32px" }}>
        Please use a desktop/laptop to view the NFTs. 💻
      </div>
    </div>
  ) : (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <Switch>
          <Route exact path={"/"} component={page} />
          <Route exact path={"/:address"} component={page} />
        </Switch>
      </Router>
    </Web3ReactProvider>
  );
}

export default App;
