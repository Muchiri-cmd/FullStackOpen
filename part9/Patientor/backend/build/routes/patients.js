"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("../services/patients"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    // console.log('fetching patients');
    res.send(patients_1.default.getSanitizedeData());
});
exports.default = router;
