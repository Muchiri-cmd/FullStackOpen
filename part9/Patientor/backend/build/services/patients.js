"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const parseDiagnosis_1 = __importDefault(require("../middleware/parseDiagnosis"));
const getAll = () => {
    return patients_1.default;
};
const getPatientById = (id) => {
    const patient = patients_1.default.find(patient => patient.id === id);
    if (!patient) {
        throw new Error(`Patient with id ${id} not found`);
    }
    console.log(patient);
    return patient;
};
const getSanitizedeData = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign(Object.assign({ id: (0, uuid_1.v1)() }, patient), { entries: patient.entries || [] });
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (id, entry) => {
    const patient = getPatientById(id);
    const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v1)(), diagnosisCodes: (0, parseDiagnosis_1.default)(entry) });
    patient.entries.push(newEntry);
    return patient;
};
exports.default = {
    getAll,
    getSanitizedeData,
    addPatient,
    getPatientById,
    addEntry
};
