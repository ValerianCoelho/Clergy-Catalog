import React, { useEffect } from "react";
import { useState } from "react";
import { data } from "./constants";
import db from "../../backend/database";
import { changeTab } from '../../store/index'
import { connect } from "react-redux";

import Heading from "../../components/Heading/Heading";
import DisplayDonations from "./components/DisplayDonations/DisplayDonations";
import DisplayAdditionalDetails from "./components/DisplayAdditionalDetails/DisplayAdditionalDetails";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";

function View(props) {
  const [open, setOpen] = useState(-1);
  const [searchAttribute, setSearchAttribute] = useState('First Name');
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetchDetails();
  }, [])


  async function fetchDetails() {
    try {
      const people = await db.select("SELECT * FROM person");
  
      // Create an array of promises for fetching donations
      const donationPromises = people.map(person =>
        db.select(`SELECT * FROM donation WHERE sbn=${person.sbn}`)
      );
  
      // Wait for all donation promises to resolve
      const donationsList = await Promise.all(donationPromises);
      
      // Combine person and donation data
      const details = people.map((person, index) => ({
        ...person,
        donations: donationsList[index]
      }));
      // console.log("Hello", details)
  
      setData(details);
      console.log(details);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  }
  

  return (
    <>
      <Heading title={'Search Records'}/>
      <Stack direction={"row"} pb={3} spacing={2}>
        <TextField
          label={'Search ' + searchAttribute}
          variant="outlined"
          type="text"
          fullWidth={true}
        />
        <TextField 
          select label={"Select"} 
          value={searchAttribute} 
          sx={{minWidth: 200}}
          onChange={(e)=>(setSearchAttribute(e.target.value))}
        >
          <MenuItem value="First Name">First Name</MenuItem>
          <MenuItem value="Last Name">Last Name</MenuItem>
          <MenuItem value="SBN">SBN</MenuItem>
        </TextField>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{backgroundColor: "black"}}>
            <TableRow>
              <TableCell sx={{color: 'white', fontWeight: 'bold'}}>Expand</TableCell>
              <TableCell sx={{color: 'white', fontWeight: 'bold'}}>First Name</TableCell>
              <TableCell sx={{color: 'white', fontWeight: 'bold'}}>Last Name</TableCell>
              <TableCell sx={{color: 'white', fontWeight: 'bold'}}>SBN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((person, index) => (
              <React.Fragment key={index}>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index % 2 === 1 ? '#f4f4f4' : 'white' }}>
                  <TableCell>
                    <IconButton onClick={()=>{setOpen(open === index ? -1 : index)}}>
                      { open == index ? <KeyboardArrowUp/> : <KeyboardArrowDown/> }
                    </IconButton>  
                  </TableCell>
                  <TableCell>{person.fname}</TableCell>
                  <TableCell>{person.lname}</TableCell>
                  <TableCell>{person.sbn}</TableCell>
                </TableRow>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, border: open === index ? '2px solid #4d4d4d52' : ''}}>
                  <TableCell colSpan={4} sx={{paddingTop: 0, paddingBottom: 0}}>
                    <Collapse in={open == index} timeout='auto' unmountOnExit>
                      <Typography variant='h5' sx={{marginTop: 3, marginBottom: 2}}>Donation Details</Typography>
                      <DisplayDonations donations={person.donations}/>
                      <Typography variant='h5' sx={{marginTop: 4, marginBottom: 2}}>Additional Details</Typography>
                      <DisplayAdditionalDetails person={person}/>
                      <Button 
                        variant="contained" 
                        fullWidth={true} 
                        sx={{marginBottom: 2}} 
                        disableElevation
                        onClick={()=>{
                          props.changeTab('edit')
                        }}
                      >
                        Edit Record
                      </Button>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (tab)=> {
      dispatch(changeTab(tab))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);