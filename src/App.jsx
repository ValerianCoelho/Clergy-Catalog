import { createTheme, ThemeProvider } from '@mui/material/styles';
const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

import Panel from "./layout/Panel"
import Content from "./pages/Content"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



const theme = createTheme({
  palette: {
    grey: createColor('#E9ECEF'),
    blue: createColor('#1976d2'),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Panel/>
        <Content/>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
