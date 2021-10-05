import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import "../App.scss";
import { injectors } from "../wallet/connectors";
import ColumnOne from "./ColumnOne/ColumnOne";
import ColumnTwo from "./ColumnTwo/ColumnTwo";

const Home = () => {
  const { active, account, activate, deactivate } = useWeb3React();
  const { Moralis } = useMoralis();

  const [userNFTs, setUserNFTs] = useState(null);

  useEffect(() => {
    if (active) getNFTs();
  }, [active]);

  const getNFTs = async () => {
    try {
      const data = await Moralis.Web3API.account.getNFTs({
        chain: "eth",
        address: account
      });
      setUserNFTs(data);
    } catch (e) {
      console.log(e);
    }
  };

  async function connect() {
    try {
      await activate(injectors);
    } catch (e) {
      console.log(e);
    }
  }

  async function disconnect() {
    try {
      await deactivate(injectors);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={`app`}>
      <ColumnOne active={active} connect={connect} disconnect={disconnect} />
      <ColumnTwo active={active} account={account} userNFTs={userNFTs} />
    </div>
  );
};

export default Home;
