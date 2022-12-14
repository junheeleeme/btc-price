import React, { memo, useState } from "react";
import logo from "../assets/logo.json";
import Lottie, { LottieProps } from "react-lottie-player";
import { Box } from "@mui/material";

// Lottie Option
const defaultOptions: LottieProps = {
  loop: true,
  play: true,
  style: {
    width: "60px",
    height: "60px",
    margin: "0",
  },
};

const Logo = () => {
  const [speed, setSpeed] = useState(1);
  const mouseEnter = () => setSpeed(3);
  const mouseLeave = () => setSpeed(1);

  return (
    <Box
      sx={{ display: "flex" }}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <Lottie {...defaultOptions} animationData={logo} speed={speed} />
    </Box>
  );
};

export default memo(Logo);
