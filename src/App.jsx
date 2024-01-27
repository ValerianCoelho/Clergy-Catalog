import { createTheme, ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

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
      <Drawer variant='permanent'>
          <List>
            <ListItemButton sx={{margin: 0, padding: 0}}>
              <ListItem>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: 'rgba(34, 139, 230, .1)', borderRadius: 2}}>
                      <HomeOutlinedIcon fontSize='small' sx={{color: 'rgba(34, 139, 230, 1)'}}/>
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary="View Records"/>
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{margin: 0, padding: 0}}>
              <ListItem>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar sx={{backgroundColor: 'rgba(64, 192, 87, .1)', borderRadius: 2}}>
                      <AddCircleOutlineRoundedIcon fontSize='small' sx={{color: 'rgba(64, 192, 87, 1)'}}/>
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary="Add New Records" />
              </ListItem>
            </ListItemButton>
            <ListItemButton sx={{margin: 0, padding: 0}}>
              <ListItem>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar sx={{backgroundColor: 'rgba(121, 80, 242, .1)', borderRadius: 2}}>
                      <SettingsOutlinedIcon fontSize='small' sx={{color: 'rgba(121, 80, 242, 1)'}}/>
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </ListItemButton>
          </List>
      </Drawer>
    </ThemeProvider>
  );
}

export default App;
