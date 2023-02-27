# Custom Warp Contracts Plugin Fetch

[node-fetch](https://github.com/node-fetch/node-fetch/blob/main/README.md) extension for warp contracts.

## Installation

```bash
yarn add warp-contracts-plugin-fetch
```

## Using the plugins in the project

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
