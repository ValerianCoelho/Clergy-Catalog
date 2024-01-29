import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Typography } from "@mui/material";
import Panel from "./layout/Panel"

const theme = createTheme({
  palette: {
    primary: {
      main: '#101010',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Panel/>
      <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, voluptatem delectus? Fugiat labore, placeat, culpa molestiae harum ab est a, beatae asperiores velit nemo amet iusto ea aperiam et. Sed!</Typography>
    </ThemeProvider>
  );
}

export default App;
