import { ethers } from "ethers";
import wbtcABI from "./wtbcABI.json";

export const wbtcAddress = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";

export const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/e5f57e3684bf43068b71f7a25887cd46"
);
export const getBlockNumber = async () => {
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
};

export const contract = new ethers.Contract(wbtcAddress, wbtcABI, provider);
