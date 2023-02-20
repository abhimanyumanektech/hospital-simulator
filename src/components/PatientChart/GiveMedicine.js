import { styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContextProvider";
import toast from "react-hot-toast";

const SelectMedicine = styled("select")`
  padding: 1px 3px;
`;

const Form = styled("form")`
  margin-top: 20px;
  text-align: center;
`;

const GiveMedicine = () => {
  const [medicine, setMedicine] = useState("");
  const [condition, setCondition] = useState("");
  const [conditionDisabled, setConditionDisabled] = useState(false);
  const [date, setDate] = useState(moment().format("DD-MM-YYYY"));
  const { selectedPatient, givenMedicines, setGivenMedicines, patientDetails } =
    useContext(GlobalContext);

  const handlePatientCondition = (medicine) => {
    if (patientDetails.suggested_medicine === "I" && medicine !== "I") {
      if (medicine === "An") {
        toast.error(
          `Required medicine for ${patientDetails.name} is Insulin. If you are giving Antibiotics then, Patient can suffer from fever.`
        );
        setCondition("F");
        setConditionDisabled(true);
      } else {
        toast.error(`Required medicine for ${patientDetails.name} is Insulin.`);
        setConditionDisabled(false);
      }
    }
    if (patientDetails.suggested_medicine === "P" && medicine !== "P") {
      if (medicine === "As") {
        toast.error(
          `Required medicine for ${patientDetails.name} is Paracetamol. If you are giving Aspirin then, Patient can be died.`
        );
        setCondition("X");
        setConditionDisabled(true);
      } else {
        toast.error(
          `Required medicine for ${patientDetails.name} is Paracetamol.`
        );
        setConditionDisabled(false);
      }
    }
    if (patientDetails.suggested_medicine === "As" && medicine !== "As") {
      toast.error(`Required medicine for ${patientDetails.name} is Aspirin.`);
    }
    if (patientDetails.suggested_medicine === "An" && medicine !== "An") {
      toast.error(
        `Required medicine for ${patientDetails.name} is Antibiotics.`
      );
    }
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    let data = {
      date: moment(date, "YYYY-MM-DD").format("DD-MM-YYYY"),
      medicine,
      condition,
    };
    await axios
      .patch(`http://localhost:4000/patients/${selectedPatient}`, {
        given_medicine: [...givenMedicines, data],
      })
      .then((res) => {
        if (res) {
          setGivenMedicines(res.data.given_medicine);
          setCondition("");
          setDate(moment().format("DD-MM-YYYY"));
          setMedicine("");
          setConditionDisabled(false);
        }
        console.log(res, "jfbskfjdsbsdbf");
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(data, "data to send");
  };

  return (
    <Form>
      <Typography sx={{ mb: 1 }}>
        <strong>Add a dose of given medicine</strong>
      </Typography>
      <input
        type="date"
        value={date}
        placeholder="dd-mm-yyyy"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <SelectMedicine
        value={medicine}
        onChange={(e) => {
          setMedicine(e.target.value);
          handlePatientCondition(e.target.value);
        }}
      >
        <option value="" selected>
          Select Medicine
        </option>
        <option value="As">As</option>
        <option value="An">An</option>
        <option value="I">I</option>
        <option value="P">P</option>
      </SelectMedicine>
      <SelectMedicine
        value={condition}
        onChange={(e) => {
          setCondition(e.target.value);
        }}
        disabled={conditionDisabled}
      >
        <option value="" selected>
          Select Patient Condition
        </option>
        <option value="F">F</option>
        <option value="H">H</option>
        <option value="D">D</option>
        <option value="T">T</option>
        <option value="X">X</option>
      </SelectMedicine>
      <button type="submit" onClick={handleSubmitData}>
        Give
      </button>
    </Form>
  );
};

export default GiveMedicine;
