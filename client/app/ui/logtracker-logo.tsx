import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { GitBranchPlus, GitCommitHorizontal } from "lucide-react";

export default function LogTrackerLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GitBranchPlus className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[20px] mx-4">Log Tracker</p>
    </div>
  );
}
