import { Event } from "ethers";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

import { contract } from "../utils/ethersSetup";

const EventDisplay = dynamic(() => import("../components/EventDisplay"), {
  suspense: true,
  ssr: false,
});

const EventList = () => {
  const [mintEvents, setMintEvents] = useState<Event[]>();
  const [burnEvents, setBurnEvents] = useState<Event[]>();

  const getMintEvents = async (from?: number, to?: number) => {
    const events = await contract.queryFilter(
      contract.filters.Mint(),
      from,
      to
    );
    const data = events.reverse().slice(0, 20);
    setMintEvents(data);
  };

  const getBurnEvents = async (from?: number, to?: number) => {
    const events = await contract.queryFilter(
      contract.filters.Burn(),
      from,
      to
    );

    const data = events.reverse().slice(0, 20);
    setBurnEvents(data);
  };

  useEffect(() => {
    let cancelled = false;

    if (!cancelled) {
      getMintEvents();
      getBurnEvents();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex">
      <div className="w-1/2">
        <h2>Mint events</h2>
        {mintEvents?.map((event) => (
          <div key={event.transactionHash}>
            <Suspense fallback={<div>Loading...</div>}>
              <EventDisplay event={event} />
            </Suspense>
          </div>
        ))}
      </div>

      <div className="w-1/2">
        <h2>Burn events</h2>
        {burnEvents?.map((event) => (
          <div key={event.transactionHash}>
            <Suspense fallback={<div>Loading...</div>}>
              <EventDisplay event={event} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
