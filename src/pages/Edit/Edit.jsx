import React, { useState, useEffect } from "react";
import { inputStructure } from "../Add/constants";
import Heading from "../../components/Heading/Heading";
import db from "../../backend/database";
import { changeTab, setSbn } from "../../store/index";
import { connect } from "react-redux";
import dayjs from "dayjs";

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

  useEffect(()=>{
    fetchDetails();
  }, [])

  useEffect(() => {
    console.log("Form Data", formData);
  }, [formData]);


  async function fetchDetails() {
    try {
      const person = await db.select(`SELECT * FROM person where sbn=${props.sbn}`);
      const donations = await db.select(`SELECT * FROM donation where sbn=${props.sbn}`);
      setFormData({...person[0], donations})
    } catch(error) {
      console.log(error)
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
              value={formData[id]}
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
    sbn: state.sbn.sbn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (tab) => {
      dispatch(changeTab(tab));
    },
    setSbn: (sbn)=> {
      dispatch(setSbn(sbn))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
