"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import Spinner from "@/ui/Spinner";

function ProtectedRoute({
  children,
  adminOnly = false,
  delegateOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
  delegateOnly?: boolean;
}) {
  const router = useRouter();
  const { isPending, isAuthenticated, role } = useUser();

  useEffect(() => {
    if (isPending) return;

    if (!isAuthenticated) {
      router.push("/login");
    } else {
      handleRedirection();
    }
  }, [isAuthenticated, role, router, isPending, adminOnly, delegateOnly]);

  const handleRedirection = () => {
    if (adminOnly && role !== "admin") {
      router.push("/delegate-dashboard");
    } else if (delegateOnly && role !== "delegate") {
      router.push("/");
    }
  };

  if (isPending)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  return isAuthenticated ? <>{children}</> : null;
}

export default ProtectedRoute;
