import { ethers } from "ethers";
import wbtcABI from "./wtbcABI.json";

export const wbtcAddress = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";

export const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/e5f57e3684bf43068b71f7a25887cd46"
);
export const getBlockNumber = async () => {
  const blockNumber = await provider.getBlockNumber().then((res) => res);
  return blockNumber;
};

export const contract = new ethers.Contract(wbtcAddress, wbtcABI, provider);

export const getMintEvents = async () => {
  const latestBlock = await getBlockNumber();
  let mintEvents: any[] = [];
  let toBlock = latestBlock;
  let fromBlock = 14500000;

  for (let i = fromBlock; i < toBlock; i += 10000) {
    const _fromBlock = i;
    const _toBlock = Math.min(i + 10000, toBlock);
    const events = await contract.queryFilter(
      contract.filters.Mint(),
      _fromBlock,
      _toBlock
    );
    console.log("even", events);
    console.log("len", mintEvents.length);
    mintEvents = [...mintEvents, ...events];
  }
  return mintEvents;
};

export const getEvents = async (from: number, to: number) => {
  const events = await contract.queryFilter(contract.filters.Mint(), from, to);
  return events;
};
