# Appmedia

A a node module to automate the generation of the ridicilusly big number of image assets to cover all the supported resolutions...


## Install

Using NPM:

```
npm install appmedia
```
The image manipulation is done using ImageMagick, which should be already installed. For Mac OSX users that's as simple as:
```
brew install imagemagick
```


## Usage

Create a ```build.js``` with the following:
```
var appmedia = require("appmedia");

appmedia.icon("path/to/source/icon");

appmedia.splash("path/to/source/image");
```
Both ```icon``` and ```splash``` will output the new image assets in a folder "./img", relative to the location of the source image.

Note that it's best if the source images have a significantly better resolution than the copies produced - ex: source icon ~2k, source splash ~4k.


## Output sizes

The image sizes generated are an aggregated set after researching into the official documentation of device manufacturers. Although only a subset of these assets are used by any given device, we must generate all of them to cover different cases.

### Icons

These are square images (in pixels):

```
16, 30, 32, 48, 57, 60, 64, 72, 114, 128, 144, 512, 1024
```

### Splash screens

These are the loading screens, and are tightly tied to the resolution of the screen:

```
320x480
480x800
480x854
540x960
600x800
600x1024
620x300
640x960
640x1136
720x720
720x1280
768x1024
768x1280
800x1280
868x420
1080x1920
1024x600
1024x768
1116x540
1200x1920
1280x800
1366x720
1536x2008
1536x2048
1920x1080
2048x1496
2048x1536
2560x1600
```

## Roadmap

* Override default options using set(): appmedia.set({ output : "./assets/img" })
* Create config files for Phonegap & Firefox OS: appmedia.render()


## Credits

Created by [Makis Tracend](http://github.com/tracend)

### Trivia

* Inspired by [web2splash](https://github.com/mwbrooks/web2splash)

* Splash screen sizes were partially calculated using [Screensiz.es](http://screensiz.es/)

* Splash photo in the examples by [Sandra S.](http://www.flickr.com/photos/rapunzel2901/)


### License

Distributed through [Makesites.org](http://makesites.org)

Released under the [MIT license](http://makesites.org/licenses/MIT)

