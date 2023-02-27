# Custom Warp Contracts Plugin Snarkjs

[Snarkjs](https://github.com/iden3/snarkjs/blob/master/README.md) extension for warp contracts.

## Installation

```bash
yarn add warp-contracts-plugin-snarkjs
```

## Using the plugins in the project

```js
import { WarpFactory } from "warp-contracts";
import { SnarkjsExtension } from "warp-contracts-plugin-snarkjs";

const warp = WarpFactory.forMainnet().use(new SnarkjsExtension());
```

You can cascade the plugins (use multiple plugins) like this,

```js
const warp = WarpFactory.forMainnet()
  .use(new FetchExtension())
  .use(new SnarkjsExtension());
```
