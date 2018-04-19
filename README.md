# electron-pixi
**Clone and run for a quick way to see Electron+Pixijs in action.**

This is a minimal Electron-structured PixiJS application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation, combined with some custom Pixijs code boilerplate and voila!, the Pixitron Game Engine by Lost Astronaut Studios (lostastronaut.com).  It's not a game, just a starting place (blank screen).

**Use this app along with the [PixiJS tutorials](http://www.pixijs.com/tutorials) and the [Electron API Demos](https://electronjs.org/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

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
git clone https://github.com/h3rb/electron-pixi
# Go into the repository
cd electron-pixi
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
(Note: PixiJS is MIT Licensed seperately but contained in this Electron app starting place)
