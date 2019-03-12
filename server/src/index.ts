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

    app.listen(({ port: 3000 }), () => {
        console.info(`App is now listening.`)
    })
})()
