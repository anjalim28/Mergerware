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
import { Meteor } from "meteor/meteor";

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

export default function Lender_main() {
  const rows = useFind(() => transaction.find());
  const [email, setUserEmail] = useState("");
  function onError(error) {
    console.error(error);
  }

  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, []);

  const handlePayClick = (_id) => {
    Meteor.call("transaction.update", { _id, email }, (err, res) => {
      if (err) {
        onError(err);
      } else {
        onSubmitted(res);
      }
    });
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Asked by</StyledTableCell>
              <StyledTableCell>Amount &nbsp;(₹)</StyledTableCell>
              <StyledTableCell>Interest &nbsp;(%)</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                {row.status !== "Approved" && (
                  <>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.Principle}</StyledTableCell>
                    <StyledTableCell>{row.ROI}</StyledTableCell>
                    <StyledTableCell>{row.Time}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        onClick={() => handlePayClick(row._id)}
                        variant="contained"
                        color="primary"
                      >
                        Pay
                      </Button>
                    </StyledTableCell>
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
