import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Logo from "../../components/Logo/Logo";

export default function Credits() {
  return (
    <List
      sx={{ cursor: "pointer", bgcolor: "background.paper" }}
      onClick={() => {
        window.open("https://dreamcodestudio.netlify.app/");
      }}
    >
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" component={Logo} />
        </ListItemAvatar>
        <ListItemText
          sx={{ marginLeft: 0.5 }}
          primary="Dream Code Studio"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Valerian Coelho
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
