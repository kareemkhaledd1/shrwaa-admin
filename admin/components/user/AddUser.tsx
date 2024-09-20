"use client";

import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import { useRegister } from "@/hooks/useRegister";
import { useState } from "react";

function AddUser({ onCloseModal }: { onCloseModal?: () => void }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const { register, isPending } = useRegister();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username || !email || !password) return;

    register(
      {
        email,
        password,
        username,
        role,
      },
      {
        onSettled: () => {
          setUsername("");
          setEmail("");
          setPassword("");
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label={"username"}>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isPending}
          className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
        />
      </FormRow>
      <FormRow label={"email"}>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
          className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
        />
      </FormRow>
      <FormRow label={"password"}>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
          className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
        />
      </FormRow>

      <FormRow label={"Role"}>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={isPending}
          className="w-full py-2 px-3 bg-gray-100 rounded-md border border-gray-200 focus:outline-none transition-all duration-200"
        >
          <option value="admin">Admin</option>
          <option value="delegate">Delegate</option>
        </select>
      </FormRow>

      <div className="mt-5 flex justify-end">
        <button className="text-gray-500 text-lg  px-5 py-2 rounded-md mr-3">
          Cancel
        </button>

        <button
          type="submit"
          className="bg-orange-500 text-white text-lg  px-5 py-2 rounded-md"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Sign up"}
        </button>
      </div>
    </Form>
  );
}

export default AddUser;
