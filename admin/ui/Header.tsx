import UserAvatar from "@/ui/UserAvatar";
import HeaderMenu from "@/ui/HeaderMenu";

function Header() {
  return (
    <header className="bg-white py-[1rem] px-[4.8rem] border-b border-gray-100">
      <div className="flex gap-6 justify-end items-center font-semibold text-lg text-gray-600">
        <UserAvatar />
        <HeaderMenu />
      </div>
    </header>
  );
}

export default Header;
