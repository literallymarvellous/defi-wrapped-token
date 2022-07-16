import { Event } from "ethers";
import { Suspense, useEffect, useState } from "react";
import Spinner from "./spinner";

export const Loading = () => {
  return (
    <div className="w-full flex justify-center mt-44 sm:mt-28">
      <Spinner />
    </div>
  );
};

const EventDisplay = ({ event }: { event: Event }) => {
  const [data, setData] = useState({
    date: "",
    hash: "",
    from: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);

      const date = await event.getBlock();
      const dateString = new Date(date.timestamp * 1000).toLocaleString();
      const tx = await event.getTransaction();
      setData((p) => ({
        ...p,
        date: dateString,
        hash: tx.hash,
        from: tx.from,
      }));
      setLoading(false);
    };

    if (!cancelled) {
      fetchData();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {data.from && data.hash && data.date && (
        <div className=" text-sm p-2 border-t border-gray-400">
          <div className="flex flex-col text-sm">
            <span className="text-gray-600 font-semibold">Hash</span>
            <span className="font-bold break-words">{data.hash}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-gray-600 font-semibold">From</span>
            <span className="font-bold break-words">{data.from}</span>
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-gray-600 font-semibold">Date</span>
            <span className="font-bold">{data.date}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDisplay;
