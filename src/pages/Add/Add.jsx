import { TextField, Grid, Select, MenuItem } from "@mui/material";
import Heading from "../../components/Heading/Heading";

function Add() {
    return (
      <>
        <Heading title={'Create New Record'}/>
        <Grid container spacing={4}>
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
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="purpose" label="Purpose" variant="outlined" type="text" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="donation-amt" label="Donation Amount" variant="outlined" type="number" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Select
              label={'age'}
              fullWidth={true}
            >
              <MenuItem>Ten</MenuItem>
              <MenuItem>Twenty</MenuItem>
              <MenuItem>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="donation-date" variant="outlined" type="date" fullWidth={true}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <TextField id="reciept-no" label="Reciept Number" variant="outlined" type="number" fullWidth={true}/>
          </Grid>
        </Grid>
      </>
    )
  }
  
  export default Add;