import { Button, IconButton, Paper, Stack, Typography } from "@mui/material";

function ActionCard(props) {
  return (
    <Paper variant="outlined" sx={{display: 'inline-block', padding: 2, minWidth: 280}}>
        <Stack direction='row' alignItems='center' ml={-1}>
          <IconButton>
            {props.icon}
          </IconButton>
          <Typography fontWeight='bold'>{props.title}</Typography>
        </Stack>
        <Typography>{props.description}</Typography>
        <Button variant="contained" color="grey" size="small" sx={{marginTop: 2}}>{props.actionTitle}</Button>
      </Paper>
  )
}

export default ActionCard;