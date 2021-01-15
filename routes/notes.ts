
import { getNotes, createNote, updateNote, deleteSingleNote } from '../model/note'
import { IBody, IParams } from '../interfaces'

export const list = (req, res) => {
    let { sort } : { sort: string } = req.query
    sort = sort ? sort.toLowerCase() : "desc"
    if (!(sort === 'asc' || sort === 'desc')) {
        return res.status(400).send('Invalid sort params')
    }
    const notes = getNotes(sort)
    res.json({ notes })
} 

export const create = async (req, res) => {
    const { title, body } : IBody = req.body
    if (title === undefined || body === undefined) {
        return res.status(400).send('Missing title or body')
    }
    console.log(`${title} and ${body} received`)
    const note = await createNote({title, body})
    res.send({ note })
} 

export const read = (req, res) => {
    const { id } : IParams = req.params
    const note = getNotes(id)
    res.send({ note })
} 

export const update = async (req, res) => {
    const { id } : IParams = req.params
    const { title, body } : IBody = req.body   
    if (title === undefined && body === undefined) {
        return res.status(400).send('Missing title or body')
    } 
    console.log(`updating ${id} with ${title} and ${body}`)
    const note = await updateNote(id, {title, body})
    res.send({ note })
} 

export const deleteNote = async (req, res) => {
    const { id } : IParams = req.params
    console.log(`Deleting ${id}`)
    const note = await deleteSingleNote(id)
    res.send({ note })
} 
