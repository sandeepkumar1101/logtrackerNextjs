import Search from "@/app/ui/search";
import Table from "@/app/ui/logs/table";
import { lusitana } from "@/app/ui/fonts";
import { LogsTableSkelton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { CustomDatePicker } from "@/app/ui/logs/date-picker";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    message?: string;
    level?: string;
    resourceId?: string;
    traceId?: string;
    spanId?: string;
    commit?: string;
    parentResourceId?: string;
    page?: string;
  };
}) {
  const query = { ...searchParams };
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="w-full text-white">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Logs</h1>
      </div>
      <div className="mt-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:mt-8">
        <Search filterKey="level" placeholder="Level..." />
        <Search filterKey="message" placeholder="Message..." />
        <Search filterKey="resourceId" placeholder="ResourceId..." />
        <Search filterKey="traceId" placeholder="TraceId..." />
        <Search filterKey="spanId" placeholder="SpanId..." />
        <Search filterKey="commit" placeholder="Commit..." />
        <CustomDatePicker className="bg-gray-800" />
        <Search
          filterKey="parentResourceId"
          placeholder="ParentResourceId..."
        />
      </div>
      <Suspense key={currentPage} fallback={<LogsTableSkelton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
