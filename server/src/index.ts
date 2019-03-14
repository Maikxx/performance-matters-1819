import Express from 'express'
import Helmet from 'helmet'
import path from 'path'
import compression from 'compression'
import bodyParser from 'body-parser'
import { getIndexRoute, getCharacterDetailRoute, getBookDetailRoute, getHouseDetailRoute, getErrorRoute } from './routes/getRoutes'
import { getMemoryData } from './helpers/getMemoryData'
import { postSearchRoute } from './routes/postRoutes'

(async() => {
    const app = Express()
    app.use(Helmet())
    app.use(compression())
    app.use(Express.static(path.join(__dirname, '../public')))

    app.set('view engine', 'ejs')
    app.set('views', `${__dirname}/views`)

    const urlencodedParser = bodyParser.urlencoded({ extended: false })
    const { characters, books, houses } = await getMemoryData()

    app.get('/', getIndexRoute(characters))
    app.get('/characters/:id', getCharacterDetailRoute(characters))
    app.get('/books/:id', getBookDetailRoute(books))
    app.get('/houses/:id', getHouseDetailRoute(houses))
    app.get('*', getErrorRoute)

    app.post('/search', urlencodedParser, postSearchRoute)

    app.listen(({ port: 3000 }), () => {
        console.info(`App is now open for action.`)
    })
})()
