"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("../services/patients"));
const router = express_1.default.Router();
const utils_1 = __importDefault(require("../utils/utils"));
router.get('/', (_req, res) => {
    // console.log('fetching patients');
    res.send(patients_1.default.getSanitizedeData());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.default)(req.body);
        const addedPatient = patients_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorNessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorNessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorNessage);
    }
});
exports.default = router;
