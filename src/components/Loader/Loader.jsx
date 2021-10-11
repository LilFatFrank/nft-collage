import "./Loader.scss";

const Loader = ({ noPadding }) => {
  return (
    <div
      className={`container`}
      {...(noPadding ? { style: { padding: "0px" } } : undefined)}
    >
      <div className={`loader`} />
    </div>
  );
};

export default Loader;
