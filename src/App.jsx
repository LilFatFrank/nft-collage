import { Web3ReactProvider } from "@web3-react/core";
import { MoralisProvider } from "react-moralis";
import Web3 from "web3";

function getLibrary(provider) {
  return new Web3(provider);
}

function App({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MoralisProvider
        appId={"2FLfk117GEPsjdB7umPdXQIWXwUXhHlxoHodAd4F"}
        serverUrl={"https://b8kyorghcbba.moralishost.com:2053/server"}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </Web3ReactProvider>
  );
}

export default App;
