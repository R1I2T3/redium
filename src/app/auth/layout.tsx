import { validateRequest } from "@/lib/auth/verifyAccount";
import AuthHeader from "@/components/auth/AuthHeader";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await validateRequest();
  if (result && result.user !== null) {
    redirect("/");
  }
  return (
    <>
      <AuthHeader />
      <main className="flex min-h-[90dvh] flex-col justify-center items-center">
        {children}
      </main>
    </>
  );
}
