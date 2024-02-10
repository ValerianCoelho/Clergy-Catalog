import React, { useState, useEffect } from "react";
import { inputStructure } from "./constants";
import Heading from "../../components/Heading/Heading";
import db from "../../backend/database";
import { setDialogState } from "../../store/index";
import { connect } from "react-redux";
import AlertDialog from "../../components/AlertDialog/AlterDialog"

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Title(props) {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Typography variant="h5">Donation {props.index + 1}</Typography>
        {props.isLast && (
          <ListItemAvatar>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "rgba(64, 192, 87, .1)",
                }}
              >
                <IconButton onClick={props.handleAddDonation}>
                  <AddIcon
                    fontSize="small"
                    sx={{ color: "rgba(64, 192, 87, 1)" }}
                  />
                </IconButton>
              </Avatar>
              {!props.isFirst && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: "rgba(192, 64, 64, .1)",
                  }}
                >
                  <IconButton onClick={props.handleRemoveDonation}>
                    <RemoveIcon
                      fontSize="small"
                      color="error"
                      sx={{ color: "rgb(192, 64, 64)" }}
                    />
                  </IconButton>
                </Avatar>
              )}
            </Stack>
          </ListItemAvatar>
        )}
      </Stack>
    </>
  );
}

function Add(props) {
  const [errorInput, setErrorInput] = useState('');
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
    donations: {
      0: {
        purpose: "",
        amount: "",
        paymentMode: "",
        date: "",
        receipt: "",
      },
    },
  });

  async function handleSubmit() {
    if(formData.sbn.toString().length == 0) {
      setErrorInput('sbn');
      props.setDialogState(true, 'Error Occured', 'Please Fill in the SBN')
      return;
    }
    if(formData.fname.length == 0) {
      setErrorInput('fname');
      props.setDialogState(true, 'Error Occured', 'Please Fill in the First Name')
      return;
    }
    if(formData.lname.length == 0) {
      setErrorInput('lname');
      props.setDialogState(true, 'Error Occured', 'Please Fill in the Last Name')
      return;
    }
    const sbn = await db.select(`SELECT * FROM PERSON WHERE sbn = ${formData.sbn}`)
    if(sbn.toString().length > 0) {
      setErrorInput('sbn');
      props.setDialogState(true, 'Error Occured', `Database Contains Record with SBN = ${formData.sbn}`)
      return;
    }

    const person = {
      query: `
        INSERT INTO person (address, beneficiary1, beneficiary2, contact1, contact2, contact3, email, fname, lname, pan, sbn)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      values: [
        formData.address,
        formData.beneficiary1,
        formData.beneficiary2,
        formData.contact1,
        formData.contact2,
        formData.contact3,
        formData.email,
        formData.fname,
        formData.lname,
        formData.pan,
        formData.sbn,
      ],
    };
    await db.execute(person.query, person.values);

    for (const donationKey in formData.donations) {
      if (Object.hasOwnProperty.call(formData.donations, donationKey)) {
        const donation = formData.donations[donationKey];

        const donationData = {
          query: `
            INSERT INTO donation (sbn, amount, date, paymentMode, purpose, receipt)
            VALUES (?, ?, ?, ?, ?, ?);
          `,
          values: [
            formData.sbn,
            donation.amount,
            donation.date,
            donation.paymentMode,
            donation.purpose,
            donation.receipt,
          ],
        };

        await db.execute(donationData.query, donationData.values);
      }
    }
  }

  const handleAddDonation = () => {
    setFormData((prevData) => ({
      ...prevData,
      donations: {
        ...prevData.donations,
        [Object.keys(prevData.donations).length]: {
          purpose: "",
          amount: "",
          paymentMode: "",
          date: "",
          receipt: "",
        },
      },
    }));
  };

  const handleRemoveDonation = () => {
    setFormData((prevData) => {
      const {
        [Object.keys(prevData.donations).pop()]: removedDonation,
        ...newDonations
      } = prevData.donations;
      return {
        ...prevData,
        donations: newDonations,
      };
    });
  };

  useEffect(() => {
    console.log(formData.donations);
  }, [formData]);

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

  return (
    <>
      <Heading title={"Create New Record"} />
      <Grid container spacing={2}>
        {inputStructure.user.map(({ id, label, type }) => (
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={id}>
            <TextField
              id={id}
              label={label}
              variant="outlined"
              type={type}
              fullWidth={true}
              onChange={(e) => {
                handleChange(id, e.target.value);
              }}
              required
              error={errorInput === id ? true : false }
            />
          </Grid>
        ))}
      </Grid>

      {Object.keys(formData.donations).map((_, index) => (
        <React.Fragment key={index}>
          <Heading
            title={
              <Title
                handleAddDonation={handleAddDonation}
                handleRemoveDonation={handleRemoveDonation}
                index={index}
                isFirst={index == 0}
                isLast={index == Object.keys(formData.donations).length - 1}
              />
            }
          />
          <Grid container spacing={2}>
            {inputStructure.donations.map(({ id, label, type }) => (
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={id}>
                {type === "select" && (
                  <TextField
                    select
                    label={label}
                    fullWidth={true}
                    value={formData.donations[index].paymentMode}
                    onChange={(e) => {
                      handleChange(id, e.target.value, true, index);
                    }}
                    required
                  >
                    <MenuItem value="cheque">Cheque</MenuItem>
                    <MenuItem value="card">Card</MenuItem>
                    <MenuItem value="cash">Cash</MenuItem>
                  </TextField>
                )}
                {type === "date" && (
                  <DatePicker
                    label={label}
                    sx={{ width: "100%" }}
                    onChange={(e) => {
                      const date = new Date(e["$d"]);
                      const value = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                      handleChange(id, value, true, index);
                    }}
                    format="DD/MM/YYYY"
                    required
                  />
                )}
                {(type === "text" || type === "number") && (
                  <TextField
                    id={id}
                    label={label}
                    variant="outlined"
                    type={type}
                    fullWidth={true}
                    onChange={(e) => {
                      handleChange(id, e.target.value, true, index);
                    }}
                    required
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}

      <Button
        variant="contained"
        fullWidth={true}
        sx={{ my: 2 }}
        onClick={handleSubmit}
      >
        Add Record
      </Button>
      <AlertDialog/>
    </>
  );
}

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDialogState: (open, title, msg) => {
      dispatch(setDialogState(open, title, msg));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);