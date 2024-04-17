import React from "react";
import { useState, useEffect } from "react";
import { changeTab, setSbn } from "../../store/index";
import { connect } from "react-redux";
import { scrollToTop } from "../../utils/scrollToTop";
import { fetchDetails } from "./utils";
import db from "../../backend/database";

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
import Button from "@mui/material/Button";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { Box, Pagination } from "@mui/material";

export function SearchRecords(props) {
  return (
    <>
      <Stack direction={"row"} pb={3} spacing={2}>
        <TextField
          label={"Search " + props.searchAttribute}
          variant="outlined"
          type="text"
          fullWidth={true}
          onChange={(e) => props.setSearchKey(e.target.value.toLowerCase())}
        />
        <TextField
          select
          label={"Select"}
          value={props.searchAttribute}
          sx={{ minWidth: 200 }}
          onChange={(e) => props.setSearchAttribute(e.target.value)}
        >
          <MenuItem value="fname">First Name</MenuItem>
          <MenuItem value="lname">Last Name</MenuItem>
          <MenuItem value="sbn">SBN</MenuItem>
        </TextField>
      </Stack>
    </>
  );
}

function View(props) {
  let count = 0;
  const noOfRecords = 10;

  const [open, setOpen] = useState(-1);
  const [searchAttribute, setSearchAttribute] = useState("fname");
  const [searchKey, setSearchKey] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const query = searchKey
      ? `SELECT * FROM person where ${searchAttribute} like '%${searchKey}%' and isDeleted = 'false' ORDER BY fname ASC`
      : "SELECT * FROM person where isDeleted = 'false' ORDER BY fname ASC";
    fetchDetails(db, query).then((details) => {
      setData(details);
      setTotalPages(Math.ceil(details.length / noOfRecords));
    });
  }, [searchAttribute, searchKey, currentPage]);

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <Heading title={"Search Records"} />
      <SearchRecords
        setSearchAttribute={setSearchAttribute}
        setSearchKey={setSearchKey}
        searchAttribute={searchAttribute}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              {['Expand', 'First Name', 'Last Name', 'SBN'].map((text, index) => (
                <TableCell key={index} sx={{ color: "white", fontWeight: "bold" }}>
                  {text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((person, index) => {
              return (
                index >= (currentPage - 1) * noOfRecords &&
                index < currentPage * noOfRecords && (
                  <React.Fragment key={index}>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        backgroundColor: index % 2 === 1 ? "#f4f4f4" : "white",
                      }}
                    >
                      <TableCell sx={{ padding: 1 }}>
                        <IconButton
                          onClick={() => {
                            setOpen(open === index ? -1 : index);
                          }}
                        >
                          {open == index ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{person.fname}</TableCell>
                      <TableCell>{person.lname}</TableCell>
                      <TableCell>{person.sbn}</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        border: open === index ? "2px solid #4d4d4d52" : "",
                      }}
                    >
                      <TableCell
                        colSpan={4}
                        sx={{ paddingTop: 0, paddingBottom: 0 }}
                      >
                        <Collapse
                          in={open == index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Typography
                            variant="h5"
                            sx={{ marginTop: 3, marginBottom: 2 }}
                          >
                            Donation Details
                          </Typography>
                          <DisplayDonations donations={person.donations} />
                          <Typography
                            variant="h5"
                            sx={{ marginTop: 4, marginBottom: 2 }}
                          >
                            Additional Details
                          </Typography>
                          <DisplayAdditionalDetails person={person} />
                          <Button
                            variant="contained"
                            fullWidth={true}
                            sx={{ marginBottom: 2 }}
                            disableElevation
                            onClick={() => {
                              props.setSbn(person.sbn);
                              props.changeTab("edit");
                            }}
                          >
                            Edit Record
                          </Button>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                )
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => {
            setCurrentPage(value);
          }}
        />
      </Box>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tab: state.tab.tab,
    sbn: state.sbn.sbn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTab: (tab) => {
      dispatch(changeTab(tab));
    },
    setSbn: (sbn) => {
      dispatch(setSbn(sbn));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
