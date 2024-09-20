"use client";

import React from "react";
import FormRow from "@/ui/FormRow";
import Form from "@/ui/Form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userOptions } from "@/hooks/userOptions";

function AccountInfo() {
  return (
    <Form>
      <FormRow label="Email address">
        <input
          value={""}
          disabled
          className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
        />
      </FormRow>

      <FormRow label="Full name">
        <input
          value={""}
          disabled
          className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
        />
      </FormRow>

      <FormRow label="Role">
        <input
          value={""}
          disabled
          className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
        />
      </FormRow>
    </Form>
  );
}

export default AccountInfo;
