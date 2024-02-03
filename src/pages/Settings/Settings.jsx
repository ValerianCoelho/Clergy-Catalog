import ActionCard from "./components/ActionCard/ActionCard";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Settings() {
    return (
      <>
        <ActionCard
          icon={<ExitToAppIcon sx={{color: 'black'}}/>}
          title={'Import DB'}
          description={'Import data from an existing database'}
          actionTitle={'IMPORT DATABASE'}
        />
      </>
    )
  }
  
export default Settings;