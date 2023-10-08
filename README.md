# All you need is a good fetch() API 💚

Elevate your TypeScript/Javascript development experience to new heights with "very good fetch," the ultimate fetch API wrapper! ✨

[![npm version](https://img.shields.io/badge/NPM_Home_Page-orange)](https://www.npmjs.com/package/very-good-fetch)
[![Install size](https://packagephobia.com/badge?p=very-good-fetch)](https://packagephobia.com/result?p=very-good-fetch)


## Universal Compatibility 🌐

Whether you're building applications for the web, Node.js, or any other environment, "very good fetch" seamlessly adapts to your needs. Even if your environment lacks native fetch support, fret not! "very good fetch" effortlessly integrates with libraries like node-fetch, all you need is to pass a -fetch api- instance if it's not natively supported, ensuring you can harness its power everywhere.

## Feature-Rich and Type-Safe 🛡️

Say goodbye to guesswork and hello to clarity. "very good fetch" is meticulously crafted with TypeScript and enriched with comprehensive JSDocs, ensuring an unparalleled developer experience (DX). You'll breeze through your code, thanks to auto-completion, type checking, and intelligent suggestions.

## Efficient Caching System 💾

Boost your application's performance with our built-in caching system. "very good fetch" provides the flexibility to cache data in memory, local storage, or session storage, empowering you to optimize your data retrieval process. Say farewell to redundant requests, and hello to lightning-fast responses!

## Seamless Integration 🔄

We've seamlessly integrated the caching system with "very good fetch" itself. This means you can harness the power of caching effortlessly, allowing you to make smarter and more efficient data requests. You can even use it seperately from the fetch API if you want to! The choice is yours.

thanks to the tree shaking support, you won't have to worry about unnecessary bloat either!

## Interceptors Galore 🚧

Take control of the entire request lifecycle with our powerful interceptors. From the initial request to handling responses and errors, "very good fetch" empowers you to tailor your HTTP requests precisely to your needs. Fine-tune your requests like never before!

## Customizable Configuration ⚙️

Adapt "very good fetch" to your project's requirements with ease. Set up your own base URL, configure headers, and tweak other options effortlessly.

## Full Fetch API Support 🌐

"very good fetch" supports everything that's natively available in the Fetch API. Whether you need to send GET requests, POST data, manage cookies, or even handle redirects, we've got you covered. At the end, you're literally using the native fetch API, but with a lot of extra features!

## Tree Shaking Support 🌳

Optimize your bundle size with "very good fetch." Our library fully supports tree shaking, ensuring that only the parts of the library you actually use are included in your final build. Say goodbye to unnecessary bloat and hello to efficient code bundles!


## Installation 📦

```bash
npm install very-good-fetch
```
```bash
yarn add very-good-fetch
```
```bash
pnpm add very-good-fetch
```

## configuration 🚀

```ts
// api.config.ts (you can name it whatever you want)

import { vSetupConfig } from 'very-good-fetch';

const config = vSetupConfig({
  fetchInstance: fetch, // optional, helps to run with any environment or library (e.g. node-fetch)
  config: {
    baseUrl: 'https://dummyjson.com',
    headers: {
      // will be merged with every request, and can be overridden later on if needed
      'Content-Type': 'application/json',
    },
    muteWarnings: true, // optional, will mute warnings if set to true
    muteLogs: true, // optional, will mute logs if set to true
    muteErrors: true, // optional, will mute errors if set to true
    responseType: 'json', // optional/overridable, sets the default response type (e.g. json, text, blob, etc.)
  },
  interceptors: {
    onBeforeRequest: (config) => {
      // do something before the request is sent
      return config;
    },
    onAfterRequest: (request) => {
      // do something after the request is sent immediately before the response is received
      return request;
    },
    onBeforeResponse: (response) => {
      // do something with the response data
      return response;
    },
    onError: (error) => {
      // do something with the error
      return error;
    },
  },
});
```

## vFetch Examples 📝

```ts
// GET request
import { vFetch } from 'very-good-fetch';

const response = await vFetch('/api/users'); // you can send the whole url as well and it'll smartly handle that

// POST request
const response = await vFetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Ahmed Ragab',
    age: 22,
  }),
});

// reques with vOptions
const response = await vFetch('/api/users', {
  method: 'GET',
  vOptions: {
    responseType: 'text', // optional, will override the default response type
    cache: "memory",
  },
});
```

## vCache Examples 📝

```ts
import { vCache } from 'very-good-fetch';

const cache = new vCache("local"); // cache sterategies available so far: memory, local, session, (cookies will be added soon + expire time for each cache)

// Set a value
cache.set('key', 'value');
// Get a value
cache.get('key');
// delete a value
cache.delete('key');
// clear the cache
cache.clear();
// get all keys
cache.keys();
// get all values
cache.values();
// get size
cache.size();
// check if a key exists
cache.has('key');
// get all cached data as an object
cache.asObject();
```
**NOTE:**
*you will find step-by-step examples in the code as well. just hover over the methods and you'll find the examples and explanations there.*

***The documentation is a work in progress still, and we are actively working on adding more essential features. Stay tuned for updates! 👇🏻***

## very good comming features 🚀

- [ ] Retry requests on failure (with a limit)
- [ ] Throuttle requests out of the box
- [ ] Debounce requests out of the box
- [ ] More cache strategies (e.g. cookies) + expire time for each cache
- [ ] More interceptors (e.g. onBeforeRedirect, onAfterRedirect, etc.)
- [ ] More options (e.g. timeout, etc.)

Unlock the full potential of fetch API with "very good fetch" today. Your code will thank you later! 🌟

Get started now: [Link to GitHub Repository](https://github.com/ahmedragab20/very-good-fetch)

MIT License © 2023 [Ahmed Ragab](
  https://www.linkedin.com/in/ahmed-ragab-bb75541b3
)

**May Allah bless you all 🤲🏻** 

**Alhamdulillah,**
**Allah is the best of the planners ❤**️