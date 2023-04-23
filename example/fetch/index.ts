import { WarpFactory, LoggerFactory, JWKInterface } from "warp-contracts";
import { FetchExtension } from "warp-contracts-plugin-fetch";
import { ArweaveSigner, DeployPlugin } from "warp-contracts-plugin-deploy";
import fs from "fs/promises";
import path from "path";

async function main() {
  // Load your wallet
  const wallet = JSON.parse(
    await fs.readFile(path.join(__dirname, "../.secrets/wallet.json"), "utf8")
  ) as JWKInterface;

  // Create a WarpFactory instance and use the FetchExtension
  LoggerFactory.INST.logLevel("error");
  const warp = WarpFactory.forMainnet().use(new FetchExtension());

  // Use existing contract
  // // https://sonar.warp.cc/#/app/contract/v-9uVdXBhfYiohOOdwdWLnOROSL9Ycx1mAqjRTBxDY4#code
  const contractTxId = "v-9uVdXBhfYiohOOdwdWLnOROSL9Ycx1mAqjRTBxDY4";

  // Interact with the contract
  const contract = warp.contract(contractTxId).connect(wallet);
  await contract.writeInteraction({
    function: "test",
  });

  // Read the state
  const { cachedValue } = await contract.readState();
  console.log("state: ", cachedValue.state);
}

async function mainWithDeploy() {
  // Load your wallet
  const wallet = JSON.parse(
    await fs.readFile(path.join(__dirname, "../.secrets/wallet.json"), "utf8")
  ) as JWKInterface;

  // Load the contract source
  const contractSrc = await fs.readFile(
    path.join(__dirname, "./contract.js"),
    "utf8"
  );

  // Create a WarpFactory instance and use the FetchExtension
  LoggerFactory.INST.logLevel("error");
  const warp = WarpFactory.forMainnet()
    .use(new DeployPlugin())
    .use(new FetchExtension());

  // Deploy the contract
  const { contractTxId } = await warp.deploy({
    wallet: new ArweaveSigner(wallet),
    initState: JSON.stringify({ arr: [] }),
    src: contractSrc,
  });

  console.log("Contract:", contractTxId);

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
