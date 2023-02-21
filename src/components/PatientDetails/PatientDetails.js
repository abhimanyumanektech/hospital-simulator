import { Box, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import PatientChart from "../PatientChart/PatientChart";

// used styled components

const Wrapper = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.23);
  padding: 15px;
  border-radius: 3px;
  margin-top: 20px;
`;

const PatientName = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
`;

const Condition = styled(Typography)`
  font-size: 16px;
  text-align: center;
  margin-top: 2px;
`;

const Medicines = styled(Typography)`
  font-size: 16px;
  text-align: center;
  margin-top: 5px;
`;

const Doses = styled(Typography)`
  font-size: 16px;
  text-align: center;
  margin-top: 5px;
`;

// Component to show the patient details

const PatientDetails = () => {
  const { patientDetails } = useContext(GlobalContext); // Imported context from global context provider
  const [condition, setCondition] = useState("");
  const [suggestedM, setSuggestedM] = useState("");

  // Getting the full name of patient condition with condition shortcode

  const getCondition = () => {
    if (patientDetails.condition === "F") {
      setCondition("Fever");
      return;
    }
    if (patientDetails.condition === "H") {
      setCondition("Healthy");
      return;
    }
    if (patientDetails.condition === "D") {
      setCondition("Diabetes");
      return;
    }
    if (patientDetails.condition === "T") {
      setCondition("Tuberculosis");
      return;
    }
    if (patientDetails.condition === "X") {
      setCondition("Dead");
      return;
    }
  };

  // Getting the full name of patient medicines with medicines shortcode

  const getSuggestedMedicines = () => {
    if (patientDetails.suggested_medicine === "As") {
      setSuggestedM("Aspirin");
      return;
    }
    if (patientDetails.suggested_medicine === "An") {
      setSuggestedM("Antibiotic");
      return;
    }
    if (patientDetails.suggested_medicine === "I") {
      setSuggestedM("Insulin");
      return;
    }
    if (patientDetails.suggested_medicine === "P") {
      setSuggestedM("Paracetamol");
      return;
    }
  };

  useEffect(() => {
    if (Object.keys(patientDetails).length > 0) {
      getCondition();
      getSuggestedMedicines();
    }
  }, [patientDetails]);

  return (
    <>
      <Typography sx={{ mt: 4 }}>Patient Details</Typography>
      <Wrapper>
        <PatientName variant="h6">{patientDetails.name}</PatientName>
        <Condition variant="body1">
          Illness: <strong> {condition} </strong>
        </Condition>
        <Medicines variant="body1">
          Suggested Medicines: <strong> {suggestedM} </strong>
        </Medicines>
        <Doses variant="body1">
          Doses:{" "}
          <strong>
            {patientDetails.dose === 0
              ? "Everyday"
              : patientDetails.dose + " Days"}
          </strong>
        </Doses>
        {/* Component to show patients chart  */}
        <PatientChart />
      </Wrapper>
    </>
  );
};

export default PatientDetails;
