import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArticleIcon from "@mui/icons-material/Article";

import { Divider } from "@mui/material";

function DisplayAdditionalDetails({ person }) {
  return (
    <Paper sx={{ marginY: 2 }}>
      <List sx={{ width: "100%" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOnIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Address" secondary={person.address} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Beneficiary" secondary={person.beneficiary} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary={person.email} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CreditCardIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Pan" secondary={person.pan} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalPhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Contact" secondary={person.contact} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ArticleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="SBN" secondary={person.sbn} />
        </ListItem>
      </List>
    </Paper>
  );
}

export default DisplayAdditionalDetails;
