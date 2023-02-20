import React, { useContext } from "react";
import SelectPatient from "../SelectPatient/SelectPatient";
import { Box, styled } from "@mui/material";
import PatientDetails from "../PatientDetails/PatientDetails";
import { GlobalContext } from "../context/GlobalContextProvider";

const Wrapper = styled(Box)`
  padding: 20px;
`;

const Dashboard = () => {
  const { patientDetails } = useContext(GlobalContext);
  return (
    <Wrapper>
      <SelectPatient />
      {Object.keys(patientDetails).length > 0 && <PatientDetails />}
    </Wrapper>
  );
};

export default Dashboard;
