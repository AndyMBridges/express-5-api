"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(index_1.default);
app.use((req, res) => {
    res.status(404).send("Not Found");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
