import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@material-ui/core/Select";
import { transaction } from "../api/borrower";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import PreviousAsk from "./PreviousAsk";
import { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";

const defaultTheme = createTheme();

export default function Borrower() {
  const borrower = useFind(() => transaction.find());
  const [email, setUserEmail] = useState("");

  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, []);
  const onError = (error) => {
    // Handle the error here
    console.error(error);
  };
  const handleSubmit = (event) => {
    console.log(borrower);
    const data = new FormData(event.currentTarget);
    const Principle = data.get("Principle");
    const ROI = data.get("ROI");
    const Time = data.get("Time");
    Meteor.call(
      "transaction.create",
      { email, Principle, ROI, Time },
      (err, res) => {
        if (err) {
          onError(err);
        } else {
          onSubmitted(res);
        }
      }
    );

    console.log(Principle);
    event.preventDefault();
  };
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container style={{ textAlign: "right" }}>
        <div>{email}</div>
        <Button
          variant="contained"
          onClick={() => (window.location.href = "/")}
        >
          Logout
        </Button>
      </Container>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <CurrencyRupeeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ask For Loan
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Principle"
                  label="Principle"
                  name="Principle"
                  autoComplete="Principle"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="ROI"
                  label="ROI"
                  type="ROI"
                  id="ROI"
                  autoComplete="ROI"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Time"
                  label="Time"
                  type="Number"
                  id="Time"
                  autoComplete="Time"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ask For Loan
            </Button>
          </Box>
        </Box>
      </Container>
      <PreviousAsk />
    </ThemeProvider>
  );
}
