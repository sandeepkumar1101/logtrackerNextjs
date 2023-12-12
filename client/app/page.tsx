import Image from "next/image";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-40 shrink-0 items-end rounded-lg border-2 border-gray-600 bg-gray-800 p-4">
        {/* <AcmeLogo /> */}
        <Image
          src="/logo.png"
          width={150}
          height={180}
          className=""
          alt="LogTracker"
        />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg border-2 border-gray-600 bg-gray-800 px-6 py-10 md:w-2/5 md:px-20">
          <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-white border-l-transparent border-r-transparent" />
          <p
            className={`${lusitana.className} text-xl text-white md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to LogTracker.</strong>
            <p>Track and analyse your logs</p>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-gray-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-600 md:text-base"
          >
            <span>Log in</span>
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/mobile.png"
            width={540}
            height={540}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop and mobile versions"
          />
          <Image
            src="/mobile.png"
            width={560}
            height={620}
            className="md:hidden"
            alt="Screenshots of the dashboard project showing desktop and mobile versions"
          />
        </div>
      </div>
    </main>
  );
}
