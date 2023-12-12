import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function LogStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-red-500 text-white": status === "error",
          "bg-yellow-600 text-white": status === "warning",
          "bg-green-500 text-white": status === "info",
        }
      )}
    >
      {status === "error" ? (
        <>
          {status}
          <ClockIcon className="ml-1 w-4" />
        </>
      ) : null}
      {status === "warning" ? (
        <>
          {status}
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "info" ? (
        <>
          {status}
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
