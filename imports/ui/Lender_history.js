import * as React from "react";
import { useState } from "react"; // Import useState hook
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Button } from "@mui/material";
import { transaction } from "../api/borrower";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import { useEffect } from "react";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Lender_history() {
  function onError(error) {
    console.error(error);
  }
  const [email, setUserEmail] = useState("");

  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, []);
  const rows = useFind(() => transaction.find());

  const handlePayClick = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
    console.log("Row removed:", index);
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>To</StyledTableCell>
              <StyledTableCell>Amount &nbsp;(₹)</StyledTableCell>
              <StyledTableCell>Interest &nbsp;(%)</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                {row.status === "Approved" && row.paidBy === email && (
                  <>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.Principle}</StyledTableCell>
                    <StyledTableCell>{row.ROI}</StyledTableCell>
                    <StyledTableCell>{row.Time}</StyledTableCell>
                  </>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
