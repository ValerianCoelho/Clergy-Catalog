import React, { useState, useEffect } from "react";
import { inputStructure } from "../Add/constants";
import Heading from "../../components/Heading/Heading";
import db from "../../backend/database";
import { changeTab } from "../../store/index";
import { connect } from "react-redux";

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

function Edit(props) {
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
    // const result = await db.select(`SELECT name FROM sqlite_master WHERE type='table';`)
    const result = await db.select(`select * from person`);
    // const result = await db.execute(`DROP TABLE IF EXISTS donation;`)
    // const result = await db.execute(`DELETE FROM donation;`)
    // const result = await db.execute(`
    // INSERT INTO person (fname, lname, email, contact1, contact2, contact3, pan, sbn, beneficiary1, beneficiary2, address) VALUES
    // ('John', 'Doe', 'john.doe@email.com', 1234567890, 9876543210, 4567890123, 1234567890123456, 100001, 'Alice', 'Bob', '123 Main Street'),
    // ('Alice', 'Smith', 'alice.smith@email.com', 9876543210, 1234567890, 7890123456, 6543210987654321, 100002, 'Charlie', 'David', '456 Oak Avenue'),
    // ('Bob', 'Johnson', 'bob.johnson@email.com', 4567890123, 7890123456, 1234567890, 7890123456789012, 100003, 'Emma', 'Frank', '789 Pine Lane'),
    // ('Charlie', 'Williams', 'charlie.williams@email.com', 7890123456, 4567890123, 9876543210, 5678901234567890, 100004, 'Grace', 'Henry', '101 Cedar Road'),
    // ('David', 'Taylor', 'david.taylor@email.com', 1234567890, 7890123456, 4567890123, 3456789012345678, 100005, 'Isabel', 'James', '202 Elm Street');

    // INSERT INTO donation (sbn, purpose, amount, paymentMode, date, receipt) VALUES
    // (100001, 'Education Fund', 500.00, 'Credit Card', '2024-01-01', 101),
    // (100002, 'Medical Expenses', 1000.00, 'PayPal', '2024-02-05', 102),
    // (100003, 'Community Development', 750.50, 'Bank Transfer', '2024-03-10', 103),
    // (100004, 'Environmental Conservation', 1200.75, 'Cash', '2024-04-15', 104),
    // (100005, 'Animal Welfare', 300.25, 'Cheque', '2024-05-20', 105);

    // `);
    console.log(result);

    // const person = {
    //   query: `
    //     INSERT INTO person (address, beneficiary1, beneficiary2, contact1, contact2, contact3, email, fname, lname, pan, sbn)
    //     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    //   `,
    //   values: [
    //     formData.address,
    //     formData.beneficiary1,
    //     formData.beneficiary2,
    //     formData.contact1,
    //     formData.contact2,
    //     formData.contact3,
    //     formData.email,
    //     formData.fname,
    //     formData.lname,
    //     formData.pan,
    //     formData.sbn,
    //   ],
    // };
    // await db.execute(person.query, person.values);

    // for (const donationKey in formData.donations) {
    //   if (Object.hasOwnProperty.call(formData.donations, donationKey)) {
    //     const donation = formData.donations[donationKey];

    //     const donationData = {
    //       query: `
    //         INSERT INTO donation (sbn, amount, date, paymentMode, purpose, receipt)
    //         VALUES (?, ?, ?, ?, ?, ?);
    //       `,
    //       values: [
    //         formData.sbn,
    //         donation.amount,
    //         donation.date,
    //         donation.paymentMode,
    //         donation.purpose,
    //         donation.receipt,
    //       ],
    //     };

    //     await db.execute(donationData.query, donationData.values);
    //   }
    // }
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
      <Heading title={"Edit Record"} />
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
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}

      <Stack direction={"row"} spacing={2} sx={{ my: 2 }}>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={() => {
            props.changeTab("view");
          }}
        >
          Stop Editing
        </Button>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={() => {
            props.changeTab("view");
          }}
        >
          Save Changes
        </Button>
        <Button
          variant="contained"
          fullWidth={true}
          onClick={() => {
            props.changeTab("view");
          }}
        >
          Delete Record
        </Button>
      </Stack>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
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
