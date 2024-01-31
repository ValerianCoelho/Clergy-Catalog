import { createTheme, ThemeProvider } from '@mui/material/styles';


import Panel from "./layout/Panel"
import Content from "./pages/Content"


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
      <Content/>
    </ThemeProvider>
  );
}

export default App;
