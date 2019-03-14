export class Filter {
    public static getUniqueArrayByObjectKey<TData>(objects: TData[], key: string) {
        const uniques = new Set()

        return objects.filter(object => {
            if (!uniques.has(object[key])) {
                uniques.add(object[key])
                return true
            }

            return false
        })
    }
}
