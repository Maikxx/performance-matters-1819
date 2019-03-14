# Performance Matters

[🚀 Demo link 🚀](https://performance-matters.herokuapp.com/).

A Game of Thrones inspired **server side rendered** application which allows the user to explore relations between characters, houses, books and more. It aims to let users learn more about Game of Thrones.

Characters overview page | Character detail page
:-------------------------:|:-------------------------:
![Characters overview page](docs/assets/characters.png) | ![Characters detail page](docs/assets/character.png)

House detail page | Book detail page
:-------------------------:|:-------------------------:
![House detail page](docs/assets/house.png) | ![Book detail page](docs/assets/book.png)

## Table of Contents

1. [Installation](#Installation)
    1. [Pre-install](#Pre-install)
    2. [Install](#Install)
2. [Technologies used 📦](#Technologies-used)
2. [Enhancements made](#Enhancements-made)
3. [Data sources](#Data-sources)
4. [License](#License)

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
* [Express](https://expressjs.com/).
* [Gulp](https://gulpjs.com/).
* [TypeScript](https://www.typescriptlang.org).
* [Wait-on](https://www.npmjs.com/package/wait-on).
* [Yarn](https://yarnpkg.com/en/).

## Enhancements made

* Enabled text [compression](https://github.com/expressjs/compression).
* Render the application server side.
* [Minify and prefix](./server/gulpfile.js) the css.
* Prefetch [data](./server/public/data) from the [API](https://anapioficeandfire.com/) on the server and load it into memory, so that no excess requests are needed.
* Added [meta description](./server/src/views/partials/head.ejs#L3) tag to increase SEO scrore.
* Added [robots.txt](./server/public/robots.txt) to increase SEO scrore.
* Add [memory caching](./server/src/services/memoryCache.ts).

## Data sources

* [APIOfFireAndIce](https://anapioficeandfire.com/)
    This is a Game of Thrones API providing a lot of information about Game of Thrones characters, books, houses and more.

    This API does not require authentication, but has got a few limits:
    * Rate limit of 20000 requests made per day, per IP-address.
    * 50 requests per page maximum.
    * Is not zero-based.

## Future enhancements

* [ ] Add more styling to make the application more appealing.
* [X] Implement the search functionality I originally had.
* [ ] Update docs images.

## License

This repository is licensed as [MIT](LICENSE) by [Maikel van Veen](https://github.com/maikxx).