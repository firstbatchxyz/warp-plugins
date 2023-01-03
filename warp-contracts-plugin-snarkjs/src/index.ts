import { WarpPlugin, WarpPluginType } from "warp-contracts";
import { groth16 } from "snarkjs";

export class SnarkjsExtension implements WarpPlugin<any, void> {
  process(input: any): void {
    input.groth16 = groth16;
  }

  type(): WarpPluginType {
    return "smartweave-extension-snarkjs";
  }
}
