import { Delete } from "@mui/icons-material";
import { Box, IconButton, styled } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { getPatients } from "../utils/GetListofPatients";
import toast from "react-hot-toast";

// used styled components

const Wrapper = styled(Box)`
  padding: 20px;
`;

const Table = styled("table")`
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-collapse: collapse;
  width: 100%;
`;

// Component to list out all the patient

const ListOfPatients = () => {
  const { patients, setPatients } = useContext(GlobalContext); // Imported context from global context provider

  // Getting all patients and setting in context

  useEffect(() => {
    if (patients.length === 0) {
      getPatients()
        .then((data) => {
          setPatients(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // To delete patient record from the db

  const handleDeleteRecord = async (id) => {
    await axios
      .delete(`http://localhost:4000/patients/${id}`)
      .then((res) => {
        if (res) {
          toast.success("Record deleted successfully.");
          axios
            .get("http://localhost:4000/patients")
            .then((resInner) => {
              setPatients(resInner.data);
            })
            .catch((errInner) => {
              console.log(errInner);
            });
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Wrapper>
      {/* Table to show list of patient starts */}
      <Table className="chart_table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Condition</th>
            <th>Suggested Medicine</th>
            <th>Dose (In Days)</th>
            <th>Given Medicine</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients?.length > 0 && (
            <>
              {patients.map((patient) => {
                return (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
                    <td>
                      {patient.condition === "F"
                        ? "Fever"
                        : patient.condition === "H"
                        ? "Healthy"
                        : patient.condition === "X"
                        ? "Dead"
                        : patient.condition === "D"
                        ? "Diabetes"
                        : patient.condition === "T"
                        ? "Tuberculosis"
                        : ""}
                    </td>
                    <td>
                      {patient.suggested_medicine === "P"
                        ? "Paracetamol"
                        : patient.suggested_medicine === "I"
                        ? "Insulin"
                        : patient.suggested_medicine === "As"
                        ? "Aspirin"
                        : patient.suggested_medicine === "An"
                        ? "Antibiotic"
                        : ""}
                    </td>
                    <td>
                      {patient.condition === "D"
                        ? "Everyday"
                        : patient.dose + " Days"}
                    </td>
                    <td>
                      {patient.given_medicine.length > 0 ? (
                        <>
                          {patient.given_medicine.map((medicine) => {
                            return (
                              <div key={medicine.medicine}>
                                <span>
                                  {medicine.date} :{" "}
                                  {medicine.medicine === "P"
                                    ? "Paracetamol"
                                    : medicine.medicine === "I"
                                    ? "Insulin"
                                    : medicine.medicine === "As"
                                    ? "Aspirin"
                                    : medicine.medicine === "An"
                                    ? "Antibiotic"
                                    : ""}{" "}
                                  :{" "}
                                  {medicine.condition === "F"
                                    ? "Fever"
                                    : medicine.condition === "H"
                                    ? "Healthy"
                                    : medicine.condition === "X"
                                    ? "Dead"
                                    : medicine.condition === "D"
                                    ? "Diabetes"
                                    : medicine.condition === "T"
                                    ? "Tuberculosis"
                                    : ""}
                                </span>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        " - "
                      )}
                    </td>
                    <td>
                      <IconButton
                        title="Delete record"
                        onClick={() => handleDeleteRecord(patient.id)}
                      >
                        <Delete fontSize="16px" />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default ListOfPatients;
