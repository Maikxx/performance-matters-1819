import { Validator } from './Validator'

export class Transformer {
    public static capitalize(text: string) {
        return text.length === 0
            ? ''
            : `${text[0].toUpperCase()}${text.slice(1, text.length)}`
    }

    public static addIdToObject(id: string, object: Object) {
        return {
            ...object,
            id,
        }
    }

    public static deepCleanArray(subject: any[]): any {
        return subject
            .map(item => {
                if (Validator.isTruthyArray(item)) {
                    return Transformer.deepCleanArray(item)
                }

                if (Validator.isObject(item)) {
                    return Transformer.deepCleanObject(item)
                }

                if ((!Array.isArray(item) && item) || Validator.isTypeOf(item, 'number')) {
                    return item
                }
            })
            .filter(item => !!item)
    }

    public static deepCleanObject(subject: Object) {
        return Object.keys(subject).reduce((newObj, property) => {
            const value = subject[property]

            if (Validator.isTruthyArray(value)) {
                const cleanedArray = Transformer.deepCleanArray(value)

                if (Validator.isTruthyArray(cleanedArray)) {
                    newObj[property] = cleanedArray
                }
            }

            if (Validator.isObject(value)) {
                const nestedObject = Transformer.deepCleanObject(value)

                if (Object.keys(nestedObject).length !== 0) {
                    newObj[property] = nestedObject
                }
            }

            if ((!Array.isArray(value) && value) || Validator.isTypeOf(value, 'number')) {
                newObj[property] = value
            }

            return newObj
        }, {})
    }
}
