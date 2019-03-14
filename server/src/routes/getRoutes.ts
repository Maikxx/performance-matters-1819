import Express from 'express'
import { SearchBody } from '../types/Search'
import { Sorter } from '../utils/Sorter'
import { Character } from '../types/Character'
import { filterDetailPageData } from '../helpers/filterDetailPageData'
import { Book } from '../types/Book'
import { House } from '../types/House'

export function getIndexRoute(characters: Character[]) {
    return async function(request: Express.Request, response: Express.Response) {
        const { searchText } = request.query as SearchBody

        if (!searchText) {
            response.status(200).render('pages/index', {
                characters: characters.sort(Sorter.sortByObjectKey('name')),
            })
        } else {
            response.status(200).render('pages/index', {
                characters: characters
                    .filter(character => character.name.includes(searchText))
                    .sort(Sorter.sortByObjectKey('name')),
            })
        }
    }
}

export function getCharacterDetailRoute(characters: Character[]) {
    return async function(request: Express.Request, response: Express.Response) {
        const { id } = request.params
        const character = characters.find(character => character.id === id)

        if (!character) {
            return response.status(404).redirect('/?error=not-found')
        }

        response.status(200).render('pages/characterDetail', {
            data: filterDetailPageData(character),
        })
    }
}

export function getBookDetailRoute(books: Book[]) {
    return async function(request: Express.Request, response: Express.Response) {
        const { id } = request.params
        const book = books.find(book => book.id === id)

        if (!book) {
            return response.status(404).redirect('/?error=not-found')
        }

        response.status(200).render('pages/bookDetail', {
            data: filterDetailPageData(book),
        })
    }
}

export function getHouseDetailRoute(houses: House[]) {
    return async function(request: Express.Request, response: Express.Response) {
        const { id } = request.params
        const house = houses.find(house => house.id === id)

        if (!house) {
            return response.status(404).redirect('/?error=not-found')
        }

        response.status(200).render('pages/houseDetail', {
            data: filterDetailPageData(house),
        })
    }
}

export function getErrorRoute(request: Express.Request, response: Express.Response) {
    response.status(404).redirect('/?error=not-found')
}
