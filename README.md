# Warp Contracts custom plugins

This is a quick guide to setup a local warp-plugins development and test environment.

First you need to install [yalc](https://github.com/wclr/yalc) globally.

```bash
yarn global add yalc
```

After that you need to clone the the warp-contracts repo to the location of your choice in your fs,

```bash
git clone https://github.com/warp-contracts/warp.git
```

Now we need to build the repo and publish it to local registery using yalc,

```bash
cd warp
yarn
yarn yalc:publish
```

After that clone this repo to the location of your choice in your fs,

```bash
git clone https://github.com/fco-fbatch/warp-contracts-plugins.git
```

After that add the previously built and published warp-contracts module from local registery and build the repo,

```bash
yalc add warp-contracts
yarn --network-timeout 1000000000
```

`--network-timeout` is necessary because yarn is pretty slow working with local `file:` dependencies (which yack creates and uses), just give it time to build on my system it took 5-10minutes (yes really)

After that we are ready to publish our previously built plugins to local registery. Just choose a plugin of your choice and publish it,

```bash
cd warp-contracts-plugin-fetch
yarn yalc:publish
```

And you are done with setting up warp plugins development envrionment.

## Local Project

Now that we are done with setting up the environment we can try our packages. Lets create a new project first,

```bash
mkdir your-cool-project-name
yarn init -y
yalc add warp-contracts
yalc add warp-contracts-plugin-fetch
yarn
```

After this point you can test the plugin (check the /examples of this repo for a starting point.)

Note that you need to import the plugin and attach it to the warp instance as follows,

```js
import { WarpFactory } from "warp-contracts";
import { FetchExtension } from "warp-contracts-plugin-fetch";

const warp = WarpFactory.forMainnet().use(new FetchExtension());
```
