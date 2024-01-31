import { TextField, Grid, Typography } from "@mui/material";

function Add() {
    return (
      <>
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
      </>
    )
  }
  
  export default Add;