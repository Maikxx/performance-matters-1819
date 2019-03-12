import Express from 'express'
import Helmet from 'helmet'
import path from 'path'
import fs from 'fs'
import util from 'util'
import { Sorter } from './utils/Sorter'
import { Character } from './types/Character'

const readFile = util.promisify(fs.readFile)

; (async() => {
    const app = Express()
    app.use(Helmet())
    app.use(Express.static(path.join(__dirname, 'public')))

    app.set('view engine', 'ejs')
    app.set('views', `${__dirname}/views`)

    const charactersJson = await readFile(path.join(__dirname, './public/data/characters.json'))
    const charactersData = await JSON.parse(charactersJson.toString())
    const characters = (charactersData.flat() as Character[])

    app.get('/', async (request: Express.Request, response: Express.Response) => {
        response.status(200).render('pages/index', {
            characters: characters.sort(Sorter.sortByObjectKey('name')),
        })
    })

    app.get('/characters/:id', async (request: Express.Request, response: Express.Response) => {
        const { id } = request.params
        const character = characters.find(character => character.id === id)

        if (!character) {
            response.status(404).send('This character could not be found!')
            return
        }

        const disallowedKeys = [ 'url', 'id', 'detailUrl' ]
        const characterData = Object.keys(character)
            .filter(key => !disallowedKeys.includes(key))
            .reduce((obj, key) => {
                obj[key] = character[key]
                return obj
            }, {})

        response.status(200).render('pages/characterDetail', {
            character: characterData,
        })
    })

    app.get('*', (request: Express.Request, response: Express.Response) => {
        response.status(404).send('This page does not exist!')
    })

    app.listen(({ port: 3000 }), () => {
        console.info(`App is now listening.`)
    })
})()
