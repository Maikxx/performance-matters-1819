import fetch from 'node-fetch'
import { Transformer } from '../utils/Transformer'
import { Filter } from '../utils/Filter'
import fs from 'fs'
import path from 'path'
import util from 'util'
import { Book } from '../types/Book'

const Promisify = util.promisify
const writeFile = Promisify(fs.writeFile)

export async function getBooks() {
    try {
        const url = `https://anapioficeandfire.com/api/books/?pageSize=20`
        const res = await fetch(url)
        const data: Book[] = await res.json()
        const cleanData = Transformer.deepCleanArray(data)
        const uniqueBooks = Filter.getUniqueArrayByObjectKey<Book>(cleanData, 'name')
        const transformedData = uniqueBooks
            .filter(book => !!book.name)
            .map(book => ({
                ...book,
                id: book.url.slice(book.url.lastIndexOf('/') + 1),
                name: Transformer.capitalize(book.name),
                detailUrl: `/books/${book.url.slice(book.url.lastIndexOf('/') + 1)}`,
            }))

        console.log(transformedData)
        await writeFile(path.join(__dirname, '../public/data/books.json'), JSON.stringify(transformedData))
    } catch (error) {
        console.error(error)
    }
}
