import { Event } from "ethers";
import { useEffect, useState } from "react";

import { contract } from "../utils/ethersSetup";
import EventDisplay from "./EventDisplay";

const EventList = () => {
  const [mintEvents, setMintEvents] = useState<Event[]>();
  const [burnEvents, setBurnEvents] = useState<Event[]>();

  useEffect(() => {
    let cancelled = false;

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

    if (!cancelled) {
      getMintEvents();
      getBurnEvents();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-full flex gap-2">
      <div className="w-1/2">
        <h2 className="text-2xl font-bold pb-2">Mint events</h2>
        {mintEvents?.map((event) => (
          <div key={event.transactionHash}>
            <EventDisplay event={event} />
          </div>
        ))}
      </div>

      <div className="w-1/2">
        <h2 className="text-2xl font-bold pb-2">Burn events</h2>
        {burnEvents?.map((event) => (
          <div key={event.transactionHash}>
            <EventDisplay event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
