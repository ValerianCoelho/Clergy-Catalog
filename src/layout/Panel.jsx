import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { changeTab } from "../store/index";
import { connect } from "react-redux";
import Credits from "./Credits/Credits";
import { Box, Stack } from "@mui/material";

function Panel(props) {
  const panelData = [
    {
      tab: "view",
      primaryText: "View Records",
      backgroundColor: "rgba(34, 139, 230, .1)",
      icon: (
        <HomeOutlinedIcon
          fontSize={"small"}
          sx={{ color: "rgba(34, 139, 230, 1)" }}
        />
      ),
    },
    {
      tab: "add",
      primaryText: "Add New Records",
      backgroundColor: "rgba(64, 192, 87, .1)",
      icon: (
        <AddCircleOutlineRoundedIcon
          fontSize={"small"}
          sx={{ color: "rgba(64, 192, 87, 1)" }}
        />
      ),
    },
    {
      tab: "settings",
      primaryText: "Settings",
      backgroundColor: "rgba(121, 80, 242, .1)",
      icon: (
        <SettingsOutlinedIcon
          fontSize={"small"}
          sx={{ color: "rgba(121, 80, 242, 1)" }}
        />
      ),
    },
  ];

  return (
    <Drawer variant="permanent">
      <Stack sx={{width: "240px", flex:1 }}>
        <List sx={{ flex: 1 }}>
          {panelData.map(
            ({ primaryText, backgroundColor, icon, tab }, index) => {
              return (
                <ListItemButton
                  key={index}
                  sx={{ margin: 0, padding: 0 }}
                  onClick={() => {
                    props.changeTab(tab);
                    localStorage.setItem("tab", tab);
                  }}
                  selected={props.tab === tab}
                >
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <ListItemAvatar sx={{ minWidth: 0 }}>
                        <Avatar
                          sx={{
                            backgroundColor: { backgroundColor },
                            borderRadius: 2,
                            width: 32,
                            height: 32,
                          }}
                        >
                          {icon}
                        </Avatar>
                      </ListItemAvatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={primaryText}
                      sx={{ marginLeft: 2 }}
                    />
                  </ListItem>
                </ListItemButton>
              );
            }
          )}
        </List>
        {/* <Credits /> */}
      </Stack>
    </Drawer>
  );
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (tab) => {
      dispatch(changeTab(tab));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
