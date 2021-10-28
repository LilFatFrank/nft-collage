import "../../App.scss";
import { toPng } from "html-to-image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Error, Loader, Modal } from "../../components";
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
  const [openShare, setOpenShare] = useState(false);

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

  useEffect(() => {
    document
      .getElementById("content-area")
      .addEventListener("scroll", loadMore);
  }, [document.getElementById("content-area")]);

  const loadMore = () => {
    console.log("here");
  };

  return (
    <>
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
          <div className={`content-area`} id="content-area">
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
                          minWidth: "30px",
                          borderRadius: "2px",
                          boxShadow: "0px 2px 2px #F7D046"
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
              <img
                src={"assets/svgs/share-button.svg"}
                className={`connect`}
                onClick={() => setOpenShare(true)}
                style={{ cursor: "pointer" }}
              />
              <img
                src={"assets/svgs/download-button.svg"}
                className={`connect ${downloading ? "rotate" : ""}`}
                onClick={onButtonClick}
                style={{ cursor: "pointer" }}
              />
              {userNFTs?.length && !allReceived ? (
                <span
                  className={`load-more connect`}
                  style={{ cursor: "pointer" }}
                  onClick={() => updatePagination()}
                >
                  <img src={`assets/svgs/tip.svg`} width={100} />
                  <span
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      left: "35%",
                      bottom: "35%"
                    }}
                  >
                    load
                    <br />
                    more
                  </span>
                </span>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      <Modal view={openShare} close={() => setOpenShare(false)} />
    </>
  );
};

export default ColumnTwo;
