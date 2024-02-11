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
        <DialogTitle variant="h6" sx={{ paddingBottom: 1 }}>{props.title}</DialogTitle>
        <DialogContent sx={{pb: 0, m: 0}}>
          <DialogContentText variant="body1">{props.msg}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "left", margin: 2 }}>
          <Button
            onClick={props.handleOption1}
            variant="contained"
            autoFocus
            disableElevation
          >
            {props.option1}
          </Button>
          {props.variant === "multiple" && (
            <Button
              variant="contained"
              onClick={props.handleOption2}
              disableElevation
              color={props.color}
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
