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
        <label style={{ fontSize: "18px" }}>Contact</label>
        <div className={`twitter`}>
          <label>@bonoquak</label>
          <label>@lilfatfrank</label>
        </div>
      </div>
    </>
  );
};

export default Style;
