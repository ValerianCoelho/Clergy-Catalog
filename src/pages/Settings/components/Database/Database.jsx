import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVert from "@mui/icons-material/MoreVert";

const options = [
  "Set Active",
  "Export (CSV)",
  "Export DB File",
  "Delete Database",
];

const databases = ["Database 1", "Database 2", "Database 3"];

function Database() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Paper sx={{overflow: 'hidden'}}>
        <Typography variant="body1" fontWeight={'bold'} p={2} sx={{ backgroundColor: 'black', color: 'white' }}>
          Databases
        </Typography>
        <Divider />
        <Box px={0}>
          {databases.map((database, index) => {
            return (
              <List disablePadding>
                <ListItem>
                  <ListItemText>{database}</ListItemText>
                  <IconButton onClick={handleClick}>
                    <MoreVertIcon />
                  </IconButton>
                </ListItem>
                <Divider />
              </List>
            );
          })}
        </Box>
        <Box p={1}>
          <Button variant="text" startIcon={<AddIcon />} fullWidth={true} disableElevation>
            Create New
          </Button>
        </Box>
      </Paper>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Database;
