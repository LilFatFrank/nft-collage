import "../../App.scss";
import { NftGallery } from "react-nft-gallery";
import { toPng } from "html-to-image";
import { useCallback, useRef } from "react";

const ColumnTwo = ({ active, account, userNFTs }) => {
  const ref = useRef();

  const onButtonClick = useCallback(() => {
    const downloadArea = document.getElementById("download-area");
    const button = downloadArea.getElementsByTagName("button");
    if (button[0]) button[0].style.display = "none";

    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-nfts.png";
        link.href = dataUrl;
        link.click();
        if (button[0]) button[0].style.display = "none";
      })
      .catch((err) => {
        console.log(err);
        if (button[0]) button[0].style.display = "none";
      });
  }, [ref]);

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
          <div className={`content`}>
            {active ? (
              <NftGallery
                ownerAddress={account}
                showcaseMode
                showcaseItemIds={userNFTs?.result?.map(
                  (nft) => `${nft.token_address}/${nft.token_id}`
                )}
                metadataIsVisible={false}
                galleryContainerStyle={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  padding: "10px"
                }}
                itemContainerStyle={{
                  minWidth: "40px",
                  minHeight: "40px",
                  maxWidth: "80px",
                  maxHeight: "80px"
                }}
                imgContainerStyle={{
                  width: "100%",
                  height: "100%"
                }}
                isInline
                hasExternalLinks={false}
              />
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
        </div>
        <div id={"button-area"}>
          {active ? (
            <button
              className={`button`}
              style={{ borderRadius: "50%", padding: "10px 15px" }}
              onClick={onButtonClick}
            >
              <img src={"assets/svgs/download-icon.svg"} alt={"Download"} />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ColumnTwo;
