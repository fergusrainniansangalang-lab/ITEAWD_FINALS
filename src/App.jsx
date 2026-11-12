import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import router from 'routes/router';

/**
 * MUI Theme - Sakura Pink palette matching the design screenshot.
 * Primary: #F48FB1 (pink), Secondary: #EC407A (deep pink)
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#F48FB1',
      dark: '#EC407A',
      light: '#FCE4EC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EC407A',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
