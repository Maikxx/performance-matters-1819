import { Character } from '../types/Character'
import { Book } from '../types/Book'
import { House } from '../types/House'

export function filterDetailPageData(data: Character | Book | House) {
    const disallowedKeys = [ 'url', 'id', 'detailUrl' ]
    return Object.keys(data)
        .filter(key => !disallowedKeys.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key]
            return obj
        }, {})
}
