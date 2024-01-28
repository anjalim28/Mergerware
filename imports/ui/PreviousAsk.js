import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { transaction } from "../api/borrower";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { useState, useEffect } from "react";
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

export default function PreviousAsk() {
  const rows = useFind(() => transaction.find());
  const [email, setUserEmail] = useState("");
  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, []);
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Dessert (100g serving)</StyledTableCell> */}
              <StyledTableCell>Amount &nbsp;(₹)</StyledTableCell>
              <StyledTableCell>Interest &nbsp;(%)</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) =>
              row.email === email ? (
                <StyledTableRow key={row.name}>
                  {/* <StyledTableCell component="th" scope="row">
        {row.name}
      </StyledTableCell> */}
                  <StyledTableCell>{row.Principle}</StyledTableCell>
                  <StyledTableCell>{row.Time}</StyledTableCell>
                  <StyledTableCell>{row.ROI}%</StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                </StyledTableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
