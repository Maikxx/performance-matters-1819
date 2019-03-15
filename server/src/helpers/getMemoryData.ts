import fs from 'fs'
import util from 'util'
import path from 'path'
import { Character } from '../types/Character'
import { House } from '../types/House'
import { Book } from '../types/Book'
import { flatten } from 'lodash'

const readFile = util.promisify(fs.readFile)

export async function getMemoryData() {
    const [ charactersResponse, booksResponse, housesResponse ] = await Promise.all([
        await readFile(path.join(__dirname, '../../public/data/characters.json')),
        await readFile(path.join(__dirname, '../../public/data/books.json')),
        await readFile(path.join(__dirname, '../../public/data/houses.json')),
    ])
    const [ charactersData, booksData, housesData ] = await Promise.all([
        await JSON.parse(charactersResponse.toString()),
        await JSON.parse(booksResponse.toString()),
        await JSON.parse(housesResponse.toString()),
    ])

    const characters = (flatten(charactersData) as Character[])
    const houses = (flatten(housesData) as House[])
    const books = (flatten(booksData) as Book[])

    return {
        characters,
        houses,
        books,
    }
}
