import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import { details } from './constants'
import { Box, Collapse, Divider, IconButton, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ArticleIcon from '@mui/icons-material/Article';

import { useState } from 'react';

function DisplayDetails({person}) {
  return (
    <Paper sx={{marginY: 2}}>
      <List sx={{ width: '100%'}}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOnIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Address" secondary={person.address} />
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Beneficiary" secondary={person.beneficiary} />
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary={person.email} />
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CreditCardIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Pan" secondary={person.pan} />
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalPhoneIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Contact" secondary={person.contact} />
        </ListItem>
        <Divider/>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ArticleIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="SBN" secondary={person.sbn} />
        </ListItem>
      </List>
    </Paper>
  )
}

function DisplayDonations({donations}) {
  return (
    <TableContainer component={Paper} sx={{marginBottom: 4}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Payment Mode</TableCell>
            <TableCell>Reciept No</TableCell>
            <TableCell>Purpose</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donations.map((donation, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{donation.date}</TableCell>
              <TableCell>{donation.amount}</TableCell>
              <TableCell>{donation.paymentMode}</TableCell>
              <TableCell>{donation.recieptNo}</TableCell>
              <TableCell>{donation.purpose}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function View() {
  const [open, setOpen] = useState(-1);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>A</TableCell>
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
                    <DisplayDetails person={person}/>
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
