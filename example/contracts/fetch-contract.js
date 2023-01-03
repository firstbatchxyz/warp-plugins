export async function handle(state, action) {
  // Fetch a JSON file from the Arweave network using node-fetch plugin
  if (action.input.function === "test") {

    //SmartWeave.extensions.<plugin> is the way to access the plugin
    const res = await SmartWeave.extensions.fetch(
      "https://arweave.net/zaxEor6T6zqGR6VjWtembtSHQc0lnl0Hr6ZoiGfR4tY"
    );
    const data = await res.json();
    state.arr.push(data);

    return { state };
  }

  throw new ContractError(
    `No function supplied or function not recognised: "${input.function}"`
  );
}
