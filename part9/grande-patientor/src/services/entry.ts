import axios from "axios";
import { HealthCheckEntry, HealthCheckEntryFormValues } from "../types/types";

import { apiBaseUrl } from "../constants";

const addEntry = async (patientId: string, entry: HealthCheckEntryFormValues) => {
  const { data } = await axios.post<HealthCheckEntry>(`${apiBaseUrl}/patients/${patientId}/entries`, entry);
  return data;
 
};

export default { addEntry };