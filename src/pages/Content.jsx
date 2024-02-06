import { Box } from "@mui/material";
import { connect } from "react-redux";

import Add from "./Add/Add";
import View from "./View/View";
import Settings from "./Settings/Settings";
import Edit from "./Edit/Edit";


function Content(props) {
  return (
    <Box sx={{marginLeft: 30, marginRight: 5, marginTop: 4}}>
      {props.tab === 'view' && <View/>}
      {props.tab === 'add' && <Add/>}
      {props.tab === 'settings' && <Settings/>}
      {props.tab === 'edit' && <Edit/>}
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
  }
}

export default connect(
  mapStateToProps
)(Content)