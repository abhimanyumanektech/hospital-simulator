import React, { useState } from "react";
import { Typography, styled, Grid, Button, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import AddPatientDialog from "./AddPatient/AddPatient";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Summary from "./Summary";

const HeaderTitle = styled(Typography)`
  font-size: 30px;
  font-weight: 700;
`;

const HeaderMain = styled("header")`
  padding: 20px;
`;

const AddPatient = styled(Button)`
  font-size: 16px;
  margin-left: 15px;
`;

const ListOfPatients = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 600;
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpenPopup = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleGoToHome = () => {
    navigate("/");
  };
  return (
    <HeaderMain>
      <Grid
        container
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
      >
        <HeaderTitle style={{ cursor: "pointer" }} onClick={handleGoToHome}>
          Hospital Simulator
        </HeaderTitle>
        <Summary />
        <Box>
          <ListOfPatients to="/list">List of Patients</ListOfPatients>
          <AddPatient variant="contained" onClick={handleOpenPopup}>
            <Add fontSize="small" /> Add Patient
          </AddPatient>
        </Box>
        <AddPatientDialog open={open} handleClose={handleClose} />
      </Grid>
    </HeaderMain>
  );
};

export default Header;
