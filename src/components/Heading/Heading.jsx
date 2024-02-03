import { Typography, Divider, List, Box } from "@mui/material";

function Heading({title}) {
  return (
    <Box sx={{margin: '20px 0'}}>
      <Typography variant="h5">{title}</Typography>
      <List>
        <Divider component='li' sx={{ bgcolor: '#cbcbcb' }} />
      </List>
    </Box>
  )
}

export default Heading;