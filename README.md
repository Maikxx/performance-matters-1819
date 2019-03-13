# Performance Matters

A Game of Thrones inspired **server side rendered** application which allows the user to explore relations between characters, houses, books and more. It aims to let users learn more about Game of Thrones.

Characters overview page | Character detail page
:-------------------------:|:-------------------------:
![Characters overview page](docs/assets/characters.png) | ![Characters detail page](docs/assets/character.png)

House detail page | Book detail page
:-------------------------:|:-------------------------:
![House detail page](docs/assets/house.png) | ![Book detail page](docs/assets/book.png)

## Table of Contents

1. [Installation](#installation)
    1. [Pre-install](#pre-install)
    2. [Install](#install)
2. [Technologies used 📦](#technologies-used)
3. [Data sources](#data-sources)
4. [License](#license)

## Installation

### Pre-install

* Make sure to install [yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com).
* Make sure the **port** specified in the [index.ts](server/src/index.ts) is available (defaults to 3000).

### Install

* Clone the repository: `git clone git@github.com:Maikxx/performance-matters-1819.git`.
* Navigate into the directory: `cd performance-matters-1819`.
* Install dependencies: `yarn` or `npm install`.
* Start the server with: `yarn start-server` or `npm run start-server`.

## Technologies used

* [Concurrently](https://www.npmjs.com/package/concurrently).
* [Gulp](https://gulpjs.com/).
* [TypeScript](https://www.typescriptlang.org).
* [Wait-on](https://www.npmjs.com/package/wait-on).
* [Yarn](https://yarnpkg.com/en/).

## Data sources

* [APIOfFireAndIce](https://anapioficeandfire.com/)
    This is a Game of Thrones API providing a lot of information about Game of Thrones characters, books, houses and more.

    This API does not require authentication, but has got a few limits:
    * Rate limit of 20000 requests made per day, per IP-address.
    * 50 requests per page maximum.
    * Is not zero-based.

## Future enhancements

* [ ] Add more styling to make the application more appealing.
* [ ] Implement the search functionality I originally had.
* [ ] Update docs images.

## License

This repository is licensed as [MIT](LICENSE) by [Maikel van Veen](https://github.com/maikxx).