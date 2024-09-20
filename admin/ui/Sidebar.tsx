import Logo from "@/ui/Logo";
import NavList from "@/ui/NavList";

function Sidebar() {
  return (
    <aside className="bg-grey-0 p-8 border-r border-grey-100 row-span-full flex flex-col gap-8">
      <Logo />
      <NavList />
    </aside>
  );
}

export default Sidebar;
