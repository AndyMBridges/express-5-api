import MapStore from '../lib/mapstore'
import { v4 as uuid } from 'uuid'
import { IBody, INote } from '../interfaces'

const NOTES: any = new Map()
const store = new MapStore('notes.json')

store.read().then(notes => {
    for (let [id, note] of notes) {
        NOTES.set(id, note)
    }
}).catch(err => {
    console.log('err ', err)
})

export const getNotes = (sort: string): INote[] => {
    const notes: INote[] = Array.from(NOTES.values())
    notes.sort((a, b) => {
        if (sort === 'asc') {
            return a.lastEdited - b.lastEdited
        } else {
            return b.lastEdited - a.lastEdited
        }
    })
    return notes
}

export const createNote = async ({title, body}: IBody): Promise<INote> => {
    const id: string = uuid()
    const lastEdited = Date.now()
    const note: INote = {
        id,
        lastEdited,
        title,
        body
    }
    NOTES.set(id, note)
    await store.save(NOTES)
    return { ...note }
}

export const updateNote = async (id: string, { title, body }: IBody): Promise<INote | null> => {
    if (!NOTES.has(id)) {
        return null
    }
    const note: INote = NOTES.get(id)
    note.title = title ?? note.title
    note.body = body ?? note.body
    note.lastEdited = Date.now()
    await store.save(NOTES)
    return { ...note }
}

export const getNote = (id: string): INote | null => {
    if (!NOTES.has(id)) {
        return null
    } 
    const note: INote = NOTES.get(id)
    return { ...note}
}

export const deleteSingleNote = async (id: string): Promise<boolean> => {
    const sucess = NOTES.delete(id)
    await store.save(NOTES)
    return sucess
}

