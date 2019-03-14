import Express from 'express'
import Helmet from 'helmet'
import path from 'path'
import compression from 'compression'
import bodyParser from 'body-parser'
import { getIndexRoute, getCharacterDetailRoute, getBookDetailRoute, getHouseDetailRoute, getErrorRoute } from './routes/getRoutes'
import { getMemoryData } from './helpers/getMemoryData'
import { postSearchRoute } from './routes/postRoutes'
import { cache } from './helpers/memoryCache'

(async() => {
    const app = Express()
    app.use(Helmet())
    app.use(compression())
    app.use(Express.static(path.join(__dirname, '../public')))

    app.set('view engine', 'ejs')
    app.set('views', `${__dirname}/views`)

    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    const { characters, books, houses } = await getMemoryData()

    app.get('/', cache(50), getIndexRoute(characters))
    app.get('/characters/:id', cache(50), getCharacterDetailRoute(characters))
    app.get('/books/:id', cache(50), getBookDetailRoute(books))
    app.get('/houses/:id', cache(50), getHouseDetailRoute(houses))
    app.get('*', cache(50), getErrorRoute)

    app.post('/search', urlencodedParser, postSearchRoute)

    app.listen(({ port: 3000 }), () => {
        console.info(`App is now open for action.`)
    })
})()
