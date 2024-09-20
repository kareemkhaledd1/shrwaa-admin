function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center gap-6 bg-gray-100">
      {children}
    </main>
  );
}

export default LoginLayout;
