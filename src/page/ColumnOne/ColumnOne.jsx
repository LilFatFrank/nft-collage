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
            gap: "0px"
          }}
        >
          <img
            src={`assets/images/rainbow-cat.gif`}
            alt={"rainbow-cat"}
            style={{ width: "150px" }}
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
        <img
          src={"assets/svgs/connect-button.svg"}
          style={{ cursor: "pointer" }}
          className={`connect`}
          onClick={active ? disconnect : connect}
        />
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
