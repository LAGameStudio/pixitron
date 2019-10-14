# pixitron engine
**Clone and run for a perfect Electron game project starting place**

The Pixitron Game Engine by Lost Astronaut Studios (lostastronaut.com).  It's not a game, just a starting place.

This is a minimal boilerplate / starting place for making an Electron-structured PixiJS application based on the [Electron Quick Start](https://electronjs.org/docs/tutorial/quick-start), combined with some custom Pixijs code and voila!, 

Comes with a gamepad console up for testing any game controllers you might have connected, and a keyboard mapping area already configured to easily bind to various special key events.   Audio is played through HTML5, but ships with Howler.js if you want something more substantial for audio wrangling

Please note we've left the Electron dev console on, because you'll probably need it.  Turn it off before you release!

**Use this app along with the [PixiJS tutorials](http://www.pixijs.com/tutorials) and the [Electron API Demos](https://electronjs.org/#get-started) app for API code examples to help you get started.**

Getting started:

1) Go through the basic quick start of Electronjs
2) Get familiar with the Atom.io editor
3) Clone this and run it
4) Experiment with native building features of electron-build and related add-ons

Maybe this video will help: https://www.youtube.com/watch?v=Z-oN_YI3KIE

This starting place for a Pixitron game is implemented in these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `engine.js` - Contains a ready-to-be-extended game engine that hooks "ESC" key to "Quit"
- `interface.js` - Keyboard and mouse wrangling
- `drawing.js` - Where to put reusable drawing apparatus
- `renderer.js` - Came with the [Electron Quick Start](https://github.com/electron/electron-quick-start)
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) and by looking into the award-winning [PixiJS v4](http://pixijs.com).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/LAGameStudio/pixitron
# Go into the repository
cd pixitron
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## What's in the soup

* Includes a custom Engine class for structural organization and window setup for quickly starting a fullscreen game app in Electron
* PixiJS cross-platform game engine for 2D and WebGL games
* For spatial audio and audio sprites: [Howler.js](https://howlerjs.com/)
* For gamepad support: [jsgamepad](https://github.com/beejjorgensen/jsgamepad/blob/master/index.html)
* Great all-inclusive keyboard bindings setup
* Z-ordering display groups for making 2.5D games

## What's not but could be
* [Steam API for Nodejs](https://github.com/DPr00f/steam-api-node) npm install --save steam-api

## Resources for learning Pixitron

There's a 20 video YouTube series on integrating Pixitron with a JSON back-end to host multiplayer games:
* https://www.youtube.com/playlist?list=PLzilNkL7KAZGoeKIsDpo0CPQv7UCL_Gms

## Resources for learning PixiJS

- [Learning Pixi by Kitty Kat Attack](https://github.com/kittykatattack/learningPixi) - great place to start
- [PixiJS Tutorials from PixiJS.com](http://www.pixijs.com/tutorials) - more learnin' fun'
- [A book on PixiJS](https://www.amazon.co.uk/Learn-Pixi-js-Interactive-Graphics/dp/1484210956) - learn by chopping trees! (or get it on a kindle) ___Learn Pixi.js: Create Great Interactive Graphics for Games and the Web Paperback (Published 5 Nov 2015)___
- [Pixi.io Shader Filters](http://pixijs.io/pixi-filters/tools/demo/) - Use shaders to spice up your 2D engine
- [Many Examples](http://pixijs.io/examples/#/filters/filter.js) - from PixiJS.com
- [Awesome Video and Article](https://www.awwwards.com/a-gentle-introduction-to-shaders-with-pixi-js.html) - A gentle introduction to shaders with pixi-js

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

It's a mix of MIT and CC0 1.0 (Public Domain) licensing.
[See all licensing here](LICENSE.md)
