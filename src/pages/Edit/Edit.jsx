import React, { useState, useEffect } from "react";
import { inputStructure } from "../Add/constants";
import Heading from "../../components/Heading/Heading";
import db from "../../backend/database";
import { changeTab, setSbn, setDialogState } from "../../store/index";
import { connect } from "react-redux";
import dayjs from "dayjs";
import AlertDialog from "../../components/AlertDialog/AlterDialog";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DonationTitle } from "../Add/Add";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import { IconButton } from "@mui/material";

function Title(props) {
  return (
    <>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Typography variant="h5" sx={{ flex: 1 }}>
          Edit Record
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<ReplyIcon />}
          onClick={props.handleReturn}
        >
          Return
        </Button>
        <Button
          variant="contained"
          color="error"
          disableElevation
          startIcon={<DeleteIcon />}
          onClick={props.handleDelete}
        >
          Delete
        </Button>
      </Stack>
    </>
  );
}

function Edit(props) {
  const [errorInput, setErrorInput] = useState("");
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

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    console.log("Form Data", formData);
  }, [formData]);

  async function fetchDetails() {
    try {
      const person = await db.select(
        `SELECT * FROM person where sbn=${props.sbn}`
      );
      const donations = await db.select(
        `SELECT * FROM donation where sbn=${props.sbn}`
      );
      setFormData({ ...person[0], donations });
    } catch (error) {
      console.log(error);
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

  async function handleSaveChanges() {
    if (formData.sbn.toString().length == 0) {
      setErrorInput("sbn");
      props.setDialogState(true, "Error Occured", "Please Fill in the SBN");
      return;
    }
    if (formData.fname.length == 0) {
      setErrorInput("fname");
      props.setDialogState(
        true,
        "Error Occured",
        "Please Fill in the First Name"
      );
      return;
    }
    if (formData.lname.length == 0) {
      setErrorInput("lname");
      props.setDialogState(
        true,
        "Error Occured",
        "Please Fill in the Last Name"
      );
      return;
    }
    const sbn = await db.select(
      `SELECT * FROM PERSON WHERE sbn = ${formData.sbn}`
    );
    if (sbn.toString().length > 0 && props.sbn !== formData.sbn) {
      setErrorInput("sbn");
      props.setDialogState(
        true,
        "Error Occured",
        `Database Contains Record with SBN = ${formData.sbn}`
      );
      return;
    }

    await db.execute(`DELETE FROM person WHERE sbn = ${props.sbn}`);
    await db.execute(`DELETE FROM donation WHERE sbn = ${props.sbn}`);

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

  async function handleDelete() {
    await db.execute(
      `UPDATE person SET isDeleted = 'true' WHERE sbn = ${props.sbn}`
    );
  }

  return (
    <>
      <Heading
        title={<Title handleReturn={() => props.changeTab("view")} handleDelete={handleDelete}/>}
        
      />
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
              value={formData[id]}
              error={errorInput === id ? true : false}
            />
          </Grid>
        ))}
      </Grid>

      {Object.keys(formData.donations).map((_, index) => (
        <React.Fragment key={index}>
          <Heading
            title={
              <DonationTitle
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
                    value={formData.donations[index][id]}
                    onChange={(e) => {
                      handleChange(id, e.target.value, true, index);
                    }}
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
                      const value = `${date.getDate()}/${
                        date.getMonth() + 1
                      }/${date.getFullYear()}`;
                      handleChange(id, value, true, index);
                    }}
                    value={dayjs(formData.donations[index][id])}
                    format="DD/MM/YYYY"
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
                    value={formData.donations[index][id]}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}

      <Button
        sx={{ my: 2 }}
        variant="contained"
        fullWidth={true}
        onClick={handleSaveChanges}
      >
        Save Changes
      </Button>
      <AlertDialog />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
    sbn: state.sbn.sbn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (tab) => {
      dispatch(changeTab(tab));
    },
    setDialogState: (open, title, msg) => {
      dispatch(setDialogState(open, title, msg));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
