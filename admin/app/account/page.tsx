"use client";

import Layout from "@/ui/Layout";
import Row from "@/ui/Row";
import { useUser } from "@/hooks/useUser";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";

function Page() {
  const { user } = useUser();

  return (
    <Layout>
      <>
        <Row>
          <h1 className="text-3xl font-semibold text-center text-slate-700 mb-5 tracking-wider uppercase">
            Profile page
          </h1>
          <Form>
            <FormRow label="Email address">
              <input
                value={user?.email || ""}
                disabled
                className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
              />
            </FormRow>

            <FormRow label="Username">
              <input
                value={user?.username || ""}
                disabled
                className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
              />
            </FormRow>

            <FormRow label="Role">
              <input
                value={user?.role || ""}
                disabled
                className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
              />
            </FormRow>
          </Form>
        </Row>
      </>
    </Layout>
  );
}

export default Page;
