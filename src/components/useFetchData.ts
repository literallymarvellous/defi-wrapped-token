import React, { useEffect, useMemo, useState } from "react";
import { Event } from "ethers";

let data = {
  datesS: "",
  hash: "",
  from: "",
};

const fetchData = async (event: Event) => {
  try {
    const date = await event.getBlock();
    const dateString = new Date(date.timestamp * 1000).toLocaleString();
    const tx = await event.getTransaction();
    data = { ...data, datesS: dateString, hash: tx.hash, from: tx.from };
  } catch (error) {
    console.log(error);
  }
};

const useFetchData = (event: Event) => {
  fetchData(event);

  if (!data.datesS || data.hash || data.from) {
    console.log("hey");
  }

  return { data };
};

export default useFetchData;
