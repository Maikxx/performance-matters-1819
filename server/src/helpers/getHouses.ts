import fetch from 'node-fetch'
import { Transformer } from '../utils/Transformer'
import { Filter } from '../utils/Filter'
import fs from 'fs'
import path from 'path'
import util from 'util'
import { times } from '../utils/util'
import { House } from '../types/House'

const Promisify = util.promisify
const writeFile = Promisify(fs.writeFile)

export async function getHouses() {
    try {
        const houses = await Promise.all(times(9).map(async value => {
            const url = `https://anapioficeandfire.com/api/houses/?pageSize=50&page=${value + 1}`
            const res = await fetch(url)
            const data: House[] = await res.json()
            const cleanData = Transformer.deepCleanArray(data)
            const uniqueHouses = Filter.getUniqueArrayByObjectKey<House>(cleanData, 'name')
            const transformedData = uniqueHouses
                .filter(house => !!house.name)
                .map(house => ({
                    ...house,
                    id: house.url.slice(house.url.lastIndexOf('/') + 1),
                    name: Transformer.capitalize(house.name),
                    detailUrl: `/houses/${house.url.slice(house.url.lastIndexOf('/') + 1)}`,
                }))

            return transformedData
        }))

        await writeFile(path.join(__dirname, '../../public/data/houses.json'), JSON.stringify(houses))
    } catch (error) {
        console.error(error)
    }
}
