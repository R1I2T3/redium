import AuthHeader from "@/components/auth/AuthHeader";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthHeader />
      <main className="flex min-h-[90dvh] flex-col justify-center items-center">
        {children}
      </main>
    </>
  );
}
