// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-800 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-800" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-800 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-gray-500 px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-800" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevLogChartSkelton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-800" />
      <div className="rounded-xl bg-gray-800 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md  bg-gray-700 p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-800" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-800" />
        </div>
      </div>
    </div>
  );
}

export function LogsSkelton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-800 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-800" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-800" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-800" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-800" />
    </div>
  );
}

export function LatestLogSkelton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 lg:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-800" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-800 p-4">
        <div className="bg-gray-700 px-6">
          <LogsSkelton />
          <LogsSkelton />
          <LogsSkelton />
          <LogsSkelton />
          <LogsSkelton />
          <div className="flex items-center pb-2 pt-6">
            <div className="h-5 w-5 rounded-full bg-gray-800" />
            <div className="ml-2 h-4 w-20 rounded-md bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-800`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <LatestLogSkelton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-800 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-800"></div>
          <div className="h-6 w-24 rounded bg-gray-800"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-800"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-800"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-800"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-800"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-800"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-800"></div>
        </div>
      </td>
    </tr>
  );
}

export function LogsMobileSkelton() {
  return (
    <div className="mb-2 w-full rounded-md bg-gray-700 p-4">
      <div className="flex items-center justify-between border-b border-gray-800 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-800"></div>
          <div className="h-6 w-16 rounded bg-gray-800"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-800"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-800"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-800"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-800"></div>
          <div className="h-10 w-10 rounded bg-gray-800"></div>
        </div>
      </div>
    </div>
  );
}

export function LogsTableSkelton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-80 p-2 md:pt-0">
          <div className="md:hidden">
            <LogsMobileSkelton />
            <LogsMobileSkelton />
            <LogsMobileSkelton />
            <LogsMobileSkelton />
            <LogsMobileSkelton />
            <LogsMobileSkelton />
          </div>
          <table className="hidden min-w-full text-gray-800 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
