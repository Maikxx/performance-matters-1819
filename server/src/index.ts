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
        filter: (request: Express.Request, response: Express.Response) => {
            if (request.headers.accept) {
                return request.headers.accept.includes('text/html')
            }

            return compression.filter(request, response)
        },
    }))
    app.get('*.js', decompress)
    app.get('*.css', decompress)
    app.use(Express.static(path.join(__dirname, '../public')))

    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))

    const urlencodedParser = bodyParser.urlencoded({ extended: false })

    const { characters, books, houses } = await getMemoryData()

    app.get('/', cache(50), getIndexRoute(characters))
    app.get('/characters/:id', cache(50), getCharacterDetailRoute(characters))
    app.get('/books/:id', cache(50), getBookDetailRoute(books))
    app.get('/houses/:id', cache(50), getHouseDetailRoute(houses))
    app.get('*', cache(50), getErrorRoute)

    app.post('/search', urlencodedParser, postSearchRoute(characters))

    app.listen(({ port: process.env.PORT || 3000 }), () => {
        console.info(`App is now open for action on port ${process.env.PORT || 3000}.`)
    })
})()
