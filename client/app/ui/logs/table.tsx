import Image from "next/image";
import LogStatus from "@/app/ui/logs/status";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchLogs } from "@/app/lib/data";
import Pagination from "./pagination";
import SortColumn from "./sortCol";

export default async function LogsTable({
  query,
  currentPage,
}: {
  query: {
    message?: string;
    level?: string;
    resourceId?: string;
    traceId?: string;
    spanId?: string;
    commit?: string;
    parentResourceId?: string;
  };
  currentPage: number;
}) {
  const logs = await fetchLogs(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-800 text-white p-2 md:pt-0">
          <div className="md:hidden">
            {logs?.data?.map((log) => (
              <div
                key={log._id}
                className="mb-2 w-full rounded-md bg-gray-600 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <span>Message- </span> <p>{log.message}</p>
                    </div>
                    <div className="text-sm text-white">
                      <p className="flex flex-row flex-wrap gap-2">
                        <span>spanId [{log.spanId}]</span>
                        <span>commit [{log.commit}]</span>
                        <span>traceId [{log.traceId}]</span>
                      </p>
                    </div>
                  </div>
                  <LogStatus status={log.level} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      <span className="text-sm">metadata</span>{" "}
                      {log.metadata.parentResourceId}
                    </p>
                    <p>{formatDateToLocal(log.timestamp)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-white bg-gray-800 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  <SortColumn filterKey="level" />
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Message
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <SortColumn filterKey="resourceId" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  traceId
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <SortColumn filterKey="spanId" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  commit
                </th>
                <th
                  scope="col"
                  className="px-3 flex flex-col gap-1 py-5 font-medium"
                >
                  <span className="text-sm">metadata</span>
                  <SortColumn filterKey="parentResourceId" />
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  <SortColumn filterKey="timestamp" />
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              {logs.data.map((log) => (
                <tr
                  key={log._id}
                  className="w-full border-b  border-gray-600 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-1 py-3">
                    <LogStatus status={log.level} />
                  </td>
                  <td className="whitespace-nowrap text-xs py-3 pl-2 pr-3">
                    {log.message}
                  </td>
                  <td className="whitespace-nowrap text-xs py-3 pl-2 pr-3">
                    {log.resourceId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{log.traceId}</td>
                  <td className="whitespace-nowrap px-3 py-3">{log.spanId}</td>
                  <td className="whitespace-nowrap px-3 py-3">{log.commit}</td>
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
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={logs.totalPage} />
      </div>
    </div>
  );
}
