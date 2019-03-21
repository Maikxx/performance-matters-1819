import Express from 'express'
import Helmet from 'helmet'
import path from 'path'
import compression from 'compression'
import bodyParser from 'body-parser'
import { getIndexRoute, getCharacterDetailRoute, getBookDetailRoute, getHouseDetailRoute, getErrorRoute } from './routes/getRoutes'
import { getMemoryData } from './helpers/getMemoryData'
import { postSearchRoute } from './routes/postRoutes'
import { cache } from './services/memoryCache'
import { decompress } from './services/decompressionService'

(async() => {
    const app = Express()
    app.use(Helmet())
    app.use(compression({
        filter: (request: Express.Request) => {
            if (request.headers.accept) {
                return request.headers.accept.includes('text/html')
            }

            return false
        },
    }))
    app.get('*.js', decompress)
    app.get('*.css', decompress)
    app.use(Express.static(path.join(__dirname, '../public')))

    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))

    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    const { characters, books, houses } = await getMemoryData()
    const aWeekInSeconds = 60 * 60 * 24 * 7

    app.get('/', cache(aWeekInSeconds), getIndexRoute(characters))
    app.get('/characters/:id', cache(aWeekInSeconds), getCharacterDetailRoute(characters))
    app.get('/books/:id', cache(aWeekInSeconds), getBookDetailRoute(books))
    app.get('/houses/:id', cache(aWeekInSeconds), getHouseDetailRoute(houses))
    app.get('*', cache(aWeekInSeconds), getErrorRoute)

    app.post('/search', urlencodedParser, postSearchRoute(characters))

    app.listen(({ port: process.env.PORT || 3000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 3000}.`)
    })
})()
