import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

const GlobalContextProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [patientDetails, setPatientDetails] = useState({});
  const [givenMedicines, setGivenMedicines] = useState([]);

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
