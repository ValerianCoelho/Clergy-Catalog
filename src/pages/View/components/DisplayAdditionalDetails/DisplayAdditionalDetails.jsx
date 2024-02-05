import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArticleIcon from "@mui/icons-material/Article";
import { Grid } from "@mui/material";

function DisplayAdditionalDetails({ person }) {
  const additionalDetails = [
    {
      value: person.address,
      label: "Address",
      backgroundColor: 'rgba(64, 192, 87, .1)',
      icon: <LocationOnIcon sx={{ color: 'rgba(64, 192, 87, 1)' }} />,
    },
    {
      value: person.beneficiary1,
      label: "Beneficiary 1",
      backgroundColor: 'rgba(255, 0, 0, .1)',
      icon: <PersonIcon sx={{ color: 'rgba(255, 0, 0, 1)' }} />, // Red
    },
    {
      value: person.beneficiary2,
      label: "Beneficiary 2",
      backgroundColor: 'rgba(255, 0, 0, .1)',
      icon: <PersonIcon sx={{ color: 'rgba(255, 0, 0, 1)' }} />, // Red
    },
    {
      value: person.email,
      label: "Email",
      backgroundColor: 'rgba(34, 139, 230, .1)',
      icon: <EmailIcon sx={{ color: 'rgba(34, 139, 230, 1)' }} />, // Blue
    },
    {
      value: person.pan,
      label: "PAN",
      backgroundColor: 'rgba(121, 80, 242, .1)',
      icon: <CreditCardIcon sx={{ color: 'rgba(121, 80, 242, 1)' }} />, // Purple
    },
    {
      value: person.sbn,
      label: "SBN",
      backgroundColor: 'rgba(121, 80, 242, .1)',
      icon: <ArticleIcon sx={{ color: 'rgba(121, 80, 242, 1)' }} />, // Pink
    },
    {
      value: person.contact1,
      label: "Contact 1",
      backgroundColor: 'rgba(34, 139, 230, .1)',
      icon: <LocalPhoneIcon sx={{ color: 'rgba(34, 139, 230, 1)' }} />, // Teal
    },
    {
      value: person.contact2,
      label: "Contact 2",
      backgroundColor: 'rgba(34, 139, 230, .1)',
      icon: <LocalPhoneIcon sx={{ color: 'rgba(34, 139, 230, 1)' }} />, // Red-Orange
    },
    {
      value: person.contact3,
      label: "Contact 3",
      backgroundColor: 'rgba(34, 139, 230, .1)',
      icon: <LocalPhoneIcon sx={{ color: 'rgba(34, 139, 230, 1)' }} />, // Sea Green
    },
  ];
  

  return (
    <Paper sx={{ marginY: 2 }}>
      <Grid container>
        {additionalDetails.map(({ value, label, icon, backgroundColor }, index) => (
          <React.Fragment key={index}>
            {value && (
              <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
                <ListItem sx={{ border: "1px solid #e1e1e1" }}>
                  <ListItemAvatar>
                    <Avatar sx={{backgroundColor: backgroundColor}}>{icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={label} secondary={value} />
                </ListItem>
              </Grid>
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
}

export default DisplayAdditionalDetails;
