import { Router } from 'express'
import * as notes from './notes'

const router = Router()

router.get('/notes', notes.list) // list
router.post('/notes', notes.create) // create 
router.get('/notes/:id', notes.read) // read
router.post('/notes/:id', notes.update) // update 
router.delete('/notes/:id', notes.deleteNote) // delete

export default router