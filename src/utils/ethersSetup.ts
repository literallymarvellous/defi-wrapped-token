import { BigNumber, ethers } from "ethers";
import wbtcABI from "./wtbcABI.json";

export const wbtcAddress = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";

export const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ALCHEMY
);
export const getBlockNumber = async () => {
  const blockNumber = await provider.getBlockNumber().then((res) => res);
  return blockNumber;
};

export const contract = new ethers.Contract(wbtcAddress, wbtcABI, provider);

export const getMintEvents = async (from?: number, to?: number) => {
  const events = await contract.queryFilter(contract.filters.Mint(), from, to);
  return events;
};

export const getBurnEvents = async (from?: number, to?: number) => {
  const events = await contract.queryFilter(contract.filters.Burn(), from, to);
  return events;
};
