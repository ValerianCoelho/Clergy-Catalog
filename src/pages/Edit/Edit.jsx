import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeTab } from "../../store/index";
import db from "../../backend/database";
import dayjs from "dayjs";
import { scrollToTop } from "../../utils/scrollToTop";

import Heading from "../../components/Heading/Heading";
import DialogBox from "../../components/Dialog/Dialog";
import { DonationTitle } from "../Add/Add";
import { inputStructure } from "../Add/constants";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";

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
          onClick={props.handleOpenDialog}
        >
          Delete
        </Button>
      </Stack>
    </>
  );
}

function Edit(props) {
  const [errorInput, setErrorInput] = useState("");
  const [dialogData, setDialogData] = useState({
    open: false,
    title: "",
    msg: "",
    option1: "",
    option2: "",
    variant: "",
  });
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
    scrollToTop();
  }, []);

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
      setDialogData({
        open: true,
        title: "Error Occured",
        msg: "Please Fill in the SBN",
        option1: "Okay",
        variant: "single",
      });
      return;
    }
    if (formData.fname.length == 0) {
      setErrorInput("fname");
      setDialogData({
        open: true,
        title: "Error Occured",
        msg: "Please Fill in the First Name",
        option1: "Okay",
        variant: "single",
      });
      return;
    }
    if (formData.lname.length == 0) {
      setErrorInput("lname");
      setDialogData({
        open: true,
        title: "Error Occured",
        msg: "Please Fill in the Last Name",
        option1: "Okay",
        variant: "single",
      });
      return;
    }
    const sbn = await db.select(
      `SELECT * FROM PERSON WHERE sbn = ${formData.sbn}`
    );
    if (sbn.toString().length > 0 && props.sbn !== formData.sbn) {
      setErrorInput("sbn");
      setDialogData({
        open: true,
        title: "Error Occured",
        msg: `Database Contains Record with SBN = ${formData.sbn}`,
        option1: "Okay",
        variant: "single",
      });
      return;
    }

    await db.execute(`DELETE FROM person WHERE sbn = ${props.sbn}`);
    await db.execute(`DELETE FROM donation WHERE sbn = ${props.sbn}`);

    const person = {
      query: `
        INSERT INTO person (address, beneficiary1, beneficiary2, contact1, contact2, contact3, email, fname, lname, pan, sbn, isDeleted)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
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
        "false",
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

    setDialogData({
      open: true,
      title: "Record Updated",
      msg: "Changes Saved Successfully",
      option1: "Continue Editing",
      option2: "Return",
      variant: "multiple",
    });
  }

  const handleCloseDialog = () => {
    setDialogData({
      ...dialogData,
      open: false,
    });
  };

  async function handleDelete() {
    await db.execute(
      `UPDATE person SET isDeleted = 'true' WHERE sbn = ${props.sbn}`
    );
    handleCloseDialog();
    props.changeTab("view");
  }

  const handleReturn = () => {
    handleCloseDialog();
    props.changeTab("view");
  };

  const handleOpenDialog = () => {
    setDialogData({
      open: true,
      title: "Delete Record",
      msg: "Deleted Records Can be restored from Settings Tab",
      option1: "Cancel",
      option2: "Delete",
      variant: "multiple",
    });
  };

  return (
    <>
      <Heading
        title={
          <Title
            handleReturn={() => props.changeTab("view")}
            handleOpenDialog={handleOpenDialog}
          />
        }
      />
      <Grid container spacing={2}>
        {inputStructure.user.map(({ id, label, type, required }) => (
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
              required={required}
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
                    value={dayjs(formData.donations[index][id], "D/M/Y")}
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
      <DialogBox
        title={dialogData.title}
        msg={dialogData.msg}
        open={dialogData.open}
        option1={dialogData.option1}
        option2={dialogData.option2}
        handleOption1={handleCloseDialog}
        handleOption2={
          dialogData.title === "Record Updated" ? handleReturn : handleDelete
        }
        variant={dialogData.variant}
        color={dialogData.title === "Record Updated" ? "success" : "error"}
      />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
