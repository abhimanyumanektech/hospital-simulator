import { styled } from "@mui/material";
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import GiveMedicine from "./GiveMedicine";

const Table = styled("table")`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-collapse: collapse;
  margin-top: 20px;
`;

const PatientChart = () => {
  const { givenMedicines } = useContext(GlobalContext);

  return (
    <>
      <GiveMedicine />
      <Table className="chart_table">
        <thead>
          <tr>
            <th className="date">Date</th>
            <th className="med">Give Medicine</th>
            <th className="cond">Condition</th>
          </tr>
        </thead>
        <tbody>
          {givenMedicines.length > 0 ? (
            <>
              {givenMedicines.map((medicine) => {
                return (
                  <tr key={medicine.date}>
                    <td className="date">{medicine.date}</td>
                    <td className="med">
                      {medicine.medicine === "P"
                        ? "Paracetamol"
                        : medicine.medicine === "I"
                        ? "Insulin"
                        : medicine.medicine === "As"
                        ? "Aspirin"
                        : medicine.medicine === "An"
                        ? "Antibiotic"
                        : ""}
                    </td>
                    <td
                      className={`${
                        medicine.condition === "X"
                          ? "cond dead"
                          : medicine.condition === "H"
                          ? "cond healthy"
                          : medicine.condition === "T"
                          ? "cond tuber"
                          : "cond"
                      }`}
                    >
                      <span>
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
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td colSpan={3} className="date">
                No medicines given yet.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default PatientChart;
