import { TextField, Grid, Select, MenuItem, InputLabel, Box, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Heading from "../../components/Heading/Heading";
import { useState } from 'react';
import Database from "tauri-plugin-sql-api";

function Add() {
  const [country, setCountry] = useState('');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  async function handleClick() {
    const db = await Database.load("sqlite:test.db");
    const result = await db.execute(
      "INSERT INTO users (name, age) VALUES ('Valerian Coelho', 20);",
    );
    console.log(result)
  }

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
        <Heading title={'Donation 1'}/>
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
        <Button variant="contained" onClick={handleClick}>Hello</Button>
      </>
    )
  }
  
  export default Add;