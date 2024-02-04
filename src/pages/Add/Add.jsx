import { TextField, Grid, Select, MenuItem, InputLabel, Box, Button, Typography, IconButton, Stack, ListItemAvatar, Avatar } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Heading from "../../components/Heading/Heading";
import { useState } from 'react';
// import db from "../../backend/database";

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function Title() {
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
      <Typography variant="h5">Donations</Typography>
      <ListItemAvatar>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Avatar sx={{width: 32, height: 32, backgroundColor: 'rgba(64, 192, 87, .1)'}}>
            <IconButton>
              <AddIcon fontSize="small" sx={{color: 'rgba(64, 192, 87, 1)'}}/>
            </IconButton>
          </Avatar>
          <Avatar  sx={{width: 32, height: 32, backgroundColor: 'rgba(192, 64, 64, .1)'}}>
            <IconButton>
              <RemoveIcon fontSize="small" color="error" sx={{color: 'rgb(192, 64, 64)'}}/>
            </IconButton>
          </Avatar>
        </Stack>
      </ListItemAvatar>
      
      </Stack>
    </>
  )
}

function Add() {
  const [country, setCountry] = useState('');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  // async function handleClick() {
  //   const result = await db.execute(
  //     `
  //     `,
  //   );

  //   console.log(result)
  // }

    return (
      <>
        <Heading title={'Create New Record'}/>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="first-name" label="First Name" variant="outlined" type="text" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="last-name" label="Last Name" variant="outlined" type="text" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="email" label="Email" variant="outlined" type="text" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="contact-no-1" label="Contact No 1" variant="outlined" type="number" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="contact-no-2" label="Contact No 2" variant="outlined" type="number" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="contact-no-3" label="Contact No 3" variant="outlined" type="number" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="pan" label="PAN Number" variant="outlined" type="number" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="sbn" label="SBN" variant="outlined" type="number" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="beneficiary-1" label="Beneficiary 1" variant="outlined" type="text" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="beneficiary-2" label="Beneficiary 2" variant="outlined" type="text" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="address" label="Address" variant="outlined" type="text" fullWidth={true} multiline maxRows={3}/>
          </Grid>
        </Grid>
        <Heading title={<Title/>}/>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="purpose" label="Purpose" variant="outlined" type="text" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="donation-amt" label="Donation Amount" variant="outlined" type="number" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box>
              <TextField label='Select' fullWidth={true} select value={country}
                onChange={handleChange}
              >
                <MenuItem value='India'>India</MenuItem>
                <MenuItem value='China'>China</MenuItem>
                <MenuItem value='America'>America</MenuItem>
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <DatePicker label="Basic date picker" sx={{width: '100%'}}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="reciept-no" label="Reciept Number" variant="outlined" type="number" fullWidth={true}/>
          </Grid>
        </Grid>
        <Button variant="contained" fullWidth={true} sx={{my: 2}}>Add Record</Button>
      </>
    )
  }
  
  export default Add;