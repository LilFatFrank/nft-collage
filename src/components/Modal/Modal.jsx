import { useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton
} from "react-share";
import "./Modal.scss";

const Modal = ({ close, view, type, switchNetwork }) => {
  const url = window.location.href;
  const [copySuccess, setCopySuccess] = useState(false);

  return view ? (
    <div className={`modal`}>
      <div className={`modal-content`}>
        {type === "switch" ? (
          <>
            <div style={{ fontSize: "24px", marginBottom: "10px" }}>
              Wrong Network. Please switch to Ethereum.
            </div>
          </>
        ) : (
          <>
            <div className={`share-icons`}>
              <TwitterShareButton
                url={url}
                hashtags={[`mynfts`, `collage`, `awesome`]}
              >
                <TwitterIcon />
              </TwitterShareButton>
              <FacebookShareButton
                url={url}
                quote={`Hey, check out this collage of my nfts on mynfts.show.`}
              >
                <FacebookIcon />
              </FacebookShareButton>
              {!copySuccess ? (
                <img
                  src={`assets/svgs/copy.svg`}
                  alt={`copy`}
                  width={64}
                  height={64}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 1000);
                  }}
                />
              ) : (
                <img
                  src={"assets/svgs/circle.svg"}
                  alt={"Success"}
                  width={64}
                  height={64}
                />
              )}
            </div>
          </>
        )}
        <div
          className={`share-icons`}
          style={{
            justifyContent: type === "switch" ? "space-between" : undefined
          }}
        >
          {type === "switch" ? (
            <img
              src="assets/svgs/switch-network.svg"
              style={{ cursor: "pointer" }}
              className={"connect"}
              onClick={switchNetwork}
              width={150}
            />
          ) : null}
          <img
            src={"assets/svgs/close-button.svg"}
            style={{ cursor: "pointer" }}
            className={`connect`}
            onClick={close}
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
