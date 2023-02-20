import React, { useContext, useEffect } from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContextProvider";
import { getPatients } from "../utils/GetListofPatients";

const SelectPatient = () => {
  const {
    patients,
    setPatients,
    selectedPatient,
    setSelectedPatient,
    setPatientDetails,
    setGivenMedicines,
  } = useContext(GlobalContext);

  const getDetails = async (id) => {
    if (id !== "") {
      await axios.get(`http://localhost:4000/patients/${id}`).then((res) => {
        console.log(res, "resss");
        setPatientDetails(res.data);
        setGivenMedicines(res.data.given_medicine);
      });
    }
  };

  useEffect(() => {
    getPatients()
      .then((data) => {
        if (data) {
          setPatients(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log(patientDetails, "patientDetails");
  // }, [patientDetails]);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-label"
          style={{ background: "#fff" }}
        >
          Select Patient
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedPatient}
          label="Age"
          onChange={(e) => {
            setSelectedPatient(e.target.value);
            getDetails(e.target.value);
          }}
        >
          <MenuItem value={""} selected>
            Select Patient
          </MenuItem>
          {patients.map((patient) => (
            <MenuItem key={patient.id} value={patient.id}>
              {patient.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectPatient;
