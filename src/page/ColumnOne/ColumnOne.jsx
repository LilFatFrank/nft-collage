import "../../App.scss";

const ColumnOne = ({ connect, disconnect, active }) => {
  return (
    <>
      <div className={`column-one`}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <img
            src={`assets/images/rainbow-cat.gif`}
            alt={"rainbow-cat"}
            style={{ width: "180px" }}
          />
          <div style={{ fontSize: "40px" }}>
            View and flex your NFTs
          </div>
        </div>
        <button className={`button`} onClick={active ? disconnect : connect}>
          {active ? `Disconnect ` : `Connect `}Wallet
        </button>
      </div>
    </>
  );
};

export default ColumnOne;
