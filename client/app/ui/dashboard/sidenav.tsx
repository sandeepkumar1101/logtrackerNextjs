import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import LogTrackerLogo from "@/app/ui/logtracker-logo";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 border-gray-600  border-2 md:px-2 bg-black">
      <Link
        className="flex h-20 items-end justify-start rounded-md bg-gray-800 p-4 mb-10"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <LogTrackerLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex gap-2 justify-start space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium text-white hover:bg-gray-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
