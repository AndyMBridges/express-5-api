import { readFile, writeFile } from 'fs/promises'
import { INote } from '../interfaces'
import path from 'path'

const dataDir = 'data'

export default class MapStore {

    filepath: string

    constructor(filename: string) {
        this.filepath = path.resolve(dataDir, filename)
    }
    async save(data: INote[]) {
        console.log(`writing to ${this.filepath}`)
        const serializedData: string = JSON.stringify(Array.from(data.entries()))
        await writeFile(this.filepath, serializedData)
    }
    async read() {
        console.log(`Reading from ${this.filepath}`)
        const data = await readFile(this.filepath, 'utf-8')
        const parsed = JSON.parse(data)
        return new Map(parsed)
    }
}