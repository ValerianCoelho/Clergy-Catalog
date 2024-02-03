import { createTheme, ThemeProvider } from '@mui/material/styles';
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

import Panel from "./layout/Panel"
import Content from "./pages/Content"


const theme = createTheme({
  palette: {
    grey: createColor('#E9ECEF'),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Panel/>
      <Content/>
    </ThemeProvider>
  );
}

export default App;
