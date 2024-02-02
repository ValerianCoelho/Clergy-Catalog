import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { details } from './constants'

export default function View() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>SBN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((person, index) => (
            <TableRow key={index}>
              <TableCell>{person.fname}</TableCell>
              <TableCell>{person.lname}</TableCell>
              <TableCell>{person.sbn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
