import "../../App.scss";

const ColumnOne = ({ connect, disconnect, active }) => {
  return (
    <>
      <div className={`column-one`}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <img
            src={`assets/images/rainbow-cat.gif`}
            alt={"rainbow-cat"}
            style={{ width: "180px" }}
          />
          <div style={{ fontSize: "40px" }}>
            View and flex your{" "}
            <span style={{ position: "relative" }}>
              NFTs
              <img
                src={"assets/images/nft-scribble.png"}
                style={{ position: "absolute", left: "-65%", zIndex: "-1" }}
              />
            </span>
          </div>
        </div>
        <button className={`button`} onClick={active ? disconnect : connect}>
          {active ? `Disconnect` : `Connect`}
        </button>
        <div className={`wallet-label`}>
          <label style={{ transform: "rotate(-5deg)" }}>
            connect that shiz
            <img
              src={"assets/images/scribble-2.png"}
              style={{ position: "absolute", left: "-25%", zIndex: "-1" }}
            />
          </label>
          <label style={{ transform: "rotate(-5deg)" }}>
            preview that shiz
            <img
              src={"assets/images/scribble-2.png"}
              style={{ position: "absolute", left: "5%", zIndex: "-1" }}
            />
          </label>
          <label style={{ transform: "rotate(5deg)" }}>
            share that shizzzz
            <img
              src={"assets/images/scribble-2.png"}
              style={{ position: "absolute", left: "5%", zIndex: "-1" }}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default ColumnOne;
