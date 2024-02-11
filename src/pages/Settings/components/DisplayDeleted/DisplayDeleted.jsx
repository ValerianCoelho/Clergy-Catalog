import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
} from "@mui/material";
import React from "react";
import { data } from "../../../View/constants";
import { useState, useEffect } from "react";
import db from "../../../../backend/database";

import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function DisplayDeleted() {
  const [data, setData] = useState([]);
  const [restored, setRestored] = useState(true);

  useEffect(() => {
    if (restored) {
      fetchDetails();
      setRestored(false);
    }
  }, [restored]);

  async function fetchDetails() {
    try {
      const people = await db.select("SELECT * FROM person");

      // Create an array of promises for fetching donations
      const donationPromises = people.map((person) =>
        db.select(`SELECT * FROM donation WHERE sbn=${person.sbn}`)
      );

      // Wait for all donation promises to resolve
      const donationsList = await Promise.all(donationPromises);

      // Combine person and donation data
      const details = people.map((person, index) => ({
        ...person,
        donations: donationsList[index],
      }));
      // console.log("Hello", details)

      setData(details);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  }

  async function handleRestore(sbn) {
    await db.execute(
      `UPDATE person SET isDeleted = 'false' WHERE sbn = ${sbn}`
    );
    setRestored(true);
  }

  return (
    <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "black" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              First Name
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Last Name
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              SBN
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            (person, index) =>
              person.isDeleted !== "false" && (
                <React.Fragment key={index}>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: index % 2 === 1 ? "#f4f4f4" : "white",
                    }}
                  >
                    <TableCell>{person.fname}</TableCell>
                    <TableCell>{person.lname}</TableCell>
                    <TableCell>{person.sbn}</TableCell>
                    <TableCell>
                      <Stack direction={"row"} spacing={2}>
                        <Button
                          variant="outlined"
                          color="success"
                          disableElevation
                          startIcon={<RestoreFromTrashIcon />}
                          onClick={() => handleRestore(person.sbn)}
                        >
                          Restore
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          disableElevation
                          startIcon={<DeleteForeverIcon />}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplayDeleted;
