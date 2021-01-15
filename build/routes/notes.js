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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.update = exports.read = exports.create = exports.list = void 0;
const note_1 = require("../model/note");
const list = (req, res) => {
    let { sort } = req.query;
    sort = sort ? sort.toLowerCase() : "desc";
    if (!(sort === 'asc' || sort === 'desc')) {
        return res.status(400).send('Invalid sort params');
    }
    const notes = note_1.getNotes(sort);
    res.json({ notes });
};
exports.list = list;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = req.body;
    if (title === undefined || body === undefined) {
        return res.status(400).send('Missing title or body');
    }
    console.log(`${title} and ${body} received`);
    const note = yield note_1.createNote({ title, body });
    res.send({ note });
});
exports.create = create;
const read = (req, res) => {
    const { id } = req.params;
    const note = note_1.getNotes(id);
    res.send({ note });
};
exports.read = read;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, body } = req.body;
    if (title === undefined && body === undefined) {
        return res.status(400).send('Missing title or body');
    }
    console.log(`updating ${id} with ${title} and ${body}`);
    const note = yield note_1.updateNote(id, { title, body });
    res.send({ note });
});
exports.update = update;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`Deleting ${id}`);
    const note = yield note_1.deleteSingleNote(id);
    res.send({ note });
});
exports.deleteNote = deleteNote;
