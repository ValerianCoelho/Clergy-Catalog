import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function ActionCard(props) {
  return (
    <Paper
      variant="outlined"
      sx={{ display: "inline-block", padding: 2, width: 300 }}
    >
      <Stack direction="row" alignItems="center" ml={-1}>
        <IconButton>{props.icon}</IconButton>
        <Typography fontWeight="bold">{props.title}</Typography>
      </Stack>
      <Typography>{props.description}</Typography>
      <Button
        variant="contained"
        color="grey"
        size="small"
        sx={{ marginTop: 2 }}
        disableElevation
        onClick={props.handleClick}
      >
        {props.actionTitle}
      </Button>
    </Paper>
  );
}

export default ActionCard;
