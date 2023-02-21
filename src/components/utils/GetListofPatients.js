import axios from "axios";

// Util function to get the all patients list

export const getPatients = async () => {
  try {
    const res = await axios.get("http://localhost:4000/patients");
    return res.data;
  } catch (error) {
    return error;
  }
};
