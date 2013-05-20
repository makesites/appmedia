# Phonegap Img

A build script to automate the generation of the ridicilusly big number of image assets to cover all the supported resolutions... 

## Install

```
npm install phonegap-img
```


## Usage

Create a ```build.js``` with the following:
```
var screens = require("phonegap-img");

screens.set({ output : "./img" }); // default value

screens.icon("path/to/source/icon");

screens.splash("path/to/source/icon");

// renders the xml of the created assets
screens.render()

```


## Trivia

* Inspired by [web2splash](https://github.com/mwbrooks/web2splash)


## License

Distributed through Makesites.org

Released under the MIT license

