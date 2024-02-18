import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

function CreateDialog(props) {
  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleClose}>
        <Stack p={3} spacing={2}>
          <Typography variant="h6">Create Database</Typography>
          <TextField type={"text"} label={"Database Name"} size="medium" />
          <Stack direction={"row"} spacing={1}>
            <Button
              onClick={props.handleClose}
              variant="contained"
              autoFocus
              disableElevation
              fullWidth={true}
              size="medium"
            >
              Close
            </Button>
            <Button
              onClick={props.handleClose}
              variant="contained"
              autoFocus
              disableElevation
              fullWidth={true}
              size="medium"
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateDialog;
