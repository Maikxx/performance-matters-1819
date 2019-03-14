import fs from 'fs'
import util from 'util'
import path from 'path'
import { Character } from '../types/Character'
import { House } from '../types/House'
import { Book } from '../types/Book'

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

    const characters = (charactersData.flat() as Character[])
    const houses = (housesData.flat() as House[])
    const books = (booksData.flat() as Book[])

    return {
        characters,
        houses,
        books,
    }
}
