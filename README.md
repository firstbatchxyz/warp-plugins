# Custom Warp Contracts Plugins

This is a monorepo that includes all the FirstBatch custom warp plugins and examples.

## Installation

```bash
yarn add warp-contracts-plugin-fetch
yarn add warp-contracts-plugin-snarkjs
```

## Usage

All you need to do is import the plugin as you normally do with packages installed with npm or yarn.

```js
import { WarpFactory } from "warp-contracts";
import { FetchExtension } from "warp-contracts-plugin-fetch";

const warp = WarpFactory.forMainnet().use(new FetchExtension());
```

You can cascade the plugins (use multiple plugins) like this,

```js
const warp = WarpFactory.forMainnet()
  .use(new FetchExtension())
  .use(new SnarkjsExtension());
```

Check the [example folder](./example/) for example usage.
