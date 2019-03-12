import Express from 'express'
import Helmet from 'helmet'
import path from 'path'

(async() => {
    const app = Express()
    app.use(Helmet())

    app.get('/', (request: Express.Request, response: Express.Response) => {
        response.sendFile(path.join(__dirname, './public/index.html'))
    })

    app.listen(({ port: 3000 }), () => {
        console.info(`App is now listening.`)
    })
})()
