import { WarpPlugin, WarpPluginType } from "warp-contracts";
import { groth16, plonk } from "snarkjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class SnarkjsExtension implements WarpPlugin<any, void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  process(input: any): void {
    input.groth16 = groth16;
    input.plonk = plonk;
  }

  type(): WarpPluginType {
    return "smartweave-extension-snarkjs";
  }
}
