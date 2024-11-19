"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    console.log('ping!!!');
    res.send('pong');
});
app.get('/api/patients', (_req, _res) => {
    console.log('fetching patients');
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
