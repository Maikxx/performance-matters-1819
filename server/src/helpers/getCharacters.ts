import { Character } from '../types/Character'
import fetch from 'node-fetch'
import { Transformer } from '../utils/Transformer'
import { Filter } from '../utils/Filter'
import { Sorter } from '../utils/Sorter'

export async function getCharacters(byId?: string) {
    const baseUrl = `https://anapioficeandfire.com/api/characters`
    const fullUrl = byId
        ? `${baseUrl}/${byId}`
        : `${baseUrl}/?pageSize=${50}&page=${1}`

    try {
        const res = await fetch(fullUrl)
        const data: Character[] = await res.json()

        const cleanData: Character[] = byId
            ? [Transformer.deepCleanObject(data)]
            : Transformer.deepCleanArray(data)
        const uniqueCharacters = Filter.getUniqueArrayByObjectKey<Character>(cleanData, 'name')
        const transformedData = uniqueCharacters
            .filter(character => !!character.name)
            .map(character => ({
                ...character,
                name: Transformer.capitalize(character.name),
                url: `/characters/${character.url.slice(character.url.lastIndexOf('/') + 1)}`,
            }))
            .sort(Sorter.sortByObjectKey<Character>('name'))

        return transformedData
    } catch (error) {
        console.error(error)
        throw new Error(error.message)
    }
}
