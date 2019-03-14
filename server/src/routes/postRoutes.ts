import Express from 'express'
import { SearchBody } from '../types/Search'

export function postSearchRoute(request: Express.Request, response: Express.Response) {
    const { searchText } = request.body as SearchBody

    if (!searchText) {
        return response.status(404).redirect('/')
    }

    response.status(200).redirect(`/?searchText=${searchText}`)
}
