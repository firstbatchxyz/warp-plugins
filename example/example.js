import { WarpFactory, LoggerFactory } from "warp-contracts";
import { FetchExtension } from "warp-contracts-plugin-fetch";
import fs from "fs/promises";
import path from "path";

async function main() {
  //const wallet = readJSON("./.secrets/jwk.json");

  const wallet = await fs.readFile(
    path.join(__dirname, "../wallet.json"),
    "utf8"
  );

  LoggerFactory.INST.logLevel("error");
  const warp = WarpFactory.forMainnet().use(new FetchExtension());

  const jsContractSrc = await fs.readFile(
    path.join(__dirname, "./contracts/fetch-contract.js"),
    "utf8"
  );

  const { contractTxId } = await warp.deploy({
    wallet,
    initState: JSON.stringify({ count: 0 }),
    src: jsContractSrc,
  });

  console.log(contractTxId);

  const contract = warp.contract(contractTxId).connect(wallet);

  await contract.writeInteraction({
    function: "test",
  });

  const { cachedValue } = await contract.readState();

  console.log("state: ", cachedValue.state);
}

main();
