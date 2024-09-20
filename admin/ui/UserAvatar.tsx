"use client";

import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function UserAvatar() {
  const { user, isPending } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isPending) {
      router.push("/login");
    }
  }, [user, router, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-4">
      <Image
        src={user?.avatar || "/default-user.jpg"}
        alt={"Avatar"}
        width={40}
        height={36}
        className="rounded-full object-cover w-10 h-10"
      />
      <span className="text-sm">{user?.username}</span>
    </div>
  );
}

export default UserAvatar;
