<!-- logo image -->
<div>
  <img src="./assets/arcatch-01-logo.jpg" width="100%" />
</div>

<p align="center">
    Supercharge your native fetch() method with enhanced flexibility and an integrated caching system, which can be seamlessly used within requests or as a standalone feature.
</p>

<div align="center">

[![npm version](https://img.shields.io/badge/NPM-v0.0.23-red)](https://www.npmjs.com/package/ar-catch)
[![Install size](https://packagephobia.com/badge?p=ar-catch)](https://packagephobia.com/result?p=ar-catch)
[![Minified + GZipped](https://img.shields.io/badge/Minified_+_GZipped-4%20kB-orange)](https://bundlephobia.com/package/ar-catch@0.0.17)

</div>

<div align="center">

[![NPM](https://nodei.co/npm/ar-catch.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ar-catch/)

</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Package manager](#package-manager)
- [Features](#features)
- [Usage](#usage)
  - [Object Oriented Usage](#object-oriented-usage)
  - [Direct URL Usage](#direct-url-usage)
- [API](#api)
  - [config()](#config)
  - [$catch()](#catch)
  - [useCache()](#usecache)
    - [example](#example)
  - [$config() options table](#config-options-table)
  - [$catch() options object table](#catch-options-object-table)
    - [Object Oriented Usage](#object-oriented-usage-1)
    - [Direct URL Usage](#direct-url-usage-1)
  - [issues you might encounter](#issues-you-might-encounter)
- [Final Words](#final-words)
- [License](#license)
- [Support](#support)
- [Contributing](#contributing)
- [Special Thanks](#special-thanks)

## Installation

### Package manager

Using npm:

```bash
npm install ar-catch
```

Using yarn:

```bash
yarn add ar-catch
```

Using pnpm:

```bash
pnpm install ar-catch
```

## Features

- **super powered fetch()🚀** - The goal behind the library is to provide a supercharged fetch() method, with flexible syntax and some other cool features such as caching, which can be used within requests or as a standalone feature and interceptors, interceptors are functions that are called before and after a request is made, they can be used to modify the request or response objects, or to handle errors, and state management, which is a feature that allows you to store data in a global state and access it from anywhere in your application, etc.
- **caching system📮** - The library provides a simple caching system, which can be used within requests or as a standalone feature, it allows you to cache responses and retrieve them later. will talk about it in more details later but it's good to know that it will more advanced in the future.
- **interceptors 👨🏻‍✈️** - Interceptors are functions that are called before and after a request is made, they can be used to modify the request or response objects, or to handle errors.
- **state management 🏬** - State management is a feature that allows you to store data in a global state and access it from anywhere in your application. just to mention, it sill experimental and not fully supported yet but it will be in the future.
- **flexible syntax 🤝🏻** - The library provides a flexible syntax, which allows you to use it in different ways
- **lightweight 🏋🏻‍♂️** - The library is very lightweight, it's only 4 kB minified and gzipped.
- **no dependencies 🖖🏻** - The library has no dependencies, it's completely standalone.
- **typescript support 💙** - The library is written fully in typescript, so it has a built-in typescript support.
- **developer friendly ❤️** - The library is developer friendly, it has a very clean and well documented codebase, and it's open source, so you can contribute to it if you want.

## Usage

_The first step is recommended in the big projects!_

1. **Create a file called `api.js` or `api.ts` in your project's root directory.**

   ```ts
   // (file_name).config.ts;

   import arcatch from "ar-catch";

   const $catch = arcatch.config({
     baseURL: "your.base.url",
     alias: "$any_name",
     onReq: (req) => {
       /* Request */
     },
     onRes: (res) => {
       /* Response */
     },
     onErr: (err) => {
       /* Error */
     },
   });

   // will return the instance of the library,
   // that you can use to call an API with
   // or have a access to the config object
   console.log($catch);

   // now you're Done 🎉
   ```

2. **go to where you wanna use the library**

   ```ts
   import arcatch from "ar-catch";

   const response = await arcatch.$catch({
     // we name this way of using the library "Object Oriented" Usage
     // (sorry about the name😂)
     // ...options
   });

   // or

   const response = await arcatch.$catch(url, {
     // we name this way of using the library "Direct URL" Usage
     // ...options
   });

   `📑 NOTE:: any option you set in the config file, like baseURL, header, ...etc will be applied on any request`;
   ```

### Object Oriented Usage

```js
import arcatch from "ar-catch";

const getTodo = async () => {
    const response = await arcatch.$catch({
      // this is the default method, so you don't have to specify it
      method: "GET",
      /**
       * here you have two options
       * 1. you can use the "ep" property, which stands for "endpoint"
       * 2. you can use the "fullPath" property, which stands for "full path"
       * it's important to know that you can't use both of them at the same time
       *
       * will discuss the difference between them later in the options table section.
       */
      fullPath: URL,

      // the response type, and it's optional, the default value is "json"
      // available options are: "json", "text", "blob", "arrayBuffer", "formData"
      resType: "json",

      // this options object will be combined with the default options object
      // but it will override the default options object if there's a conflict
      // ex: if you have a "headers" property in the default options object with a value of "content-type: "something not similar to this one", and you have a "headers" property in this object with a value of "content-type: "application/json", the value of the "headers" property in the default options object will be overridden with the value of the "headers" property in this object
      options: {
        headers: { "Content-Type": "application/json" },
        // the GET method doesn't support a body,
        // but you can still use it and it'll be handled in the background
        // to fit the fetch() method syntax
        body: {
          products: [
            {
              id: 1,
              quantity: 1,
            },
          ],
        },

        `📑 NOTE:: you still can send any other options that available in the fetch() method`
      },
    });
}
```

### Direct URL Usage

```js
import arcatch from "ar-catch";

const response = await arcatch.$catch("carts", {
  // the difference that i should mention here is that
  // the custom options object will include the options that will defined how your request will be handled
  // and anything outside of it will be sent to the fetch() method directly

  customOptions: {
    cache: "PER-SESSION", // the caching strategy, and this will be discussed in a whole section later
    useWithBaseURL: true, // will treat the "carts" as the endpoint not the full path
  },
});
```

## API

### config()

`config()` is a function that you can use to configure the library, and it has the following options:

1. **baseURL** - The base URL of your API, and it's optional.
2. **alias** - The alias that you can use to access the library anywhere in your application.
3. **onReq** - The function that will be called before the request is made, and it's optional.
4. **onRes** - The function that will be called after the request is made, and it's optional.
5. **onErr** - The function that will be called if there's an error, and it's optional.

### $catch()

`$catch()` is the main function of the library, it's the function that you'll use to send requests, and it has two ways to use it, the first one is the "Object Oriented" Usage, and the second one is the "Direct Link" Usage, and you've already seen both of them.

### useCache()

`useCache()` is a function that you can use to cache your something based on key and value, and it has three caching strategies, which are:

- **PER-SESSION** - The cache will be cleared when the user closes the tab or the browser.
- **RELOAD** - The cache will be cleared when the user reloads the page.
- **NO-CACHE** - Until this moment it's used as the default value, and it's basically just Doesn't do anything. but later on it'll be used to analyze the request and decide whether to cache it or not. or to track the request and cache it if it's repeated. or to help with things like performance, etc. but for now, it's just a placeholder.

#### example

```js
import arcatch from "ar-catch";

const cache = arcatch.useCache("RELOAD"); // with that being done, any cache that will be set by the {cache} instant will be cleared when the user reloads the page.

`📑 NOTE:: You can use more that one instance to have all the power possible, or you can create set the cache strategy dynamic as well and it'll work perfectly as well`;

cache.set("key", "value");
cache.isCached("key"); // true/false

console.log(cache.getCachedKeys());
console.log(cache.get("key"));
cache.clearAllCaches();

console.log(cache.getCachedKeys());
console.log(cache.get("key"));
```

### $config() options table

| Property         | Type       | Description                                                                     |
| ---------------- | ---------- | ------------------------------------------------------------------------------- |
| `baseURL`        | `string`   | The base url that will be used with every request.                              |
| `alias`          | `string`   | The alias that will be used to access the library anywhere in your application. |
| `defaultOptions` | `object`   | The default options that will be used with every request.                       |
| `onReq`          | `function` | The function that will be called when the request is sent.                      |
| `onRes`          | `function` | The function that will be called when the response is received.                 |
| `onErr`          | `function` | The function that will be called when the error is received.                    |

### $catch() options object table

#### Object Oriented Usage

| Property   | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| `method`   | `string` | The method that will be used with the request.    |
| `ep`       | `string` | The endpoint that will be used with the request.  |
| `fullPath` | `string` | The full path that will be used with the request. |
| `options`  | `object` | The options that will be used with the request.   |

#### Direct URL Usage

| Property        | Type     | Description                                     |
| --------------- | -------- | ----------------------------------------------- |
| `customOptions` | `object` | The options that will be used with the request. |

### issues you might encounter

1- if you're using the alias feature inside a typescript file, and you got an error that says "type is not defined", you can fix it by adding this line to the top of your file, or on the main file of your application (more recommended)

hopefully this gonna be fixed soon💚

```ts
declare global {
  interface Window {
    [your choosen alias]: any;
  }
}

`📮 [one more thing related to this point]`
// > this is not a bug, but just wanted to give you a hint to take advantage of it

// if you struggled with accessing the window object, you can use this one
function waitForWindowObject() {
  return new Promise((resolve, reject) => {
    // Check if the window object is already loaded
    if (document.readyState === "complete") {
      resolve(window); // Return the window object
    } else {
      // If the window is not yet loaded, add an event listener to wait for it
      window.addEventListener("DOMContentLoaded", () => {
        resolve(window); // Return the window object once it's loaded
      });
    }
  });
}

```

## Final Words

The documentation should give you an over view on how to get started with the library, but in the code you'll find more hints and messages that will help you to understand what each piece of code does`

if you stuck somewhere, or got confused, just hover of the name of the function or the variable and you'll find a message that will help you to understand what it does

## License

MIT © [Ahmed Ragab]([https://github.com/ahmedragab20])

## Support

If you like this project, you can support me by giving it a star and sharing it with your friends ⭐🤝🏻

## Contributing

If you have any idea, you can open an issue and let me know about it, or you can open a pull request and contribute.

## Special Thanks

`Alhamdulillah for everything 💚`

`profit Mohamed (peace be upon him) said: "You will not be a true believer until you love for your brother what you love for yourself." [Sahih Al-Bukhari]`

`May Allah bless you all, and thanks for reaching this point 💚`
