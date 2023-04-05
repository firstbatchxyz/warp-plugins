import { WarpPlugin, WarpPluginType } from 'warp-contracts';
import 'warp-isomorphic';

const Fetch = async (url: string) => {
  const response = await fetch(url);
  return await response.text();
};

const rustImports = (helpers) => {
  return {
    __wbg_Fetch: function (arg0, arg1) {
      const ret = Fetch(helpers.getStringFromWasm0(arg0, arg1));
      return helpers.addHeapObject(ret);
    }
  };
};

export class FetchExtension implements WarpPlugin<any, void> {
  process(input: any): void {
    input.fetch = {
      fetch,
      Fetch,
      rustImports
    };
  }

  type(): WarpPluginType {
    return 'smartweave-extension-fetch';
  }
}
