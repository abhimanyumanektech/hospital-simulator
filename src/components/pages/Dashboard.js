import React, { useContext } from "react";
import SelectPatient from "../SelectPatient/SelectPatient";
import { Box, styled } from "@mui/material";
import PatientDetails from "../PatientDetails/PatientDetails";
import { GlobalContext } from "../context/GlobalContextProvider";

// used styled components

const Wrapper = styled(Box)`
  padding: 20px;
`;

// Component for main home page

const Dashboard = () => {
  const { patientDetails } = useContext(GlobalContext); // Imported context from global context provider
  return (
    <Wrapper>
      {/* Select patient component */}
      <SelectPatient />
      {/* condition to show patient details when we select a patient */}
      {Object.keys(patientDetails).length > 0 && <PatientDetails />}
    </Wrapper>
  );
};

export default Dashboard;
