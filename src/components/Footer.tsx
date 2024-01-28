import { AppBar, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { appBarTheme as theme } from "../themes/AppBarTheme";

const Footer: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: "10vh", position: "relative" }}>
        <AppBar position="static" component="footer" sx={{ bottom: "0", position: "absolute" }}>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Granby EF Bold",
              color: "#e10816"
            }}
          >
            © [2024] Gautham. All rights reserved.
          </Typography>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Footer;