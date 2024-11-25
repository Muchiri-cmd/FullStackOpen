import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
     `${apiBaseUrl}/diagnoses`
  );
  return data;
};

export default { getDiagnoses };