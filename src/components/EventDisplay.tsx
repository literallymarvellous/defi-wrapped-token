import { Event } from "ethers";
import { Suspense, useEffect, useState } from "react";

const EventDisplay = ({ event }: { event: Event }) => {
  const [hash, setHash] = useState("");
  const [from, setFrom] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    event.getBlock().then((block) => {
      const date = new Date(block.timestamp * 1000);
      console.log(date.toLocaleString());
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
        <>
          <div>From : {from}</div>
          <div>Hash : {hash}</div>
          <div>Date: {date}</div>
        </>
      )}
    </>
  );
};

export default EventDisplay;
