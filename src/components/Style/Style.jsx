import { useState } from "react";
import "./Style.scss";

const Style = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadStyling = () => {
    const comp = [];
    for (let i = 1; i < 10; i++) {
      comp.push(
        <div className={`component-${i}`}>
          <img src={`assets/svgs/component-${i}.svg`} />
        </div>
      );
    }

    return comp;
  };

  return (
    <>
      {loadStyling()}
      <div
        className={`tip connect`}
        onClick={() => setShowAddress(!showAddress)}
      >
        {!showAddress ? (
          <span
            style={{
              position: "absolute",
              top: "15%",
              left: "35%"
            }}
          >
            <img
              src={`assets/images/tip-coin.gif`}
              alt={"tip-coin"}
              width={30}
              height={30}
            />
          </span>
        ) : (
          <img
            src={`assets/svgs/close.svg`}
            style={{
              position: "absolute",
              top: "20%",
              left: "35%"
            }}
          />
        )}
        <img src={`assets/svgs/tip.svg`} />
      </div>
      {showAddress ? (
        <div className={`eth-address`}>
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px"
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <img src={`assets/svgs/heart.svg`} width={24} />
              <span style={{ fontSize: "24px" }}>Send ETH to</span>
              <img src={`assets/svgs/heart.svg`} width={24} />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span
                style={{
                  fontSize: "24px",
                  color: "#8EA7FF",
                  fontWeight: "600",
                  fontFamily: "cursive"
                }}
              >
                0x01...6e2d
              </span>
              {!copied ? (
                <img
                  src={`assets/svgs/copy.svg`}
                  width={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "0x0116e61859Dec75c468a6921A9fe538f1ED86e2d"
                    );
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1000);
                  }}
                />
              ) : (
                <img src={`assets/svgs/circle.svg`} width={24} />
              )}
            </div>
          </div>
        </div>
      ) : null}
      <div className={``}></div>
      <div
        className={`contact`}
        onMouseEnter={() => setShowContact(true)}
        onMouseLeave={() => setShowContact(false)}
      >
        <label style={{ fontSize: "18px" }}>
          Do Not Contact
          <img
            src={"assets/images/tv.png"}
            style={{ position: "relative", top: "6px", left: "2px" }}
          />
        </label>
        {showContact ? (
          <div className={`twitter`}>
            <a
              href="https://twitter.com/BonoQuak"
              target="_blank"
              rel="noreferrer"
            >
              @bonoquak
              <img src={"assets/images/scribble-3.png"} />
            </a>
            <a
              href="https://twitter.com/LilFatFrank"
              target="_blank"
              rel="noreferrer"
            >
              @lilfatfrank
              <img src={"assets/images/scribble-3.png"} />
            </a>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Style;
