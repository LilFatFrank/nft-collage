import { dummyData } from "../../data/dummyData";
import "./SolamasAnimation.scss";

export const SolamasAnimation = () => {
  return (
    <div className={`solamas-animation-content`}>
      {dummyData.rowOne.length ? (
        <div className={`rowContainer`}>
          <div
            className={`row ${dummyData.rowThree.length > 4 ? "animate" : ""}`}
          >
            {dummyData.rowOne.map((image, index) => (
              <img
                src={image.src}
                alt={image.alt}
                className={`image`}
                key={`${image.alt} - ${index}`}
              />
            ))}
          </div>
        </div>
      ) : null}
      {dummyData.rowTwo.length ? (
        <div className={`rowContainer`}>
          <div
            className={`row ${dummyData.rowThree.length > 4 ? "reverse" : ""}`}
          >
            {dummyData.rowTwo.map((image, index) => (
              <img
                src={image.src}
                alt={image.alt}
                className={`image`}
                key={`${image.alt} - ${index}`}
              />
            ))}
          </div>
        </div>
      ) : null}
      {dummyData.rowThree.length > 0 ? (
        <div className={`rowContainer`}>
          <div
            className={`row ${dummyData.rowThree.length > 4 ? "animate" : ""}`}
          >
            {dummyData.rowThree.map((image, index) => (
              <img
                src={image.src}
                alt={image.alt}
                className={`image`}
                key={`${image.alt} - ${index}`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SolamasAnimation;
