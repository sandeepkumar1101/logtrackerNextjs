import CardWrapper, { Card } from "@/app/ui/dashboard/cards";

import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import { Suspense } from "react";
import { CardSkeleton } from "@/app/ui/skeletons";
import LogStreamer from "@/app/ui/dashboard/log-streamer";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main>
      <h1
        className={`${lusitana.className} text-white mb-4 text-xl md:text-2xl`}
      >
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-2 grid grid-cols-1 h-[600px]">
        <h1 className="test-white">Latest Logs Feed</h1>
        <LogStreamer
          api_url={process.env.LOG_API_URL || "http://localhost:3000"}
        />
      </div>
    </main>
  );
}
