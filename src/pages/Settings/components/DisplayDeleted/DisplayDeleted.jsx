import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { data } from '../../../View/constants'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DisplayDeleted() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>SBN</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((person, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{person.fname}</TableCell>
              <TableCell>{person.lname}</TableCell>
              <TableCell>{person.sbn}</TableCell>
              <TableCell>
                <IconButton>
                  <RestoreFromTrashIcon color='success' fontSize='large'/>
                </IconButton>
                <IconButton>
                  <DeleteForeverIcon color='error' fontSize='large'/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DisplayDeleted;