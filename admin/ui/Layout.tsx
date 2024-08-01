import Sidebar from "@/ui/Sidebar";
import Header from "@/ui/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh overflow-hidden ">
      <Sidebar />

      <main className="flex-1 grid grid-rows-[auto,1fr]">
        <Header />
        <div className="bg-slate-100 py-[2.6rem] px-[2.6rem] overflow-scroll">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
