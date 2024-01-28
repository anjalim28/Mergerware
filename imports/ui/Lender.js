import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Lender_history from "./Lender_history";
import Lender_main from "./Lender_main";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
function Lender() {
  const [alignment, setAlignment] = React.useState("Main");
  const [email, setUserEmail] = useState("");

  useEffect(() => {
    setUserEmail(localStorage.getItem("email"));
  }, []);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const defaultTheme = createTheme();
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container style={{ textAlign: "right" }}>
          <div sx={{ m: 1 }}>{email}</div>
          <Button
            variant="contained"
            onClick={() => (window.location.href = "/")}
          >
            Logout
          </Button>
        </Container>
        <Container align="center">
          <ToggleButtonGroup
            sx={{ m: 1 }}
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="Main">Main</ToggleButton>
            <ToggleButton value="History">History</ToggleButton>
          </ToggleButtonGroup>
          {alignment === "History" ? (
            <div>
              <Lender_history />
            </div>
          ) : (
            <div>
              <Lender_main />
            </div>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Lender;
