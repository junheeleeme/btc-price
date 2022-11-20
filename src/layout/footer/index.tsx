import { memo } from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  const date = new Date();

  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "30px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontSize: "15px", color: "#474E68", textAlign: "right" }}
      >
        <Link
          href="https://juni-official.tistory.com/"
          underline="hover"
          target="_blank"
          sx={{ color: "#393E46" }}
          mr={1}
        >
          {date.getFullYear()}. 꾸생의 DevLog All rights reserved.
        </Link>
      </Typography>
    </Box>
  );
};

export default memo(Footer);
