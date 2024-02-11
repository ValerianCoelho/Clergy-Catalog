import React from "react";
import { useState, useEffect } from "react";
import db from "../../../../backend/database";
import DialogBox from "../../../../components/Dialog/Dialog";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function DisplayDeleted() {
  const [data, setData] = useState([]);
  const [sbn, setSbn] = useState(-1);
  const [restored, setRestored] = useState(true);
  const [dialogData, setDialogData] = useState({
    open: false,
    title: "",
    msg: "",
  });

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

  const handleCloseDialog = () => {
    setDialogData({
      ...dialogData,
      open: false,
    });
  };

  const handleOpenDialog = () => {
    setDialogData({
      open: true,
      title: "Delete Forever",
      msg: "Once Deleted The Record Cannot be Restored",
    });
  };

  async function handleDelete() {
    console.log("Hello");
    await db.execute(`DELETE FROM person WHERE sbn = ${sbn}`);
    await db.execute(`DELETE FROM donation WHERE sbn = ${sbn}`);
    setDialogData({
      ...dialogData,
      open: false,
    });
  }

  return (
    <>
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
              <TableCell
                sx={{ color: "white", fontWeight: "bold" }}
                align="center"
              >
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
                      <TableCell width={1}>
                        <Stack
                          direction={"row"}
                          spacing={2}
                          justifyContent={"center"}
                        >
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
                            onClick={() => {
                              handleOpenDialog();
                              setSbn(person.sbn);
                            }}
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
      <DialogBox
        title={dialogData.title}
        msg={dialogData.msg}
        open={dialogData.open}
        option1={"Cancel"}
        option2={"Delete Forever"}
        handleOption1={handleCloseDialog}
        handleOption2={handleDelete}
        variant={"multiple"}
      />
    </>
  );
}

export default DisplayDeleted;
