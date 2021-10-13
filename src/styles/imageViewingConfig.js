const imageViewingConfig = (length) => {
  if (length === 1 || length === 2)
    return {
      maxHeight: "400px",
      maxWidth: "400px"
    };
  else if (length > 2 && length <= 6)
    return {
      maxHeight: "210px",
      maxWidth: "210px"
    };
  else if (length > 6 && length <= 10)
    return {
      maxHeight: "140px",
      maxWidth: "140px"
    };
  else if (length > 10 && length <= 18)
    return {
      maxHeight: "120px",
      maxWidth: "120px"
    };
  else if (length > 18 && length <= 30)
    return {
      maxHeight: "90px",
      maxWidth: "90px"
    };
  else if (length > 30 && length <= 50)
    return {
      maxHeight: "70px",
      maxWidth: "70px"
    };
  else if (length > 50 && length <= 80)
    return {
      maxHeight: "55px",
      maxWidth: "55px"
    };
  else if (length > 80 && length <= 100)
    return {
      maxHeight: "48px",
      maxWidth: "48px"
    };
  else if (length > 100 && length <= 150)
    return {
      maxHeight: "35px",
      maxWidth: "35px"
    };
  else
    return {
      maxHeight: "33px",
      maxWidth: "33px"
    };
};

export default imageViewingConfig;
