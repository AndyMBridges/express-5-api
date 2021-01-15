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
exports.deleteSingleNote = exports.getNote = exports.updateNote = exports.createNote = exports.getNotes = void 0;
const mapstore_1 = __importDefault(require("../lib/mapstore"));
const uuid_1 = require("uuid");
const NOTES = new Map();
const store = new mapstore_1.default('notes.json');
store.read().then(notes => {
    console.log('notes ', notes);
    for (let [id, note] of notes) {
        NOTES.set(id, note);
    }
}).catch(err => {
    console.log('err ', err);
});
const getNotes = (sort) => {
    const notes = Array.from(NOTES.values());
    notes.sort((a, b) => {
        if (sort === 'asc') {
            return a.lastEdited - b.lastEdited;
        }
        else {
            return b.lastEdited - a.lastEdited;
        }
    });
    return notes;
};
exports.getNotes = getNotes;
const createNote = ({ title, body }) => __awaiter(void 0, void 0, void 0, function* () {
    const id = uuid_1.v4();
    const lastEdited = Date.now();
    const note = {
        id,
        lastEdited,
        title,
        body
    };
    NOTES.set(id, note);
    yield store.save(NOTES);
    return Object.assign({}, note);
});
exports.createNote = createNote;
const updateNote = (id, { title, body }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!NOTES.has(id)) {
        return null;
    }
    const note = NOTES.get(id);
    note.title = title !== null && title !== void 0 ? title : note.title;
    note.body = body !== null && body !== void 0 ? body : note.body;
    note.lastEdited = Date.now();
    yield store.save(NOTES);
    return Object.assign({}, note);
});
exports.updateNote = updateNote;
const getNote = (id) => {
    if (!NOTES.has(id)) {
        return null;
    }
    const note = NOTES.get(id);
    return Object.assign({}, note);
};
exports.getNote = getNote;
const deleteSingleNote = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sucess = NOTES.delete(id);
    yield store.save(NOTES);
    return sucess;
});
exports.deleteSingleNote = deleteSingleNote;
