const imageViewingConfig = (length) => {
  if (length === 1 || length === 2)
    return {
      maxHeight: "400px",
      maxWidth: "400px"
    };
  else if (length > 2 && length <= 6)
    return {
      maxHeight: "240px",
      maxWidth: "240px"
    };
  else if (length > 6 && length <= 10)
    return {
      maxHeight: "150px",
      maxWidth: "150px"
    };
  else if (length > 10 && length <= 18)
    return {
      maxHeight: "120px",
      maxWidth: "120px"
    };
  else if (length > 18 && length <= 30)
    return {
      maxHeight: "100px",
      maxWidth: "100px"
    };
  else if (length > 30 && length <= 50)
    return {
      maxHeight: "80px",
      maxWidth: "80px"
    };
  else if (length < 50 && length <= 80)
    return {
      maxHeight: "60px",
      maxWidth: "60px"
    };
  else if (length > 80 && length <= 100)
    return {
      maxHeight: "55px",
      maxWidth: "55px"
    };
  else
    return {
      maxHeight: "40px",
      maxWidth: "40px"
    };
};

export default imageViewingConfig;
