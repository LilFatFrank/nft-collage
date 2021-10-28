const imageViewingConfig = (length) => {
  if (length === 1 || length === 2)
    return {
      maxHeight: "300px",
      maxWidth: "300px"
    };
  else if (length > 2 && length <= 6)
    return {
      maxHeight: "200px",
      maxWidth: "200px"
    };
  else if (length > 6 && length <= 10)
    return {
      maxHeight: "135px",
      maxWidth: "135px"
    };
  else if (length > 10 && length <= 18)
    return {
      maxHeight: "100px",
      maxWidth: "100px"
    };
  else if (length > 18 && length <= 30)
    return {
      maxHeight: "80px",
      maxWidth: "80px"
    };
  else if (length > 30 && length <= 50)
    return {
      maxHeight: "60px",
      maxWidth: "60px"
    };
  else if (length > 50 && length <= 80)
    return {
      maxHeight: "50px",
      maxWidth: "50px"
    };
  else if (length > 80 && length <= 100)
    return {
      maxHeight: "40px",
      maxWidth: "40px"
    };
  else
    return {
      maxHeight: "31.5px",
      maxWidth: "31.5px"
    };
};

export default imageViewingConfig;
