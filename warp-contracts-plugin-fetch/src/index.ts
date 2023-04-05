import { WarpPlugin, WarpPluginType } from 'warp-contracts';
import 'warp-isomorphic';

const rust_fetch = async (url: string) => {
  const response = await fetch(url);
  return await response.text();
};

const rustImports = (helpers) => {
  return {
    __wbg_rustfetch: function (arg0, arg1) {
      const ret = rust_fetch(helpers.getStringFromWasm0(arg0, arg1));
      return helpers.addHeapObject(ret);
    }
  };
};

export class FetchExtension implements WarpPlugin<any, void> {
  process(input: any): void {
    input.fetch = {
      fetch,
      rust_fetch,
      rustImports
    };
  }

  type(): WarpPluginType {
    return 'smartweave-extension-fetch';
  }
}
