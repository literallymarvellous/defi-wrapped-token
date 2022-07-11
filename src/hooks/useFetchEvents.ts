import { EventFilter } from "ethers";
import React, { useEffect, useState } from "react";
import { contract, getBlockNumber } from "../utils/ethersSetup";

const getMintEvents = async (lb: number, filter: EventFilter) => {
  let mintEvents: any[] = [];
  let toBlock = lb;
  let fromBlock = 14500000;
  let tt = 0;
  console.log("fetch");

  for (let i = toBlock; i > fromBlock; i -= 10000) {
    let _fromBlock = i - 10000;
    const events = await contract.queryFilter(filter, _fromBlock, i);
    tt += events.length;
    console.log("total", tt);
    console.log("even", events);
    console.log("len", mintEvents.length);
    mintEvents = [...mintEvents, ...events];
  }
  return mintEvents;
};

const useFetchEvents = (eventName: string) => {
  const [latestBlock, setlatestBlock] = useState(0);
  const [events, setEvents] = useState<any[]>([]);

  getBlockNumber().then((res) => {
    setlatestBlock(res);
  });

  const filter =
    eventName === "Mint" ? contract.filters.Mint() : contract.filters.Burn();

  useEffect(() => {
    getMintEvents(latestBlock, filter).then((res) => {
      setEvents(res);
    });
  }, []);

  return { events };
};

export default useFetchEvents;
