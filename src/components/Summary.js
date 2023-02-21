import { styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalContextProvider";

// used styled components

const Span = styled("span")`
  margin: 0 5px;
`;

// Component to show the summary of total patient's conditions

const Summary = () => {
  let SummarizedData = {
    healthy: [],
    dead: [],
    diabetes: [],
    fever: [],
    tuberculosis: [],
  };
  const { patients } = useContext(GlobalContext); // Imported context from global context provider
  const [summary, setSummary] = useState(SummarizedData);

  // Function to set data as per patients condition

  useEffect(() => {
    let tempFever, tempDiabetes, tempDead, tempTuber, tempHealthy;
    patients?.forEach((patient) => {
      if (patient.condition === "F") {
        tempFever = SummarizedData.fever.push(patient);
      }
      if (patient.condition === "D") {
        tempDiabetes = SummarizedData.diabetes.push(patient);
      }
      if (patient.condition === "X") {
        tempDead = SummarizedData.dead.push(patient);
      }
      if (patient.condition === "T") {
        tempTuber = SummarizedData.tuberculosis.push(patient);
      }
      if (patient.condition === "H") {
        tempHealthy = SummarizedData.healthy.push(patient);
      }
    });
    setSummary({
      fever: tempFever,
      diabetes: tempDiabetes,
      dead: tempDead,
      tuberculosis: tempTuber,
      healthy: tempHealthy,
    });
  }, [patients]);

  return (
    <div>
      <Span>
        H: <strong> {summary?.healthy ? summary?.healthy : 0} </strong>
      </Span>
      <Span>
        F: <strong> {summary?.fever ? summary?.fever : 0}</strong>
      </Span>
      <Span>
        T:
        <strong> {summary?.tuberculosis ? summary?.tuberculosis : 0}</strong>
      </Span>
      <Span>
        D: <strong> {summary?.diabetes ? summary?.diabetes : 0}</strong>
      </Span>
      <Span>
        X: <strong> {summary?.dead ? summary?.dead : 0}</strong>
      </Span>
    </div>
  );
};

export default Summary;
