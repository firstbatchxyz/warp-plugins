# Snarkjs Plugin for Warp Contracts

[Snarkjs](https://github.com/iden3/snarkjs/blob/master/README.md) extension for warp contracts, allowing one to verify proofs within a Warp smart-contract.

Note that:

- `v0.1.x` uses SnarkJS `v0.6.x`
- `v0.2.x` uses SnarkJS `v0.7.x`

You might want to make sure that the client that is generating the proofs has the same minor version.

## Installation

```bash
yarn add warp-contracts-plugin-snarkjs
```

## Usage

```js
import { WarpFactory } from "warp-contracts";
import { SnarkjsExtension } from "warp-contracts-plugin-snarkjs";

const warp = WarpFactory.forMainnet().use(new SnarkjsExtension());
```

Then, use `groth16` or `plonk` within the smart-contract as:

```js
SmartWeave.extensions.groth16;
SmartWeave.extensions.plonk;
```
