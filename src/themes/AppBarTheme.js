import { createTheme } from "@mui/material";

export const appBarTheme = createTheme({
    components: {
        MuiAppBar: {
          styleOverrides: {
            root: ({ ownerState }) => {
              return {
                ...((ownerState.component === "header"|| ownerState.component === "footer" )&& {
                  backgroundColor: "white"
                })
              };
            }
          }
        }
      }
  });