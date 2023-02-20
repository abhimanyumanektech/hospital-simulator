import axios from "axios";

export const getPatients = async () => {
  try {
    const res = await axios.get("http://localhost:4000/patients");
    return res.data;
  } catch (error) {
    return error;
  }
};
