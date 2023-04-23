import { WarpFactory, LoggerFactory, JWKInterface } from "warp-contracts";
import { SnarkjsExtension } from "warp-contracts-plugin-snarkjs";
import { ArweaveSigner, DeployPlugin } from "warp-contracts-plugin-deploy";
import fs from "fs/promises";
import path from "path";
const snarkjs = require("snarkjs");

const WASM_PATH = "./multiplier_3/circuit.wasm";
const PROVER_KEY_PATH = "./multiplier_3/prover_key.zkey";
const VERIFICATION_KEY_PATH = "./multiplier_3/verification_key.json";

/**
 * Generate a multiplication proof, where the prover proves that they know 3 factors that make up the resulting number.
 * For example, `3, 11, 7` results in 231. Prover tells that they know factors of 231 without showing them.
 * @param factors 3 numbers, the circuit will compute the multiplication of these while hiding the inputs
 * @param protocol `groth16` or `plonk`
 * @returns a proof and an array of public signals
 */
async function generateProof(
  factors: [number, number, number],
  protocol: "groth16" | "plonk"
): Promise<{ proof: object; publicSignals: string[] }> {
  return await snarkjs[protocol].fullProve(
    {
      in: factors,
    },
    path.join(__dirname, WASM_PATH),
    path.join(__dirname, PROVER_KEY_PATH)
  );
}

async function main() {
  // Load your wallet
  const wallet = JSON.parse(
    await fs.readFile(path.join(__dirname, "../.secrets/wallet.json"), "utf8")
  ) as JWKInterface;

  // Create a WarpFactory instance and use the FetchExtension
  LoggerFactory.INST.logLevel("error");
  const warp = WarpFactory.forMainnet().use(new SnarkjsExtension());

  // Use existing contract
  // // https://sonar.warp.cc/#/app/contract/kLLJyW14e2MEpZIXUVO86XXQZMP-kcXnE2wLU3qgyGQ
  const contractTxId = "kLLJyW14e2MEpZIXUVO86XXQZMP-kcXnE2wLU3qgyGQ";

  // Generate zero-knowledge proof
  const { proof, publicSignals } = await generateProof([3, 11, 7], "groth16"); // results in 231

  // Interact with the contract
  const contract = warp.contract(contractTxId).connect(wallet);
  await contract.writeInteraction({
    function: "test",
    data: {
      proof,
      publicSignals,
    },
  });

  // Read the state
  const { cachedValue } = await contract.readState();
  // @ts-ignore
  console.log("state: ", cachedValue.state.isVerified);

  await warp.close();
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

  // Load the verification key source
  const verKey = JSON.parse(
    await fs.readFile(path.join(__dirname, VERIFICATION_KEY_PATH), "utf8")
  );

  // Create a WarpFactory instance and use the FetchExtension
  LoggerFactory.INST.logLevel("error");
  const warp = WarpFactory.forMainnet()
    .use(new DeployPlugin())
    .use(new SnarkjsExtension());

  // Deploy the contract
  const { contractTxId } = await warp.deploy({
    wallet: new ArweaveSigner(wallet),
    initState: JSON.stringify({ verificationKey: verKey, isVerified: false }),
    src: contractSrc,
  });

  console.log("Contract:", contractTxId);

  // Generate zero-knowledge proof
  const { proof, publicSignals } = await generateProof([3, 11, 7], "groth16"); // results in 231

  // Interact with the contract
  const contract = warp.contract(contractTxId).connect(wallet);
  await contract.writeInteraction({
    function: "test",
    data: {
      proof,
      publicSignals,
    },
  });

  // Read the state
  const { cachedValue } = await contract.readState();
  // @ts-ignore
  console.log("state: ", cachedValue.state.isVerified);

  await warp.close();
}

main();
