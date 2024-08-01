import Logo from "@/ui/Logo";
import NavList from "@/ui/NavList";

function Sidebar() {
  return (
    <aside className="border-r border-gray-200 px-8 h-screen ml-2.5">
      <Logo />
      <NavList />
    </aside>
  );
}

export default Sidebar;
