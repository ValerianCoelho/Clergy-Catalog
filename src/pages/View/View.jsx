import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { details } from './constants'
import { Collapse, IconButton, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import DisplayDonations from './components/DisplayDonations/DisplayDonations';
import DisplayAdditionalDetails from './components/DisplayAdditionalDetails/DisplayAdditionalDetails';
import { useState } from 'react';
import db from '../../backend/database';

async function fetchDetails() {
  const people = await db.select("SELECT * FROM person;")
  const donations  = await db.select("SELECT * FROM donation;")
  
  const details = []
  for (const person of people) {
    // combine both beneficiaries in UI
    person.beneficiary = person.beneficiary1
      + (person.beneficiary2 ? `, ${person.beneficiary2}` : '');

    person.donations = [];
    for (const donation of donations) {
      if (donation.sbn != person.sbn) continue;
      person.donations.push(donation);
    }

    details.push(person)
  }

  console.log(details)
  return details
}




export default function View() {
  const [open, setOpen] = useState(-1);
  
  fetchDetails();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Expand</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>SBN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((person, index) => (
            <React.Fragment key={index}>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <IconButton onClick={()=>{setOpen(open === index ? -1 : index)}}>
                    { open == index ? <KeyboardArrowUp/> : <KeyboardArrowDown/> }
                  </IconButton>  
                </TableCell>
                <TableCell>{person.fname}</TableCell>
                <TableCell>{person.lname}</TableCell>
                <TableCell>{person.sbn}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell colSpan={4} sx={{paddingTop: 0, paddingBottom: 0}}>
                  <Collapse in={open == index} timeout='auto' unmountOnExit>
                    <Typography variant='h5' sx={{marginTop: 4, marginBottom: 1}}>Additional Details</Typography>
                    <DisplayAdditionalDetails person={person}/>
                    <Typography variant='h5' sx={{marginTop: 4, marginBottom: 1}}>Donation Details</Typography>
                    <DisplayDonations donations={person.donations}/>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
