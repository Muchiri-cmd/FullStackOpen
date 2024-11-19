"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 8000;
app.get('/api/ping', (_req, res) => {
    console.log('ping!!!');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
