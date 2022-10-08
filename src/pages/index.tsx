import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import GlobalStats from "./components/GlobalStats";
import Sidepane from "./components/Sidepane";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className="flex h-screen w-screen items-stretch justify-start overflow-hidden">
      <Sidepane />
      <main className="flex h-screen w-full flex-col">
        <GlobalStats />
        <section className="bg-neutral-50">
          list of cryotos exchanges (top 10)
        </section>
        <section className="bg-slate-100">crypto news</section>
      </main>
    </div>
  );
};

export default Home;
