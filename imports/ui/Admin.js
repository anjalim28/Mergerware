import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { Meteor } from "meteor/meteor";
import { useState, useEffect } from "react";
import { transaction } from "../api/borrower";
import { useFind, useSubscribe } from "meteor/react-meteor-data";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function Admin() {
  const [email, setUserEmail] = useState("");
  const rows = useFind(() => transaction.find());
  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, []);

  return (
    <Container>
      <Container style={{ textAlign: "right" }}>
        <div sx={{ m: 1 }}>{email}</div>
        <Button
          variant="contained"
          onClick={() => (window.location.href = "/")}
        >
          Logout
        </Button>
      </Container>
      <div>
        <h2>Welcome Admin</h2>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
              <StyledTableCell>Asked By</StyledTableCell>
              <StyledTableCell>Amount &nbsp;(₹)</StyledTableCell>
              <StyledTableCell>Interest &nbsp;(%)</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right">Moneylender</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                {/* <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell> */}
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.Principle}</StyledTableCell>
                <StyledTableCell>{row.ROI}</StyledTableCell>
                <StyledTableCell>{row.Time}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell align="right">{row.paidBy}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
