import { WarpFactory, LoggerFactory } from "warp-contracts";
import { FetchExtension } from "warp-contracts-plugin-fetch";
import fs from "fs/promises";
import path from "path";

async function main() {
 
  // Load your wallet
  const wallet = await fs.readFile(
    path.join(__dirname, "./your-arweave-wallet.json"),
    "utf8"
  );

  // Load the contract source
  const jsContractSrc = await fs.readFile(
    path.join(__dirname, "./contracts/fetch-contract.js"),
    "utf8"
  );

  LoggerFactory.INST.logLevel("error");

  // Create a WarpFactory instance and use the FetchExtension
  const warp = WarpFactory.forMainnet().use(new FetchExtension());

  // Deploy the contract
  const { contractTxId } = await warp.deploy({
    wallet,
    initState: JSON.stringify({ arr: [] }),
    src: jsContractSrc,
  });

  console.log(contractTxId);

  // Interact with the contract
  const contract = warp.contract(contractTxId).connect(wallet);
  await contract.writeInteraction({
    function: "test",
  });

  // Read the state
  const { cachedValue } = await contract.readState();
  console.log("state: ", cachedValue.state);
}

main();
