import { Character } from '../types/Character'
import fetch from 'node-fetch'
import { Transformer } from '../utils/Transformer'
import { Filter } from '../utils/Filter'
import fs from 'fs'
import path from 'path'
import util from 'util'
import { times } from '../utils/util'

const Promisify = util.promisify
const writeFile = Promisify(fs.writeFile)

export async function getCharacters() {
    try {
        const characters = await Promise.all(times(43).map(async value => {
            const url = `https://anapioficeandfire.com/api/characters/?pageSize=50&page=${value + 1}`
            const res = await fetch(url)
            const data: Character[] = await res.json()
            const cleanData = Transformer.deepCleanArray(data)
            const uniqueCharacters = Filter.getUniqueArrayByObjectKey<Character>(cleanData, 'name')
            const transformedData = uniqueCharacters
                .filter(character => !!character.name)
                .map(character => ({
                    ...character,
                    id: character.url.slice(character.url.lastIndexOf('/') + 1),
                    name: Transformer.capitalize(character.name),
                    detailUrl: `/characters/${character.url.slice(character.url.lastIndexOf('/') + 1)}`,
                }))

            return transformedData
        }))

        await writeFile(path.join(__dirname, '../../public/data/characters.json'), JSON.stringify(characters))
    } catch (error) {
        console.error(error)
    }
}
