import axios from "axios";
import { Entry, EntryWithoutId } from "../types/types";

import { apiBaseUrl } from "../constants";

const addEntry = async (patientId: string, entry: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, entry);
  return data;
 
};

export default { addEntry };