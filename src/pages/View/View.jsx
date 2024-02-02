import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { details } from './constants'
import { Box, Collapse, IconButton } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import { useState } from 'react';

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
              <TableRow>
                <TableCell>
                  <IconButton onClick={()=>{setOpen(open === index ? -1 : index)}}>
                    { open == index ? <KeyboardArrowUp/> : <KeyboardArrowDown/> }
                  </IconButton>  
                </TableCell>
                <TableCell>{person.fname}</TableCell>
                <TableCell>{person.lname}</TableCell>
                <TableCell>{person.sbn}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} sx={{paddingTop: 0, paddingBottom: 0}}>
                  <Collapse in={open == index} timeout='auto' unmountOnExit>
                    <Box>
                      Its me
                    </Box>
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
