import { WarpPlugin, WarpPluginType } from "warp-contracts";
import { groth16 } from "snarkjs"; //TODO add { plonk }

export class SnarkjsExtension implements WarpPlugin<any, void> {
  process(input: any): void {
    input.groth16 = groth16;
    //input.plonk = plonk;
  }

  type(): WarpPluginType {
    return "smartweave-extension-snarkjs";
  }
}
