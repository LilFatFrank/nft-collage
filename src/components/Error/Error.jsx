const Error = ({ message }) => {
  return (
    <div
      style={{
        fontSize: "16px",
        padding: "10px"
      }}
    >
      {message || "Uh oh! Something went wrong."}
    </div>
  );
};

export default Error;
