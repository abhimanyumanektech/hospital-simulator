import { createContext, useState } from "react";

// Created context for global state management and exported.

export const GlobalContext = createContext(null);

const GlobalContextProvider = ({ children }) => {
  const [patients, setPatients] = useState([]); // To store all the patients from api
  const [selectedPatient, setSelectedPatient] = useState(""); // To store patient when we select from home screen
  const [patientDetails, setPatientDetails] = useState({}); // To store selected patient's details
  const [givenMedicines, setGivenMedicines] = useState([]); // To store selected patient's given medicine on daily basis

  return (
    <GlobalContext.Provider
      value={{
        patients,
        setPatients,
        selectedPatient,
        setSelectedPatient,
        patientDetails,
        setPatientDetails,
        givenMedicines,
        setGivenMedicines,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
