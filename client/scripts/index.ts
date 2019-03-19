const searchForm = document.querySelector('.SearchForm')
searchForm.addEventListener('submit', onSubmit)

async function onSubmit(event: Event) {
    event.preventDefault()

    const { target } = event
    if (!target) {
        return
    }

    const input = (target as HTMLElement).querySelector('input')

    if (!input) {
        return
    }

    const { value } = input
    const { protocol, hostname, port } = window.location
    const url = `${protocol}//${hostname}:${port}/search?searchText=${value}`
    const response = await fetch(url, {
        method: 'POST',
    })
    const { characters } = await response.json()
    const infiniteScrollList = document.querySelector('.InfiniteScrollList')

    if (!infiniteScrollList || !characters || characters.length === 0) {
        return window.location.reload()
    }

    const htmlString = characters.reduce((content: string, character: any) => {
        return content += `
            <li>
                <a class="CharacterButton" href=${character.detailUrl}>
                    ${character.name}
                </a>
            </li>`
    }, '')

    infiniteScrollList.innerHTML = htmlString
}
