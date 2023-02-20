import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import toast from "react-hot-toast";

const DialogContentWrapper = styled(DialogContent)`
  padding: 15px 24px 5px !important;
  width: 400px;
`;

const AddPatientDialog = ({ open, handleClose }) => {
  const { patients, setPatients } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [sugg_med, setSugg_med] = useState("");
  const [dose, setDose] = useState(0);

  const handleCancelSubmission = () => {
    setName("");
    setCondition("");
    setSugg_med("");
    setDose(0);
    handleClose();
  };

  const handleSubmit = async () => {
    let data = {
      id: patients[patients.length - 1].id + 1,
      name,
      condition,
      suggested_medicine: sugg_med,
      dose: parseInt(dose, 10),
      given_medicine: [],
    };
    await axios
      .post("http://localhost:4000/patients", data)
      .then((res) => {
        if (res) {
          toast.success("Patient added successfully.", {
            duration: 2000,
          });
          axios
            .get("http://localhost:4000/patients")
            .then((resInner) => {
              setPatients(resInner.data);
              handleCancelSubmission();
            })
            .catch((errInner) => {
              console.log(errInner);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add Patient</DialogTitle>
      <DialogContentWrapper>
        <TextField
          fullWidth
          required
          id="outlined-required"
          label="Patient Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">
            Patient Condition
          </InputLabel>
          <Select
            labelId="demo-simple-select"
            id="demo-simple-select"
            value={condition}
            label="Patient Condition"
            onChange={(e) => {
              setCondition(e.target.value);
              if (e.target.value === "D") {
                setDose(0);
              }
            }}
          >
            <MenuItem value="H">Healthy</MenuItem>
            <MenuItem value="F">Fever</MenuItem>
            <MenuItem value="D">Diabetes</MenuItem>
            <MenuItem value="T">Tuberculosis</MenuItem>
            <MenuItem value="X">Dead</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">
            Suggested Medicine
          </InputLabel>
          <Select
            labelId="demo-simple-select2"
            id="demo-simple-select2"
            value={sugg_med}
            label="Suggested Medicine"
            onChange={(e) => {
              setSugg_med(e.target.value);
            }}
          >
            <MenuItem value="P">Paracetamol</MenuItem>
            <MenuItem value="As">Aspirin</MenuItem>
            <MenuItem value="An">Antibiotic</MenuItem>
            <MenuItem value="I">Insulin</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          required
          type="number"
          id="outlined-required"
          label="Days of Dose"
          value={dose}
          onChange={(e) => {
            setDose(e.target.value);
          }}
          disabled={condition === "D"}
        />
      </DialogContentWrapper>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={() => handleCancelSubmission()}>Cancel</Button>
        <Button onClick={handleSubmit} autoFocus variant="contained">
          Add Patient
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPatientDialog;
