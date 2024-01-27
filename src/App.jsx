import { createTheme, ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const theme = createTheme({
  palette: {
    primary: {
      main: '#101010'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Drawer variant='permanent'>
        <Box>
          <List>
            <ListItemButton>
              <ListItem>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar>
                      <ViewListRoundedIcon/>
                    </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                <ListItemText primary="Item 1"/>
              </ListItem>
            </ListItemButton>
            <ListItemButton>
              <ListItem>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar>
                      <AddCircleOutlineRoundedIcon/>
                    </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                <ListItemText primary="Item 1"/>
              </ListItem>
            </ListItemButton>
            <ListItemButton>
              <ListItem>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar>
                      <SettingsRoundedIcon/>
                    </Avatar>
                    </ListItemAvatar>
                  </ListItemIcon>
                <ListItemText primary="Item 1"/>
              </ListItem>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </ThemeProvider>
  )
}

export default App;
