"use client";

import Form from "@/ui/Form";
import LoginLayout from "@/ui/LoginLayout";
import Logo from "@/ui/Logo";
import FormRowVertical from "@/ui/FormRowVertical";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLogin, login } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <LoginLayout>
      <Logo />
      <h4 className="text-3xl font-semibold text-center text-slate-700 tracking-wider uppercase">
        welcome back!
      </h4>
      <div className="mt-5">
        <Form onSubmit={handleSubmit}>
          <FormRowVertical label={"Email Address"}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLogin}
              className="w-[400px] py-2.5 text-sm px-3 border rounded border-gray-300 outline-none transition-all duration-300"
            />
          </FormRowVertical>
          <FormRowVertical label={"Password"}>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLogin}
                className="w-full py-2.5 text-sm px-3 border rounded border-gray-300 outline-none transition-all duration-300"
            />
          </FormRowVertical>
          <FormRowVertical>
            <button
                type="submit"
                className="bg-orange-500 text-white text-lg font-semibold px-5 py-3 rounded-md"
            >
              Login
            </button>
          </FormRowVertical>
        </Form>
      </div>
    </LoginLayout>
  );
}

export default Page;
