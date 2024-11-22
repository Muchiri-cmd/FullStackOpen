"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("../services/patients"));
const router = express_1.default.Router();
const newPatientParser_1 = require("../middleware/newPatientParser");
router.get('/', (_req, res) => {
    // console.log('fetching patients');
    res.send(patients_1.default.getSanitizedeData());
});
router.post('/', newPatientParser_1.newPatientParser, (req, res) => {
    const newPatient = patients_1.default.addPatient(req.body);
    res.json(newPatient);
});
exports.default = router;
