import "./Style.scss";

const Style = () => {
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
      <div className={`contact`}>
        <label style={{ fontSize: "18px" }}>
          Contact
          <img
            src={"assets/images/tv.png"}
            style={{ position: "relative", top: "6px", left: "2px" }}
          />
        </label>
        <div className={`twitter`}>
          <label>
            @bonoquak
            <img src={"assets/images/scribble-3.png"} />
          </label>
          <label>
            @lilfatfrank
            <img src={"assets/images/scribble-3.png"} />
          </label>
        </div>
      </div>
    </>
  );
};

export default Style;
