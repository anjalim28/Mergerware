import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@material-ui/core/Select";
import { LinksCollection } from "../api/borrower";
import { useFind, useSubscribe } from "meteor/react-meteor-data";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https:/getHelp.com/">
        getHelp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const borrower = useFind(() => LinksCollection.find());
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("Role") == "Borrower") {
      const email = data.get("email");
      const password = data.get("password");
      const role = data.get("Role");
      localStorage.setItem("email", email);
      Meteor.call("borrower.create", { email, password, role }, (err, res) => {
        if (err) {
          onError(err);
        } else {
          onSubmitted(res);
        }
      });
      window.location.href = "/Borrower";
    } else if (data.get("Role") == "Admin") {
      window.location.href = "/Admin";
    } else if (data.get("Role") == "Lender") {
      window.location.href = "/Lender";
    }
  };
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                Choose your role:
                <Select
                  name="Role"
                  type="Dropdown"
                  autoComplete="new-password"
                  labelId="demo-simple-select-label"
                  id="Role"
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value={"Borrower"}>Borrower</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"Lender"}>Lender</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* <ul>
        {borrower.map((link) => (
          <li key={link._id}>
            <p target="_blank">{link.email}</p>
            <p target="_blank">{link.password}</p>
            <p target="_blank">{link.role}</p>
          </li>
        ))}
      </ul> */}
    </ThemeProvider>
  );
}
