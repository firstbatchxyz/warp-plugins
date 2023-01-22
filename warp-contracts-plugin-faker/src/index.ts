import { WarpPlugin, WarpPluginType } from "warp-contracts";
import { faker } from "@faker-js/faker";

export class FakerExtension implements WarpPlugin<any, void> {
  process(input: any): void {
    input.faker = faker;
  }

  type(): WarpPluginType {
    return "smartweave-extension-faker";
  }
}
