import React from "react";
import DelegateLayout from "@/ui/DelegateLayout";
import ProtectedRoute from "@/ui/ProtectedRoute";

function Page() {
  return (
    <ProtectedRoute delegateOnly>
      <DelegateLayout>delegate</DelegateLayout>
    </ProtectedRoute>
  );
}

export default Page;
