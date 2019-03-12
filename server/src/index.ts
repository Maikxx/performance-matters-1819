import Express from 'express'
import Helmet from 'helmet'
import path from 'path'
import { getCharacters } from './helpers/getCharacters'

(async() => {
    const app = Express()
    app.use(Helmet())
    app.use(Express.static(path.join(__dirname, 'public')))

    app.set('view engine', 'ejs')
    app.set('views', `${__dirname}/views`)

    app.get('/', async (request: Express.Request, response: Express.Response) => {
        const characters = await getCharacters()

        response.status(200).render('pages/index', {
            characters,
        })
    })

    app.get('/characters/:id', async (request: Express.Request, response: Express.Response) => {
        const { id } = request.params
        const character = await getCharacters(id)
        const allowedKeys = [ 'url', 'id' ]
        const characterData = Object.keys(character['0'])
            .filter(key => !allowedKeys.includes(key))
            .reduce((obj, key) => {
                obj[key] = character['0'][key]
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
