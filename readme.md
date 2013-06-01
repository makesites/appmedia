# Appmedia

A build script to automate the generation of the ridicilusly big number of image assets to cover all the supported resolutions...

## Install

```
npm install appmedia
```


## Usage

Create a ```build.js``` with the following:
```
var appmedia = require("appmedia");

appmedia.set({ output : "./img" }); // default value

appmedia.icon("path/to/source/icon");

appmedia.splash("path/to/source/icon");

// renders the xml of the created assets
appmedia.output()

```


## Trivia

* Inspired by [web2splash](https://github.com/mwbrooks/web2splash)


## License

Distributed through Makesites.org

Released under the MIT license

