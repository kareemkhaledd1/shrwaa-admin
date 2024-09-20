import Sidebar from "@/ui/Sidebar";
import Header from "@/ui/Header";
import ProtectedRoute from "@/ui/ProtectedRoute";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute adminOnly>
      <div className="grid h-screen grid-cols-[16rem_1fr] grid-rows-[auto_1fr]">
        <Header />
        <Sidebar />

        <main className="bg-gray-100 py-[4rem] px-[4.8rem] overflow-scroll">
          <div className="max-w-[70rem] mx-auto flex flex-col gap-[1rem]">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default Layout;
