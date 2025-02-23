# LittleJS starter pack

A simple [LittleJS](https://github.com/KilledByAPixel/LittleJS)
starter pack using [Vite](https://vite.dev/).

![LittleJS Logo](https://raw.githubusercontent.com/KilledByAPixel/LittleJS/refs/heads/main/examples/logo.png) ![Vite Logo](https://camo.githubusercontent.com/237e20be5fcfd8f7133f43d126fc49fb29dec7631679938bdd2ecb8cbb2a610e/68747470733a2f2f766974652e6465762f6c6f676f2e737667)

## Installing

Ensure you have [degit](https://github.com/Rich-Harris/degit) installed:

```bash
    npm install -g degit
```

Then enter the following:

```bash
    degit eoinmcg/littlejs-vanilla my-game
    cd my-game
    npm install
```

## Developing

Start the local dev server:

```bash
    npm run dev
```

## Production build

This will create a minified version in dist/ plus a zip of your game:

```bash
    npm run build
```

## File structure

```bash
.
├── dist
├── node_modules
├── public
│    ├── tiles.png
├── src
│   ├── main.js
├── index.html
├── package.json
```

**dist** the built project is located here including a zip of your game.

**public** tilesheets such as the example tiles.png are placed here.

**src** all code goes here with main.js as the entry point. Feel free to import files and add your own folder structure.
