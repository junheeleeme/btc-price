import { memo } from "react";
import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

import Logo from "../../components/logo";

// import NetStatus from "../../components/netStatus";

const Header = () => {
  return (
    <>
      <AppBar position="static" sx={{ boxShadow: "none", background: "#fff" }}>
        <Toolbar
          className="header-wrap"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />
          {/* <CurrencyBitcoinIcon
              sx={{
                fontSize: "34px",
                color: "#fff",
                background: "#f7931a",
                borderRadius: "50%",
              }}
            /> */}

          {/* <Typography variant="h6" component="div">
                BTC
              </Typography> */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <NetStatus /> */}
            <IconButton
              title="GitHub Repository"
              href="https://github.com/junheeleeme/chime-bell"
              target="_blank"
              size="small"
              sx={{
                height: "34px",
                padding: "0",
                borderRadius: "50%",
              }}
            >
              <GitHubIcon sx={{ color: "#000", fontSize: "34px" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default memo(Header);
