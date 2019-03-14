export interface DetailFetcherData {
    url: string
    name: string
    [key: string]: string | string[] | number
}

export interface StorageObject {
    [key: string]: string | string[] | number
    id: string
}
