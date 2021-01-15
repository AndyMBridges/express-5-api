"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const dataDir = 'data';
class MapStore {
    constructor(filename) {
        this.filepath = path_1.default.resolve(dataDir, filename);
    }
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`writing to ${this.filepath}`);
            const serializedData = JSON.stringify(Array.from(data.entries()));
            yield promises_1.writeFile(this.filepath, serializedData);
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Reading from ${this.filepath}`);
            const data = yield promises_1.readFile(this.filepath, 'utf-8');
            const parsed = JSON.parse(data);
            return new Map(parsed);
        });
    }
}
exports.default = MapStore;
