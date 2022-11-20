import { memo } from "react";
import logo from "../assets/loading.json";
import Lottie, { LottieProps } from "react-lottie-player";
import { Box } from "@mui/material";

// Lottie Option
const defaultOptions: LottieProps = {
  loop: true,
  play: true,
  style: {
    width: "300px",
    height: "300px",
    margin: "0",
  },
};

const Spinner = () => {
  return (
    <>
      <Box className="spinner-wrap" sx={{ display: "flex" }}>
        <Lottie {...defaultOptions} animationData={logo} />
      </Box>
    </>
  );
};

export default memo(Spinner);
