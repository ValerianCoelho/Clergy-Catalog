import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Box, Typography } from "@mui/material";
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
      <Box sx={{marginLeft: 28}}>
        <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex quia sint, hic quas maxime veniam reiciendis esse voluptates nobis eius libero magni nostrum temporibus corporis tempore nemo quo. Porro, ratione.</Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
