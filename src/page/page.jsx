import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import "../App.scss";
import { Modal, Style } from "../components";
import { injectors } from "../wallet/connectors";
import ColumnOne from "./ColumnOne/ColumnOne";
import ColumnTwo from "./ColumnTwo/ColumnTwo";

const Page = (props) => {
  const { active, account, activate, deactivate, chainId } = useWeb3React();

  const [userNFTs, setUserNFTs] = useState([]);
  const [allReceived, setAllReceived] = useState(false);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 50
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [address, setAddress] = useState(undefined);
  const [showWrongNetworkModal, setShowWrongNetworkModal] = useState(false);

  useEffect(async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      if (window.ethereum.chainId !== "0x1") setShowWrongNetworkModal(true);
      window.ethereum.on("chainChanged", (chain) => {
        setShowWrongNetworkModal(chain !== "0x1");
        connect();
      });
    }
  }, []);

  useEffect(() => {
    if (props.match.params.address) setAddress(props.match.params.address);
  }, [props]);

  useEffect(() => {
    if (address) getNFTs(pagination);
  }, [address]);

  useEffect(() => {
    if (active) {
      getNFTs(pagination);
      window.history.replaceState(null, "", `/${account}`);
    } else {
      window.history.replaceState(null, "", `/`);
    }
  }, [active]);

  useEffect(() => {
    if (
      userNFTs &&
      userNFTs?.length &&
      !allReceived &&
      userNFTs?.length < 250
    ) {
      updatePagination();
    }
  }, [userNFTs]);

  useEffect(() => {
    if (active || address) getNFTs(pagination);
  }, [pagination]);

  useEffect(() => {
    if (chainId !== 1) setUserNFTs([]);
  }, [chainId]);

  const getNFTs = async (params) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.opensea.io/api/v1/assets?owner=${
          account || address
        }&offset=${params["offset"]}&limit=${params["limit"]}`,
        {
          headers: {
            Accept: "application/json",
            "X-API-KEY": process.env.REACT_APP_API_KEY
          }
        }
      );
      const data = await response.json();
      if (data) {
        if (data?.assets?.length === 0 || data?.assets?.length < 50)
          setAllReceived(true);
        setUserNFTs([...userNFTs, ...data?.assets]);
        setLoading(false);
        setError(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setUserNFTs([]);
      setError(true);
    }
  };

  const updatePagination = () => {
    setPagination({
      ...pagination,
      offset: pagination["offset"] + pagination["limit"]
    });
  };

  async function connect() {
    try {
      if (!active) {
        setUserNFTs([]);
        setAddress("");
        setPagination({
          offset: 0,
          limit: 50
        });
      }
      await activate(injectors);
    } catch (e) {
      console.log(e);
    }
  }

  async function disconnect() {
    try {
      deactivate(injectors);
      setUserNFTs([]);
    } catch (e) {
      console.log(e);
    }
  }

  const changeNetwork = async () => {
    if (window.ethereum.networkVersion !== "1") {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }]
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Ethereum Mainnet",
                chainId: "0x1",
                nativeCurrency: {
                  name: "ETH",
                  decimals: 18,
                  symbol: "ETH"
                },
                rpcUrls: ["https://mainnet.infura.io/v3/"]
              }
            ]
          });
        }
      }
    }
  };

  return (
    <>
      <div className={`app`}>
        <img
          src={"assets/images/app-background.png"}
          alt={"app-background"}
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
            zIndex: -2
          }}
        />
        <Style />
        <ColumnOne
          active={active ? true : false}
          connect={connect}
          disconnect={disconnect}
        />
        <ColumnTwo
          active={active || address ? true : false}
          account={account || address}
          userNFTs={userNFTs}
          allReceived={allReceived}
          updatePagination={updatePagination}
          loading={loading}
          error={error}
        />
      </div>
      <Modal
        type={"switch"}
        close={() => setShowWrongNetworkModal(false)}
        view={showWrongNetworkModal}
        switchNetwork={changeNetwork}
      />
    </>
  );
};

export default withRouter(Page);
