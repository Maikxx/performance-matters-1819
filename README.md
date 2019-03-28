# Performance Matters

[🚀 Demo link 🚀](https://performance-matters.herokuapp.com/).

A Game of Thrones inspired **server side rendered** application which allows the user to explore relations between characters, houses, books and more. It aims to let users learn more about Game of Thrones.

Homepage | Detail page
:-------------------------:|:-------------------------:
![Homepage](docs/home.png) | ![Detail page](docs/detail.png)

## Table of Contents

1. [Installation](#Installation)
2. [Optimisations](#Optimisations)
    1. [Focus points](#Focus-points)
    2. [The good stuff](#The-good-stuff)
3. [Future enhancements](#Future-enhancements)
4. [Technologies used 📦](#Technologies-used)
5. [Data sources](#Data-sources)
6. [License](#License)

## Installation

* Make sure to install [yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com).
* Make sure the **port** specified in the [index.ts](server/src/index.ts) is available (defaults to 3000).

* Clone the repository: `git clone git@github.com:Maikxx/performance-matters-1819.git`.
* Navigate into the directory: `cd performance-matters-1819`.
* Install dependencies: `yarn` or `npm install`.
* Start the server with: `yarn start-server` or `npm run start-server`.

The build (`yarn build`) runs the TypeScript compiler first, turning the TypeScript files into JavaScript files in the `dist` folder.
The build process will then copy the `views` folder to the `dist` folder.

## Optimisations

### Focus points

* First view - When browsing around the web, the most annoying thing that can happen is when you are on a slow connection, and then the pages often takes up to 5 seconds to show any content (looking at you nu.nl).
* Repeat view - In this case, it is more convenient for the page to be quick. For example (again), nu.nl doesn't do this very well in my eyes. It seems as though they just made the mobile website crappy in order for you to download the bloated, data-mining, ad haven of an app. Anyways, rant over. I perceive it as shitty if you go to a page, click on a link and read something, then go back and are greeted with a white screen.

### The good stuff

* Enabled text [compression](https://github.com/expressjs/compression).
* Render the application server side.
* [Minify and prefix](./server/gulpfile.js) the CSS.
* [Minify and compile](./server/gulpfile.js) the client-side TypeScript.
* Prefetch [data](./server/public/data) from the [API](https://anapioficeandfire.com/) on the server and load it into memory, so that no excess requests are needed, this however only works if you are sure that the data from the API will not change, which is the case in this API until a new season of GoT will arrive.
* Added [meta description](./server/src/views/partials/head.ejs#L3) tag to increase SEO scrore.
* Added [robots.txt](./server/public/robots.txt) to increase SEO scrore.
* Add [memory caching](./server/src/services/memoryCache.ts).
* Progressive enhancement for searching.
* Precompression.
* Make use of a web font, with WOFF and WOFF2, with only a subset of all characters (only Latin).

![Audit scores after adding a service worker](./docs/score-after-pwa.png)

After tweaking some more things with the service worker, the following is the final score when running audits:

![Audit score after tweaking service worker](./docs/final-benchmark-score.png)

## Future enhancements

* [X] Add more styling to make the application more appealing.
* [X] Update docs images.
* [ ] Add infinite scrolling to prevent enourmous amounts of DOM elements to be rendered at once.
* [ ] Add HTTP2.

## Technologies used

* [Concurrently](https://www.npmjs.com/package/concurrently).
* [Express](https://expressjs.com/).
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

## License

This repository is licensed as [MIT](LICENSE) by [Maikel van Veen](https://github.com/maikxx).