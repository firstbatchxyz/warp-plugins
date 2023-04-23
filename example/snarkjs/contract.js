export async function handle(state, action) {
  // Verify a zero-knowledge proof
  if (action.input.function === "test") {
    const { proof, publicSignals } = action.input.data;
    const verificationKey = state.verificationKey;

    //SmartWeave.extensions.<plugin> is the way to access the plugin
    // verificationKey.protocol will be `groth16` or `plonk`
    const isVerified = await SmartWeave.extensions[
      verificationKey.protocol
    ].verify(verificationKey, publicSignals, proof);

    state.isVerified = isVerified;

    return { state };
  }

  throw new ContractError(
    `No function supplied or function not recognised: "${input.function}"`
  );
}
