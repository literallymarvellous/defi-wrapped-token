import { Event } from "ethers";
import { Suspense, useEffect, useState } from "react";

const EventDisplay = ({ event }: { event: Event }) => {
  const [hash, setHash] = useState("");
  const [from, setFrom] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    event.getBlock().then((block) => {
      const date = new Date(block.timestamp * 1000);
      setDate(date.toLocaleString());
    });
    event.getTransaction().then((tx) => {
      setHash(tx.hash);
      setFrom(tx.from);
    });
  }, []);

  return (
    <>
      {from && hash && date && (
        <div className=" text-sm p-2 border-t border-gray-400">
          <div className="flex flex-col text-sm">
            <span className="text-gray-600 font-semibold">Hash</span>
            <span className="font-bold">{hash}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-gray-600 font-semibold">From</span>
            <span className="font-bold">{from}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-gray-600 font-semibold">Date</span>
            <span className="font-bold">{date}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDisplay;
