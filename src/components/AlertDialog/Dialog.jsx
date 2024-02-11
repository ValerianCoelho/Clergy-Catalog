import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function DialogBox(props) {
  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleOption1}>
        <DialogTitle sx={{ paddingBottom: 1 }}>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.msg}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "left" }}>
          <Button
            onClick={props.handleOption1}
            sx={{ margin: 1, marginTop: 0 }}
            variant="contained"
            autoFocus
            disableElevation
          >
            {props.option1}
          </Button>
          {props.variant === "multiple" && (
            <Button
              variant="contained"
              sx={{ margin: 1, marginTop: 0 }}
              onClick={props.handleOption2}
              disableElevation
            >
              {props.option2}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogBox;
