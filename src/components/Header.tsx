import { AppBar, ThemeProvider, Toolbar, Typography } from "@mui/material";
import React from "react";
import { appBarTheme as theme } from "../themes/AppBarTheme";
import HelpIcon from '@mui/icons-material/Help';

const Header: React.FC = ({ }) => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" component="header">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              justifyContent: "center",
              fontFamily: "Granby EF Bold",
              color: "#e10816"
            }}
          >
            FAQs <HelpIcon />
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;