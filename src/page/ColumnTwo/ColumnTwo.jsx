import "../../App.scss";
import { toPng } from "html-to-image";
import { useCallback, useRef, useState } from "react";
import { Error, Loader } from "../../components";
import imageViewingConfig from "../../styles/imageViewingConfig";

const ColumnTwo = ({
  active,
  account,
  userNFTs,
  allReceived,
  updatePagination,
  loading,
  error
}) => {
  const ref = useRef();
  const [downloading, setDownloading] = useState(false);
  const [hide, setHide] = useState(true);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    setDownloading(true);
    const content = document.getElementsByClassName("content")[0];
    content.style.overflow = "hidden";
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-nfts.png";
        link.href = dataUrl;
        link.click();
        setDownloading(false);
        content.style.overflow = "visible";
      })
      .catch((err) => {
        console.log(err);
        setDownloading(false);
      });
  }, [ref]);

  return (
    <>
      <div className={`success-note ${hide ? "hide" : ""}`}>
        <div
          style={{
            padding: "20px",
            border: "1px solid #adfeff",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <img
            src={"assets/svgs/circle.svg"}
            alt={"Success"}
            style={{ width: "24px" }}
          />
          Link Copied!
        </div>
      </div>
      <div className={`column-two`}>
        <div id="download-area" ref={ref}>
          <div className={`header`}>
            <div className={`header-label`}>
              <div className={`cat-image`}>
                <img src={`assets/images/header-cat.png`} alt={"header-cat"} />
              </div>
              <div style={{ fontSize: "24px" }}>
                {active
                  ? `${account.slice(0, 4)}...${account.slice(
                      account.length - 4,
                      account.length
                    )}'s NFT COLLECTION`
                  : "YOUR NFT COLLECTION"}
              </div>
            </div>
            <div className={`site-name`}>mynfts.show</div>
          </div>
          <div className={`content-area`}>
            <div className={`content`}>
              {active && !error ? (
                userNFTs?.length ? (
                  <>
                    {userNFTs?.map((nft) => (
                      <img
                        src={`${
                          nft.image_url ||
                          nft.image_preview_url ||
                          nft.image_thumbnail_url ||
                          "assets/images/Question.png"
                        }`}
                        style={{
                          ...imageViewingConfig(userNFTs.length),
                          minHeight: "30px",
                          minWidth: "30px"
                        }}
                        key={`${nft.id} - ${nft.name}`}
                      />
                    ))}
                  </>
                ) : (
                  <Error message={"No NFTs found."} />
                )
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  Connect your wallet
                </div>
              )}
            </div>
            {loading ? <Loader /> : null}
            {active && error ? <Error /> : null}
          </div>
        </div>
        <div id={"button-area"}>
          {active && userNFTs?.length ? (
            <>
              <button
                className={`button`}
                style={{
                  borderRadius: "50%",
                  padding: "15px 15px 4px",
                  position: "relative",
                  bottom: "10px"
                }}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setHide(false);
                  setTimeout(() => setHide(true), 2000);
                }}
              >
                <img src={"assets/svgs/share.svg"} alt={"Share"} />
              </button>
              <button
                className={`button`}
                style={{
                  borderRadius: "50%",
                  padding: "10px 15px",
                  position: "relative",
                  bottom: "10px"
                }}
                onClick={onButtonClick}
              >
                <img
                  src={"assets/svgs/download-icon.svg"}
                  alt={"Download"}
                  {...(downloading ? { className: `rotate` } : undefined)}
                />
              </button>
              {userNFTs?.length && !allReceived ? (
                <button
                  className={`button load-more`}
                  onClick={() => updatePagination()}
                >
                  Load more
                </button>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ColumnTwo;
