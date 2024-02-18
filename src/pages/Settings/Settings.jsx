import { useEffect, useState } from "react";
import { scrollToTop } from "../../utils/scrollToTop";
import ActionCard from "./components/ActionCard/ActionCard";
import Heading from "../../components/Heading/Heading";
import DisplayDeleted from "./components/DisplayDeleted/DisplayDeleted";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import BackupTableIcon from "@mui/icons-material/BackupTable";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import CreateDialog from "../../components/Dialog/CreateDialog/CreateDialog";

function Settings() {
  const [createDbDialog, setCreateDbDialog] = useState(false);
  const [loadDbDialog, setLoadDbDialog] = useState(false);
  const [importDbDialog, setImportDbDialog] = useState(false);
  const [exportDbDialog, setExportDbDialog] = useState(false);
  const [exportCsvDbDialog, setExportCsvDbDialog] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleClose = () => {
    setCreateDbDialog(false);
  };

  const handleCreateDB = () => {
    setCreateDbDialog(true);
  };

  return (
    <>
      <Heading title={"Settings"} />
      <Typography variant="body1" fontWeight={"bold"} mb={1}>
        SETUP
      </Typography>
      <Stack spacing={2} direction={"row"}>
        <ActionCard
          icon={<ExitToAppIcon sx={{ color: "black" }} />}
          title={"Create DB"}
          description={
            "Creates a db with the tables required to run the application"
          }
          actionTitle={"CREATE DATABASE"}
          handleClick={handleCreateDB}
        />
        <ActionCard
          icon={<ExitToAppIcon sx={{ color: "black" }} />}
          title={"Load DB"}
          description={"Loads the db from the root of the appliation for use"}
          actionTitle={"LOAD DATABASE"}
        />
        <ActionCard
          icon={<ExitToAppIcon sx={{ color: "black" }} />}
          title={"Import DB"}
          description={"Places the db in the root directory of the application"}
          actionTitle={"IMPORT DATABASE"}
        />
      </Stack>
      <Typography variant="body1" fontWeight={"bold"} mb={1} mt={4}>
        BACKUP
      </Typography>
      <Stack spacing={2} direction={"row"}>
        <ActionCard
          icon={<SystemUpdateAltIcon sx={{ color: "black" }} />}
          title={"Export DB"}
          description={
            "Export the Database from the root of the application to any folder on the computer"
          }
          actionTitle={"EXPORT DATABASE"}
        />
        <ActionCard
          icon={<BackupTableIcon sx={{ color: "black" }} />}
          title={"EXPORT AS CSV"}
          description={"Export the Currently Loaded DB as a CSV File"}
          actionTitle={"EXPORT AS CSV FILE"}
        />
      </Stack>
      <Heading title={"Deleted Records"} />
      <DisplayDeleted />
      <CreateDialog open={createDbDialog} handleClose={handleClose} />
    </>
  );
}

export default Settings;
