"use client";

import Layout from "@/ui/Layout";
import { useGetUsers } from "@/hooks/useGetUsers";
import Row from "@/ui/Row";
import UserTable from "@/components/user/UserTable";
import UserTableOperations from "@/components/user/UserTableOperations";

function UserPage() {
  const { users } = useGetUsers();

  console.log(users);
  return (
    <Layout>
      <>
        <Row type="horizontal">
          <h1 className="font-semibold text-slate-700 text-3xl tracking-wider uppercase">
            All users
          </h1>
          <UserTableOperations />
        </Row>

        <Row>
          <UserTable />
        </Row>
      </>
    </Layout>
  );
}

export default UserPage;
