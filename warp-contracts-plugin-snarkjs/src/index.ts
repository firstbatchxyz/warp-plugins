import { WarpPlugin, WarpPluginType } from "warp-contracts";
import snarkjs from "snarkjs";

export class SnarkjsExtension implements WarpPlugin<any, void> {
  process(input: any): void {
    input.snarkjs = snarkjs;
  }

  type(): WarpPluginType {
    return "smartweave-extension-snarkjs";
  }
}
