# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.8.0](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.7.1...@resee-movies/utils@0.8.0) (2025-08-19)

### Features

* introduced new string hashing methods toSimpleHash and toCyrb64Hash ([b2b5e48](https://github.com/ReSee-Movies/web-work/commit/b2b5e483fbaacf70c2b7570cd701190cd6df1864))

### Code Refactoring

* moved more common live event logic (event "progress", e.g. "is it happening now") and blog post logic into utility methods ([f6e0541](https://github.com/ReSee-Movies/web-work/commit/f6e05414649d72145b77929859905078927bdd37))

## [0.7.1](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.7.0...@resee-movies/utils@0.7.1) (2025-07-29)

### Bug Fixes

* add core-js fallbacks for ES2025 Set methods ([dab32d0](https://github.com/ReSee-Movies/web-work/commit/dab32d0148e10a497f1da02b50ca5769c1256b71))

## [0.7.0](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.6.2...@resee-movies/utils@0.7.0) (2025-07-25)

### Features

* modified the isString utility method to accept the optional argument `withContent` which extends the type check for content within the string ([18583d3](https://github.com/ReSee-Movies/web-work/commit/18583d325999df73b1e87fa163b2437c0dc4ace8))
* modified the isSubstringOf utility method to accept the optional argument `simplified` which slugifies both strings to be compared so that special characters are ruled out ([6a203f7](https://github.com/ReSee-Movies/web-work/commit/6a203f71d38c03d140e6c581553a77e69b201638))

## [0.6.2](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.6.1...@resee-movies/utils@0.6.2) (2025-07-23)

### Bug Fixes

* URI escape download filenames in the getMediaAssetUrl utility ([6cd5ee5](https://github.com/ReSee-Movies/web-work/commit/6cd5ee5ee84137da43e41efe9bf62a7e856c632c))

## [0.6.1](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.6.0...@resee-movies/utils@0.6.1) (2025-07-23)

### Styles

* rearrange some pieces of the Live Event details view, and extend the usage of the useLiveEventName composable to other places where that value is used ([641508d](https://github.com/ReSee-Movies/web-work/commit/641508dee6158778234aeede4eb2ed2866b46d97))

## [0.6.0](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.5.3...@resee-movies/utils@0.6.0) (2025-07-22)

### Features

* introduced new string utility method isSubstringOf ([b44edb3](https://github.com/ReSee-Movies/web-work/commit/b44edb381ca472f5a0d8576d28fdbe00f7d1288a))

### Miscellaneous Chores

* dependency updates ([2f51d44](https://github.com/ReSee-Movies/web-work/commit/2f51d44236beca879741a1b78b903a0c7bde7f97))

## [0.5.3](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.5.2...@resee-movies/utils@0.5.3) (2025-06-27)

### Bug Fixes

* changed the behaviour of the `getStartOfDay` and `getEndOfDay` utilities so that, by default, they take into account the timezone offset so when output to ISO string they line up with values created on the server ([a785c97](https://github.com/ReSee-Movies/web-work/commit/a785c97fefe4dc28590eb725daa462448cb46b81))

## [0.5.2](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.5.1...@resee-movies/utils@0.5.2) (2025-06-24)

### Code Refactoring

* moved createRecordSeoMeta into the utils package so it can be reused elsewhere ([ceae651](https://github.com/ReSee-Movies/web-work/commit/ceae6517fc839039e1d52d1556b007dca198e192))

## [0.5.1](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.5.0...@resee-movies/utils@0.5.1) (2025-06-12)

### Miscellaneous Chores

* updated Nuxt and Vue to latest ([778faf8](https://github.com/ReSee-Movies/web-work/commit/778faf85603eaed3a3ece6d842b23567ae550c4a)), closes [#26](https://github.com/ReSee-Movies/web-work/issues/26)
* updated test & linting dependencies to latest ([e4116d3](https://github.com/ReSee-Movies/web-work/commit/e4116d3389bfe89c4e18eb44a14fb7c1d6b8832c)), closes [#26](https://github.com/ReSee-Movies/web-work/issues/26)

## [0.5.0](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.4.1...@resee-movies/utils@0.5.0) (2025-05-22)

### Features

* introduce new object util method "hasKey" ([b63b121](https://github.com/ReSee-Movies/web-work/commit/b63b121cd9d8027b1ca9dd8376f2361fdfd0d9b6))

### Build System

* tidy up prepare and dev:prepare scripts ([45d7bf2](https://github.com/ReSee-Movies/web-work/commit/45d7bf22a10073ff48308243ab29f516bb747766))

## [0.4.1](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.4.0...@resee-movies/utils@0.4.1) (2025-05-09)

### Miscellaneous Chores

* update eslint dependencies ([87a45b8](https://github.com/ReSee-Movies/web-work/commit/87a45b8a343b76bcdef138d80b678dbf29f40c0c))
* update test dependencies ([da3ce35](https://github.com/ReSee-Movies/web-work/commit/da3ce35e139f77097e6f4d34efad398d588221ae))

## [0.4.0](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.3.0...@resee-movies/utils@0.4.0) (2025-04-25)

### Features

* introduced several new image-related utility methods: getFirstAvailableImageFileDescriptor, getImageUrl, and normalizeImageFileDescriptor ([74cbd25](https://github.com/ReSee-Movies/web-work/commit/74cbd25fc4c5347da6ee1f485fefae0294ee796c))
* the UiImg component now accepts a Directus file descriptor as a source, and will fill in other props accordingly ([5483c3d](https://github.com/ReSee-Movies/web-work/commit/5483c3d219eb622e2458d2bdec6999be259ad4d9))

## [0.3.0](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.2.1...@resee-movies/utils@0.3.0) (2025-04-23)

### Features

* introduced getAspectRatio to compute an X or Y opposite of an aspect ratio ([e217fc7](https://github.com/ReSee-Movies/web-work/commit/e217fc7f952fb855a7d14d040d8d5ec840114161))
* tweaked the fromTmdbImageSize method to also support string integers that are not prefixed with a "w" ([7cabdaf](https://github.com/ReSee-Movies/web-work/commit/7cabdaf2c9e79831efe74d12f525e197aedb3007))
* tweaked tmdb image utility methods to support numeric sizes (in addition to their prior "w" prefixed strings) ([72b19e4](https://github.com/ReSee-Movies/web-work/commit/72b19e4872ead18072ce21fb6942f2aa4dde2a7b))

### Build System

* rearranging packages directories of @resee-movies/utils and @resee-movies/eslint ([b7d202e](https://github.com/ReSee-Movies/web-work/commit/b7d202ee871d1d63b2ef5aaba54f686155e780e1))

## [0.2.1](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.2.0...@resee-movies/utils@0.2.1) (2025-04-22)

### Bug Fixes

* incorrectly comparing the month of one date to the minutes of another in the areDatesEqual method ([23e5580](https://github.com/ReSee-Movies/web-work/commit/23e5580c6ab6eb3b29db242fdb4e75451696a2ad))

## [0.2.0](https://github.com/ReSee-Movies/web-work/compare/@resee-movies/utils@0.1.12...@resee-movies/utils@0.2.0) (2025-04-16)

### Features

* make the argument types for getMediaAssetUrl a bit more forgiving ([afba391](https://github.com/ReSee-Movies/web-work/commit/afba391e71687bb8f618e81dd89dab9b00d5fd6f))

### Build System

* updated eslint and related dependencies to latest ([0e886b7](https://github.com/ReSee-Movies/web-work/commit/0e886b7daeddebdb3a7afebbd04d1fd18fb1ead9))
* updated vitest and related dependencies to latest ([d055add](https://github.com/ReSee-Movies/web-work/commit/d055add3f57282a839f71855bf93c8e293c2f8dd))

## <small>0.1.12 (2025-04-02)</small>

* feat: introduced new utility methods areDatesEqual and groupByDate ([52c81aa](https://github.com/ReSee-Movies/web-work/commit/52c81aa))

## <small>0.1.11 (2025-03-26)</small>

* chore: dependency updates ([fd435a7](https://github.com/ReSee-Movies/web-work/commit/fd435a7))

## <small>0.1.10 (2025-03-04)</small>

**Note:** Version bump only for package @resee-movies/utils

## <small>0.1.9 (2025-02-28)</small>

* fix: added missing vitest coverage package ([8a57139](https://github.com/ReSee-Movies/web-work/commit/8a57139))
* feat: added optional config to the `toFormattedAddress` method that controls how the address "name"  ([3327536](https://github.com/ReSee-Movies/web-work/commit/3327536))

## <small>0.1.8 (2025-02-26)</small>

* feat: introduce `humanize` string utility function ([ff88fb0](https://github.com/ReSee-Movies/web-work/commit/ff88fb0))
* test: introduce Vitest ([7b8d537](https://github.com/ReSee-Movies/web-work/commit/7b8d537))
* test: linting configuration ([2cd0386](https://github.com/ReSee-Movies/web-work/commit/2cd0386))
* build: dependency updates ([dd828f3](https://github.com/ReSee-Movies/web-work/commit/dd828f3))

## <small>0.1.7 (2025-02-12)</small>

* feat: introduce new utility method `sleep` ([b62dd5c](https://github.com/ReSee-Movies/web-work/commit/b62dd5c))
* feat: introduce new utility methods `isPromiseLike` and `getTimer` ([f3a6d7a](https://github.com/ReSee-Movies/web-work/commit/f3a6d7a))
* feat: introduce the Optional, UnionToIntersection, and MappedIntersection TS utility types ([1853631](https://github.com/ReSee-Movies/web-work/commit/1853631))

## <small>0.1.6 (2025-02-03)</small>

* feat: introduced the `getRandomEntry` (from an array) and `getRandomInteger` methods ([ee86c79](https://github.com/ReSee-Movies/web-work/commit/ee86c79))

## <small>0.1.5 (2025-01-24)</small>

* feat: added isUUID function to check for v4 UUID strings ([884d73b](https://github.com/ReSee-Movies/web-work/commit/884d73b))

## <small>0.1.4 (2025-01-21)</small>

* feat: added toFormattedAddress function, for address locale-aware sequencing of various address part ([ef1e9e7](https://github.com/ReSee-Movies/web-work/commit/ef1e9e7))

## <small>0.1.3 (2025-01-21)</small>

* fix: filter undefined values from URLs generated by getMediaAssetsUrl util ([e0d6847](https://github.com/ReSee-Movies/web-work/commit/e0d6847))

## <small>0.1.2 (2025-01-17)</small>

* feat: added getMediaAssetUrl for generating Directus asset URLs without having to go through the res ([72e4762](https://github.com/ReSee-Movies/web-work/commit/72e4762))
* feat: added TMDB image utility functions ([26b6789](https://github.com/ReSee-Movies/web-work/commit/26b6789))
* feat: made the TMDB images baseUrl configurable in getTmdbImageUrl ([340b396](https://github.com/ReSee-Movies/web-work/commit/340b396))
* feat: updated useLoadImage composable, and associated utility functions, to support a wider range of ([e504d0b](https://github.com/ReSee-Movies/web-work/commit/e504d0b))
* fix: useQueryParams composable imports ([f0dc115](https://github.com/ReSee-Movies/web-work/commit/f0dc115))

## <small>0.1.1 (2025-01-15)</small>

* feat: simple table of contents info can be derived via string parsing, thereby allowing markup to be ([863e491](https://github.com/ReSee-Movies/web-work/commit/863e491))

# 0.1.0 (2025-01-15)

### Features

* **utils:** add isUrl utility method ([02ef8ae](https://github.com/ReSee-Movies/web-work/commit/02ef8ae0ef62f21ca491bada1019ce07633f07d4))
* **utils:** introduce generateTableOfContents function to extract TOC info from a hierarchy of heading elements ([e5c13f1](https://github.com/ReSee-Movies/web-work/commit/e5c13f1d7a0a526d1f800633ab114b0d9d1d2dd0))
* **utils:** migrate utility functions ([79f0d90](https://github.com/ReSee-Movies/web-work/commit/79f0d904fa6e913f83a875078681cceb1bc5ec32))
