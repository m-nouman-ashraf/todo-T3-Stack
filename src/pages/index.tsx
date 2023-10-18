import Navbar from "~/components/Navbar";
export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="flex-center w-full flex-col">
        <div className=" mt-10 flex flex-row items-center justify-center">
          <p className="inline-block bg-gradient-to-r from-[#FF5F6D] to-[#FFC371] bg-clip-text text-6xl text-transparent">
            Welcome
          </p>
        </div>
      </section>
    </main>
  );
}
