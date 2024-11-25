import { Diagnosis } from "../types/types";

const useDiagnosis = (diagnoses: Diagnosis[]) => {
  const getCodeDescription = (code: string): string | undefined => {
    const result = diagnoses.find((diag) => diag.code === code);
    return result?.name;
  };

  return { getCodeDescription };
};

export default useDiagnosis;