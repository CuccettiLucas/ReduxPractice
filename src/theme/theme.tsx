import { createTheme } from "@mui/material";

const theme = createTheme({
    palette:{
        primary:{
            main:"#17181aff"
        },
        secondary:{
            main:"#4a4b50ff"
        },
        error:{
            main:"#a50000ff"
        }
    },
    typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    }
});

export default theme;