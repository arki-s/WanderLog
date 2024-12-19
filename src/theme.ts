export interface Theme {
  colors:{
    primary: string;
    primaryLight: string;
    secondary: string;
    secondaryLight: string;
  };

  typography: {
    fontFamily: string;
  }

}

const theme: Theme = {
  colors:{
    primary: "#78C1F3",
    primaryLight: "#9BE8D8",
    secondary: "#E2F6CA",
    secondaryLight: "#F8FDCF",
  },

  typography: {
    fontFamily: "'Zen Kurenaido', serif",
  }

}

export default theme;
