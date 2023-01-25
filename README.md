# Warp Contracts custom plugins

This is a monorepo that includes all the plugins and necessary development tools. At this stage of the development we are using yalc to substitute the npm registery. Basically yalc acts as a local package registery that hosts packages. If you want to learn more about [yalc](https://github.com/wclr/yalc) use this link to check their page.

## Installation

First you need to install yalc globally.

```bash
yarn global add yalc
```

After that clone this repo and build it,

```bash
git clone https://github.com/firstbatchxyz/warp-plugins.git
cd warp-plugins
yarn
```

Keep in mind that sometimes build process takes some good amount of time.

## Publishing plugins to local registery using yalc

Choose a plugin of your choice and publish it using `yalc:publish`,

```bash
cd warp-contracts-plugin-fetch
yarn yalc:publish
```

## Adding plugins in your project using yalc

Importing the plugins using yalc is really easy. 

Instead of doing this in your project folder,

```bash
yarn add warp-contracts-plugin-fetch
```

You need to do this,

```bash
yalc add warp-contracts-plugin-fetch
yarn
```
`yalc add <package>` fetches the package from the local yalc registery and copies it to the project root while updating your projects package.json. After running the `yalc add` command you should see something like the following in your package.json,

```json
"warp-contracts-plugin-fetch": "file:.yalc/warp-contracts-plugin-fetch"
```
After that running `yarn` simply installs the package from project root. 

## Using the plugins in the project

All you need to do is import the plugin as you normally do with packages installed with npm or yarn. 

```js
import { WarpFactory } from "warp-contracts";
import { FetchExtension } from "warp-contracts-plugin-fetch";

const warp = WarpFactory.forMainnet().use(new FetchExtension());
```

You can cascade the plugins (use multiple plugins) like this,

```js
const warp = WarpFactory.forMainnet().use(new FetchExtension()).use(new SnarkjsExtension());
```

Check the example folder for example projects.
