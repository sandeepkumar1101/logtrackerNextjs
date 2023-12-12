"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { formatDateToLocal } from "@/app/lib/utils";
import InvoiceStatus from "../logs/status";

type Log = {
  _id: string;
  timestamp: string;
  message: string;
  level: string;
  resourceId: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: {
    parentResourceId: string;
  };
};

const sampleLog = [
  {
    _id: "1",
    level: "error",
    message: "Failed to connect to DB",
    resourceId: "server-1234",
    timestamp: "2023-09-15T08:00:00Z",
    traceId: "abc-xyz-123",
    spanId: "span-456",
    commit: "5e5342f",
    metadata: { parentResourceId: "server-1234" },
  },
];

export default function LogStreamer({ api_url }: { api_url: string }) {
  const [logs, setLogs] = useState<Log[]>([]);

  const handleLogData = async () => {
    const res = await fetch(`${api_url}/api/v1/logs/latestLogs?limit=3`);
    const data = await res.json();
    console.log(data);
    return data?.data;
  };

  useEffect(() => {
    // Connect to the server using Socket.IO
    const socket = io(api_url);
    handleLogData().then((res) => {
      setLogs(res);
    });

    // Listen for log updates from the server

    socket.on("logUpdate", (log) => {
      // Update the logs state with the new log
      console.log(log, "comes from client");
      // i want prevLogs at the end of the array
      setLogs((prevLogs) => [...prevLogs, log]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to ensure the effect runs only once during component mount

  return (
    <div className="flex w-full flex-col ">
      <h2 className={`${lusitana.className}  text-white text-xl md:text-2xl`}>
        Latest Log Feed Realtime
      </h2>
      <div className="mt-4 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-800 h-[600px] overflow-scroll p-2 border-2 border-gray-600 md:pt-0">
            <div className="md:hidden">
              {logs.map((log, i) => (
                <div
                  key={"key-logger" + i}
                  className="mb-2 w-full rounded-md bg-gray-800 p-4"
                >
                  <div className="flex text-white items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>
                          <span className="text-xs">message</span>
                          {" - "}
                          {log.message}
                        </p>
                      </div>
                      <p className="text-sm text-white">
                        {log.metadata.parentResourceId}
                      </p>
                    </div>
                    <div className="text-sm flex flex-row gap-3">
                      <span>level</span>
                      <InvoiceStatus status={log.level} />
                    </div>
                  </div>
                  <div className="flex w-full items-center text-gray-400 justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        <span className="text-xs">spanId</span>
                        {" - "}
                        {log.spanId}
                      </p>
                      <p>{formatDateToLocal(log.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-white   md:table">
              <thead className="rounded-lg text-left text-sm font-normal i">
                <tr>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Level
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Message
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    resourceId
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    traceId
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    spanId
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    commit
                  </th>
                  <th
                    scope="col"
                    className="px-3 flex flex-col gap-1 py-5 font-medium"
                  >
                    <span>metadata</span>
                    <span>parentResourceId</span>
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    timestamp
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 ">
                {logs.map((log) => (
                  <tr
                    key={log._id}
                    className="w-full text-white border-b border-gray-500 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-1 py-3">
                      <InvoiceStatus status={log.level} />
                    </td>
                    <td className="whitespace-nowrap text-xs py-3 pl-2 pr-3">
                      {log.message}
                    </td>
                    <td className="whitespace-nowrap text-xs py-3 pl-2 pr-3">
                      {log.resourceId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {log.traceId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {log.spanId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {log.commit}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {log.metadata.parentResourceId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(log.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
