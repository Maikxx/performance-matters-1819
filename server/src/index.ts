import Express from 'express'
import Helmet from 'helmet'
import path from 'path'
import fs from 'fs'
import util from 'util'
import { Sorter } from './utils/Sorter'
import { Character } from './types/Character'
import { filterDetailPageData } from './helpers/filterDetailPageData'
import { Book } from './types/Book'
import { House } from './types/House'
import compression from 'compression'
import bodyParser from 'body-parser'
import { SearchBody } from './types/Search'

const readFile = util.promisify(fs.readFile)

; (async() => {
    const app = Express()
    app.use(Helmet())
    app.use(compression())
    app.use(Express.static(path.join(__dirname, '../public')))

    app.set('view engine', 'ejs')
    app.set('views', `${__dirname}/views`)

    const [ charactersResponse, booksResponse, housesResponse ] = await Promise.all([
        await readFile(path.join(__dirname, '../public/data/characters.json')),
        await readFile(path.join(__dirname, '../public/data/books.json')),
        await readFile(path.join(__dirname, '../public/data/houses.json')),
    ])
    const [ charactersData, booksData, housesData ] = await Promise.all([
        await JSON.parse(charactersResponse.toString()),
        await JSON.parse(booksResponse.toString()),
        await JSON.parse(housesResponse.toString()),
    ])

    const characters = (charactersData.flat() as Character[])
    const houses = (housesData.flat() as House[])
    const books = (booksData.flat() as Book[])

    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    app.get('/', async (request: Express.Request, response: Express.Response) => {
        const { searchText } = request.query as SearchBody

        if (!searchText) {
            response.status(200).render('pages/index', {
                characters: characters.sort(Sorter.sortByObjectKey('name')),
            })
        } else {
            response.status(200).render('pages/index', {
                characters: characters
                    .filter(character => character.name.includes(searchText))
                    .sort(Sorter.sortByObjectKey('name')),
            })
        }
    })

    app.get('/characters/:id', async (request: Express.Request, response: Express.Response) => {
        const { id } = request.params
        const character = characters.find(character => character.id === id)

        if (!character) {
            return response.status(404).redirect('/?error=not-found')
        }

        response.status(200).render('pages/characterDetail', {
            data: filterDetailPageData(character),
        })
    })

    app.get('/books/:id', async (request: Express.Request, response: Express.Response) => {
        const { id } = request.params
        const book = books.find(book => book.id === id)

        if (!book) {
            return response.status(404).redirect('/?error=not-found')
        }

        response.status(200).render('pages/bookDetail', {
            data: filterDetailPageData(book),
        })
    })

    app.get('/houses/:id', async (request: Express.Request, response: Express.Response) => {
        const { id } = request.params
        const house = houses.find(house => house.id === id)

        if (!house) {
            return response.status(404).redirect('/?error=not-found')
        }

        response.status(200).render('pages/houseDetail', {
            data: filterDetailPageData(house),
        })
    })

    app.post('/search', urlencodedParser, (request: Express.Request, response: Express.Response) => {
        const { searchText } = request.body as SearchBody

        if (!searchText) {
            response
                .status(404)
                .redirect('/')
        }

        response
            .status(200)
            .redirect(`/?searchText=${searchText}`)
    })

    app.get('*', (request: Express.Request, response: Express.Response) => {
        response
            .status(404)
            .redirect('/?error=not-found')
    })

    app.listen(({ port: 3000 }), () => {
        console.info(`App is now open for action.`)
    })
})()
