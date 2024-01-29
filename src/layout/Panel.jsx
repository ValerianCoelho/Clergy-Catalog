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

function Panel() {
  return (
    <Drawer variant='permanent'>
        <List>
          <ListItemButton sx={{margin: 0, padding: 0}}>
            <ListItem>
              <ListItemIcon sx={{minWidth: 0}}>
                <ListItemAvatar sx={{minWidth: 0}}>
                  <Avatar sx={{ backgroundColor: 'rgba(34, 139, 230, .1)', borderRadius: 2, width: 32, height: 32}}>
                    <HomeOutlinedIcon fontSize='small' sx={{color: 'rgba(34, 139, 230, 1)'}}/>
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <ListItemText primary="View Records" sx={{marginLeft: 2}}/>
            </ListItem>
          </ListItemButton>
          <ListItemButton sx={{margin: 0, padding: 0}}>
            <ListItem>
              <ListItemIcon sx={{minWidth: 0}}>
                <ListItemAvatar sx={{minWidth: 0}}>
                  <Avatar sx={{backgroundColor: 'rgba(64, 192, 87, .1)', borderRadius: 2, width: 32, height: 32}}>
                    <AddCircleOutlineRoundedIcon fontSize='small' sx={{color: 'rgba(64, 192, 87, 1)'}}/>
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <ListItemText primary="Add New Records"  sx={{marginLeft: 2}}/>
            </ListItem>
          </ListItemButton>
          <ListItemButton sx={{margin: 0, padding: 0}}>
            <ListItem>
              <ListItemIcon sx={{minWidth: 0}}>
                <ListItemAvatar sx={{minWidth: 0}}>
                  <Avatar sx={{backgroundColor: 'rgba(121, 80, 242, .1)', borderRadius: 2, width: 32, height: 32}}>
                    <SettingsOutlinedIcon fontSize='small' sx={{color: 'rgba(121, 80, 242, 1)'}}/>
                  </Avatar>
                </ListItemAvatar>
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{marginLeft: 2}}/>
            </ListItem>
          </ListItemButton>
        </List>
    </Drawer>
  )
}

export default Panel;