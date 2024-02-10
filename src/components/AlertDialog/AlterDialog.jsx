import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { setDialogState } from "../../store/index";
import { connect } from "react-redux";

function AlertDialog(props) {
  const handleClose = () => {
    props.setDialogState(false, "", "");
  };

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle sx={{paddingBottom: 1}}>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.msg}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'left'}}>
          <Button onClick={handleClose} sx={{margin: 1, marginTop: 0}} variant="contained" autoFocus disableElevation>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    open: state.dialog.open,
    title: state.dialog.title,
    msg: state.dialog.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDialogState: (open, title, msg) => {
      dispatch(setDialogState(open, title, msg));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
