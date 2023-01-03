import { WarpPlugin, WarpPluginType } from "warp-contracts";
import fetch from "node-fetch";

export class FetchExtension implements WarpPlugin<any, void> {
  process(input: any): void {
    input.fetch = fetch;
  }

  type(): WarpPluginType {
    return "smartweave-extension-fetch";
  }
}
