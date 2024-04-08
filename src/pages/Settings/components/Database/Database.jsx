import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { open } from "@tauri-apps/api/dialog";
import {
  readDir,
  BaseDirectory,
  writeTextFile,
  readTextFile,
} from "@tauri-apps/api/fs";

function Database() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const [dbName, setDbName] = React.useState("");
  const [databases, setDatabases] = React.useState([]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDbName("");
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    async function fetchDatabases() {
      let dbs = await readDir("", {
        dir: BaseDirectory.AppData,
        recursive: true,
      });
      dbs = dbs.filter((db) => db.name.endsWith(".db"));
      dbs = dbs.map((db) => db.name);
      setDatabases(dbs);
    }
    fetchDatabases();
  }, []);

  const handleCreateDatabase = async () => {
    await writeTextFile("active.txt", dbName, {
      dir: BaseDirectory.AppConfig,
    });
    handleCloseDialog();
  };
  const handleImportDatabase = async () => {
    console.log("Import Database");
    try {
      const folderLocations = await open({
        multiple: false,
        directory: true,
      });
      const folderLocation = Array.isArray(folderLocations)
        ? folderLocations[0]
        : folderLocations;

      if (folderLocation) {
        const entries = await readDir(folderLocation, { recursive: true });
        processEntries(entries);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setAsActive = () => {
    console.log("Set as Active");
    handleCloseMenu();
  };
  const exportCsvDb = () => {
    console.log("Export CSV");
    handleCloseMenu();
  };
  const exportDbFile = () => {
    console.log("Export DB File");
    handleCloseMenu();
  };
  const deleteDatabase = () => {
    console.log("Delete Database");
    handleCloseMenu();
  };

  const options = [
    { option: "Set Active", action: setAsActive },
    { option: "Export (CSV)", action: exportCsvDb },
    { option: "Export DB File", action: exportDbFile },
    { option: "Delete Database", action: deleteDatabase },
  ];

  return (
    <div>
      <Paper sx={{ overflow: "hidden" }}>
        <Typography
          variant="body1"
          fontWeight={"bold"}
          p={2}
          sx={{ backgroundColor: "black", color: "white" }}
        >
          Databases
        </Typography>
        <Divider />
        <Box px={0}>
          {databases.map((database, index) => {
            return (
              <List disablePadding key={index}>
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
        <Stack direction={"row"} p={1} spacing={1}>
          <Button
            variant="text"
            startIcon={<AddIcon />}
            fullWidth={true}
            disableElevation
            onClick={handleOpenDialog}
          >
            Create New
          </Button>
          <Button
            variant="text"
            startIcon={<ExitToAppIcon />}
            fullWidth={true}
            disableElevation
            onClick={handleImportDatabase}
          >
            Import DB
          </Button>
        </Stack>
      </Paper>
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
        {Object.values(options).map(({ option, action }) => (
          <MenuItem key={option} onClick={action}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <Stack p={3} spacing={2} width={300}>
          <Typography variant="h6">Create Database</Typography>
          <TextField
            type={"text"}
            label={"Database Name"}
            size="medium"
            onChange={(e) => {
              setDbName(e.target.value);
            }}
          />
          <Stack direction={"row"} spacing={1}>
            <Button
              onClick={handleCloseDialog}
              variant="contained"
              autoFocus
              disableElevation
              fullWidth={true}
              size="medium"
            >
              Close
            </Button>
            <Button
              onClick={handleCreateDatabase}
              variant="contained"
              autoFocus
              disableElevation
              fullWidth={true}
              size="medium"
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </div>
  );
}

export default Database;
