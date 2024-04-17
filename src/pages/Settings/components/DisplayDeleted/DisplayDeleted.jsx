import React from "react";
import { useState, useEffect } from "react";
import db from "../../../../backend/database";
import DialogBox from "../../../../components/Dialog/Dialog";
import { reload } from "../Database/utils";
import { SearchRecords } from "../../../View/View";
import { fetchDetails } from "../../../View/utils";

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
  let count = 0;
  const [searchAttribute, setSearchAttribute] = useState("fname");
  const [searchKey, setSearchKey] = useState("");
  const [data, setData] = useState([]);
  const [sbn, setSbn] = useState(-1);
  const [reload, setReload] = useState(true);
  const [dialogData, setDialogData] = useState({
    open: false,
    title: "",
    msg: "",
  });
  useEffect(() => {
    const escapedSearchKey = searchKey
      ? searchKey.replace(/['"]/g, (match) => `${match}${match}`)
      : null;
    const query = escapedSearchKey
      ? `SELECT * FROM person WHERE ${searchAttribute} LIKE '%${escapedSearchKey}%' AND isDeleted = 'true' ORDER BY fname ASC`
      : "SELECT * FROM person WHERE isDeleted = 'true' ORDER BY fname ASC";

    fetchDetails(db, query).then((details) => {
      setData(details);
    });
  }, [searchAttribute, searchKey, reload]);

  async function handleRestore(sbn) {
    await db.execute(
      `UPDATE person SET isDeleted = 'false' WHERE sbn = ${sbn}`
    );
    setReload(!reload);
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
    await db.execute(`DELETE FROM person WHERE sbn = ${sbn}`);
    await db.execute(`DELETE FROM donation WHERE sbn = ${sbn}`);
    setDialogData({
      ...dialogData,
      open: false,
    });
    setReload(!reload);
  }

  return (
    <>
      <SearchRecords
        setSearchAttribute={setSearchAttribute}
        setSearchKey={setSearchKey}
        searchAttribute={searchAttribute}
      />
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
            {data.map((person, index) => {
              return (
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogBox
        color={"error"}
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
