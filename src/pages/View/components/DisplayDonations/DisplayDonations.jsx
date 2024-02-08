import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useEffect } from "react";

function DisplayDonations({ donations }) {
  useEffect(() => {
    console.log("Hello", donations)
  }, []);
  return (
    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
      <Table>
        <TableHead sx={{backgroundColor: "#616161"}}>
          <TableRow>
            <TableCell sx={{color: 'white'}}>Date</TableCell>
            <TableCell sx={{color: 'white'}}>Amount</TableCell>
            <TableCell sx={{color: 'white'}}>Payment Mode</TableCell>
            <TableCell sx={{color: 'white'}}>Reciept No</TableCell>
            <TableCell sx={{color: 'white'}}>Purpose</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donations && donations.map((donations, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: index % 2 === 1 ? "#f4f4f4" : "white",
              }}
            >
              <TableCell>{donations.date}</TableCell>
              <TableCell>{donations.amount}</TableCell>
              <TableCell>{donations.paymentMode}</TableCell>
              <TableCell>{donations.receipt}</TableCell>
              <TableCell>{donations.purpose}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplayDonations;
