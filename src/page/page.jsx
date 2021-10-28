import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import "../App.scss";
import { Style } from "../components";
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
        }&order_direction=desc&offset=${params["offset"]}&limit=${
          params["limit"]
        }`
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
      await deactivate(injectors);
      setUserNFTs([]);
    } catch (e) {
      console.log(e);
    }
  }

  return active && chainId !== 1 ? null : (
    <div className={`app`}>
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
  );
};

export default withRouter(Page);
