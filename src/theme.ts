import { createTheme } from '@mui/material/styles';

const myMelodyTheme = createTheme({
  palette: {
    primary: {
      main: '#FFB6C1', // Light pink
      light: '#FFE4E9',
      dark: '#FF8FAB',
    },
    secondary: {
      main: '#DDA0DD', // Plum
      light: '#F0E6F6',
      dark: '#BA55D3',
    },
    background: {
      default: '#FFF0F5', // Lavender blush
      paper: '#FFFFFF',
    },
    success: {
      main: '#98FB98', // Pale green
    },
    info: {
      main: '#87CEEB', // Sky blue
    },
    warning: {
      main: '#FFD700', // Gold
    },
    error: {
      main: '#FF6B8B', // Watermelon pink
    },
    text: {
      primary: '#8B5F8D', // Dusty purple
      secondary: '#C9A9A6', // Rose quartz
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", "Segoe UI Emoji", cursive',
    h1: {
      fontFamily: '"Pacifico", cursive',
      color: '#FF69B4',
    },
    h2: {
      fontFamily: '"Pacifico", cursive',
      color: '#FF69B4',
    },
    h3: {
      fontFamily: '"Pacifico", cursive',
      color: '#FF69B4',
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          fontWeight: 'bold',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #FFB6C1 30%, #FF8FAB 90%)',
          boxShadow: '0 3px 5px 2px rgba(255, 182, 193, .3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: '2px dashed #FFB6C1',
          background: 'linear-gradient(145deg, #ffffff 0%, #fffafc 100%)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffb6c1\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        },
      },
    },
  },
});

export default myMelodyTheme;