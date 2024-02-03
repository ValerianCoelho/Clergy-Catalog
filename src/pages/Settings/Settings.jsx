import ActionCard from "./components/ActionCard/ActionCard";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Heading from "../../components/Heading/Heading"
import { Stack, Typography } from "@mui/material";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import BackupTableIcon from '@mui/icons-material/BackupTable';

function Settings() {
    return (
      <>
        <Heading title={'Settings'}/>
        <Typography variant="body1" fontWeight={'bold'} mb={1}>IMPORT</Typography>
        <ActionCard
          icon={<ExitToAppIcon sx={{color: 'black'}}/>}
          title={'Import DB'}
          description={'Import data from an existing database'}
          actionTitle={'IMPORT DATABASE'}
        />
        <Typography variant="body1" fontWeight={'bold'} mb={1} mt={4}>EXPORT</Typography>
        <Stack spacing={2} direction={'row'}>
          <ActionCard
            icon={<SystemUpdateAltIcon sx={{color: 'black'}}/>}
            title={'Export DB'}
            description={'Export the Database File'}
            actionTitle={'EXPORT DATABASE'}
          />
          <ActionCard
            icon={<BackupTableIcon sx={{color: 'black'}}/>}
            title={'EXPORT AS CSV'}
            description={'Backup the database as a CSV File'}
            actionTitle={'EXPORT AS CSV FILE'}
          />
        </Stack>
      </>
    )
  }
  
export default Settings;