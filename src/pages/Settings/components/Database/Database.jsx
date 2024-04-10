import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import Database from "tauri-plugin-sql-api";
import db from "../../../../backend/database";
import { reload } from "./utils";
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
  removeFile,
  copyFile,
} from "@tauri-apps/api/fs";
import { convertToCsv, exportToCsv } from "./utils";
import { fetchDetails } from "../../../View/utils";

function DatabaseTable() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const openMenu = Boolean(anchorEl);

  const [dbName, setDbName] = React.useState("");
  const [databases, setDatabases] = React.useState([]);
  const [selectedDb, setSelectedDb] = React.useState("");
  const [activeDb, setActiveDb] = React.useState("");

  React.useEffect(() => {
    async function getActiveDb() {
      const activeDb = await readTextFile("active.txt", {
        dir: BaseDirectory.AppConfig,
      });
      setActiveDb(activeDb);
    }
    getActiveDb();
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDbName("");
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleClick = (event, dbName) => {
    setSelectedDb(dbName);
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
      dbs = dbs.map((db) => db.name.replace(".db", ""));
      setDatabases(dbs);
    }
    fetchDatabases();
  }, []);

  const handleCreateDatabase = async () => {
    await writeTextFile("active.txt", dbName, {
      dir: BaseDirectory.AppConfig,
    });
    handleCloseDialog();
    reload(db);
  };
  const handleImportDatabase = async () => {
    try {
      const source = await open({
        multiple: false,
        filters: [
          {
            name: "Database",
            extensions: ["db"],
          },
        ],
      });
      const destination = source.split("\\").pop();
      await copyFile(source, destination, { dir: BaseDirectory.AppConfig });
      await writeTextFile("active.txt", destination.split(".")[0], {
        dir: BaseDirectory.AppConfig,
      });
      reload(db);
    } catch (error) {
      console.log(error);
    }
  };
  const setAsActive = async () => {
    if (activeDb === selectedDb) {
      return;
    }
    await writeTextFile("active.txt", selectedDb, {
      dir: BaseDirectory.AppConfig,
    });
    handleCloseMenu();
    reload(db);
  };
  const exportCsvDb = async () => {
    const csvDb = activeDb === selectedDb ? db : await Database.load(`sqlite:${selectedDb}.db`);
    fetchDetails(csvDb).then(async (details) => {
      exportToCsv(`${selectedDb}.csv`, convertToCsv(details));
      if(activeDb != selectedDb) {
        await csvDb.close();
      }
    });
    handleCloseMenu();
  };
  const exportDbFile = async () => {
    try {
      const selected = await open({
        multiple: false,
        directory: true,
      });
      // console.log(selected, selectedDb);
      const source = `${selectedDb}.db`;
      const destination = `${selected}\\${selectedDb}.db`;
      await copyFile(source, destination, { dir: BaseDirectory.AppConfig });
    } catch (error) {
      console.log(error);
    }
    handleCloseMenu();
  };
  const deleteDatabase = async () => {
    if(activeDb === selectedDb) {
      setOpenDeleteDialog(true);
      handleCloseMenu();
      return;
    }
    try {
      await removeFile(`${selectedDb}.db`, { dir: BaseDirectory.AppConfig });
      await removeFile(`${selectedDb}.db-shm`, {
        dir: BaseDirectory.AppConfig,
      });
      await removeFile(`${selectedDb}.db-wal`, {
        dir: BaseDirectory.AppConfig,
      });
    } catch (error) {
      console.log(error);
    }
    handleCloseMenu();
    reload(db);
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
                  <ListItemText>
                    {database}{" "}
                    <Typography
                      sx={{ color: "#20c72e", display: "inline-block" }}
                    >
                      {database === activeDb && "(active)"}
                    </Typography>
                  </ListItemText>
                  <IconButton
                    onClick={(e) => {
                      handleClick(e, database);
                    }}
                  >
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
      <Dialog open={openDeleteDialog} onClose={()=>{setOpenDeleteDialog(false)}}>
        <Stack p={3} spacing={2} width={300}>
          <Typography variant="h6">
          Active databases cannot be deleted
          </Typography>
          <Button
            onClick={()=>{setOpenDeleteDialog(false)}}
            variant="contained"
            autoFocus
            disableElevation
            fullWidth={true}
            size="medium"
          >
            Okay
          </Button>
        </Stack>
      </Dialog>
    </div>
  );
}

export default DatabaseTable;
