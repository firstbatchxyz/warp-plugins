export async function handle(state, action) {
  if (action.input.function === "test") {
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
