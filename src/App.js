import classes from "./App.module.scss";
import { dummyData } from "./data/dummyData";

const App = () => {
  return (
    <div className={`${classes.app}`}>
      <div className={`${classes.gridOne}`}>
        <img src={`assets/images/rainbow-cat.gif`} alt={"rainbow-cat"} />
        <h1 style={{ fontSize: "40px" }}>Flex and shill your NFTs</h1>
        <button className={`${classes.button}`}>Connect Wallet</button>
      </div>
      <div className={`${classes.gridTwo}`}>
        <div className={`${classes.header}`}>
          <div className={`${classes.headerLabel}`}>
            <div className={`${classes.catImage}`}>
              <img src={`assets/images/header-cat.png`} alt={"header-cat"} />
            </div>
            <div style={{ fontSize: "24px" }}>YOUR NFT COLLECTION</div>
          </div>
          <div className={`${classes.siteName}`}>mynfts.show</div>
        </div>
        <div className={`${classes.content}`}>
          {dummyData.rowOne.length ? (
            <div className={`${classes.rowContainer}`}>
              <div
                className={`${classes.row} ${
                  dummyData.rowOne.length > 4 ? classes.animate : ""
                }`}
              >
                {dummyData.rowOne.map((image, index) => (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`${classes.image}`}
                    key={`${image.alt} - ${index}`}
                  />
                ))}
              </div>
            </div>
          ) : null}
          {dummyData.rowTwo.length ? (
            <div className={`${classes.rowContainer}`}>
              <div
                className={`${classes.row} ${
                  dummyData.rowTwo.length > 4 ? classes.reverse : ""
                }`}
              >
                {dummyData.rowTwo.map((image, index) => (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`${classes.image}`}
                    key={`${image.alt} - ${index}`}
                  />
                ))}
              </div>
            </div>
          ) : null}
          {dummyData.rowThree.length > 0 ? (
            <div className={`${classes.rowContainer}`}>
              <div
                className={` ${classes.row} ${
                  dummyData.rowThree.length > 4 ? classes.animate : ""
                }`}
              >
                {dummyData.rowThree.map((image, index) => (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`${classes.image}`}
                    key={`${image.alt} - ${index}`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
