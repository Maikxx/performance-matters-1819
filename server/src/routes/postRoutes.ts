import Express from 'express'
import { SearchBody } from '../types/Search'
import { Character } from '../types/Character'
import { Sorter } from '../utils/Sorter'

export function postSearchRoute(characters: Character[]) {
    return async function(request: Express.Request, response: Express.Response) {
        const { searchText: formSearchText } = request.body as SearchBody
        const { searchText } = request.query

        if (!formSearchText && !searchText) {
            return response.status(404).redirect('/')
        }

        if (searchText) {
            response.setHeader('Content-Type', 'application/json')
            const responseData = JSON.stringify({
                characters: characters
                    .filter(character => character.name.includes(searchText))
                    .sort(Sorter.sortByObjectKey('name')),
            })

            return response.status(200).send(responseData)
        }

        response.status(200).redirect(`/?searchText=${formSearchText}`)
    }
}
