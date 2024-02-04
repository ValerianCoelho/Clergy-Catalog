import {
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Button,
  Typography,
  IconButton,
  Stack,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Heading from "../../components/Heading/Heading";
import { useEffect, useState } from "react";
// import db from "../../backend/database";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function Title() {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Typography variant="h5">Donations</Typography>
        <ListItemAvatar>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "rgba(64, 192, 87, .1)",
              }}
            >
              <IconButton>
                <AddIcon
                  fontSize="small"
                  sx={{ color: "rgba(64, 192, 87, 1)" }}
                />
              </IconButton>
            </Avatar>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "rgba(192, 64, 64, .1)",
              }}
            >
              <IconButton>
                <RemoveIcon
                  fontSize="small"
                  color="error"
                  sx={{ color: "rgb(192, 64, 64)" }}
                />
              </IconButton>
            </Avatar>
          </Stack>
        </ListItemAvatar>
      </Stack>
    </>
  );
}

function Add() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    contact1: "",
    contact2: "",
    contact3: "",
    pan: "",
    sbn: "",
    beneficiary1: "",
    beneficiary2: "",
    address: "",
    donations: [
      {
        purpose: "",
        donationAmount: "",
        paymentMode: "",
        date: "",
        receiptNo: "",
      },
    ],
  });

  const handleChange = (attribute, value, donation, index) => {
    if (!donation) {
      setFormData((prevData) => ({
        ...prevData,
        [attribute]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        donations: {
          ...prevData.donations,
          [index]: {
            ...prevData.donations[index],
            [attribute]: value,
          },
        },
      }));
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <Heading title={"Create New Record"} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="fname"
            label="First Name"
            variant="outlined"
            type="text"
            fullWidth={true}
            onChange={(e) => {
              handleChange("fname", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="lname"
            label="Last Name"
            variant="outlined"
            type="text"
            fullWidth={true}
            onChange={(e) => {
              handleChange("lname", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            type="text"
            fullWidth={true}
            onChange={(e) => {
              handleChange("email", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="contact-no-1"
            label="Contact No 1"
            variant="outlined"
            type="number"
            fullWidth={true}
            onChange={(e) => {
              handleChange("contact1", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="contact-no-2"
            label="Contact No 2"
            variant="outlined"
            type="number"
            fullWidth={true}
            onChange={(e) => {
              handleChange("contact2", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="contact-no-3"
            label="Contact No 3"
            variant="outlined"
            type="number"
            fullWidth={true}
            onChange={(e) => {
              handleChange("contact3", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="pan"
            label="PAN Number"
            variant="outlined"
            type="number"
            fullWidth={true}
            onChange={(e) => {
              handleChange("pan", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="sbn"
            label="SBN"
            variant="outlined"
            type="number"
            fullWidth={true}
            onChange={(e) => {
              handleChange("sbn", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="beneficiary-1"
            label="Beneficiary 1"
            variant="outlined"
            type="text"
            fullWidth={true}
            onChange={(e) => {
              handleChange("beneficiary1", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="beneficiary-2"
            label="Beneficiary 2"
            variant="outlined"
            type="text"
            fullWidth={true}
            onChange={(e) => {
              handleChange("beneficiary2", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            type="text"
            fullWidth={true}
            multiline
            maxRows={3}
            onChange={(e) => {
              handleChange("address", e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Heading title={<Title />} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="purpose"
            label="Purpose"
            variant="outlined"
            type="text"
            fullWidth={true}
            onChange={(e) => {
              handleChange("purpose", e.target.value, true, 0);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="amount"
            label="Donation Amount"
            variant="outlined"
            type="number"
            fullWidth={true}
            onChange={(e) => {
              handleChange("amount", e.target.value, true, 0);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <TextField
              label="Select"
              fullWidth={true}
              select
              value={formData.donations[0].paymentMode}
              onChange={(e) => {
                handleChange("paymentMode", e.target.value, true, 0);
              }}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="China">China</MenuItem>
              <MenuItem value="America">America</MenuItem>
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <DatePicker
            label="Basic date picker"
            sx={{ width: "100%" }}
            onChange={(e) => {
              const date = new Date(e['$d']);
              const value = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
              handleChange("date", value, true, 0);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <TextField
            id="recieptNo"
            label="Reciept Number"
            variant="outlined"
            type="number"
            fullWidth={true}
            onChange={(e) => {
              handleChange("receiptNo", e.target.value, true, 0);
            }}
          />
        </Grid>
      </Grid>
      <Button variant="contained" fullWidth={true} sx={{ my: 2 }}>
        Add Record
      </Button>
    </>
  );
}

export default Add;
