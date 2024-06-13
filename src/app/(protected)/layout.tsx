import { validateRequest } from "@/lib/auth/verifyAccount";
import Header from "@/components/protected/Header";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await validateRequest();
  if (!result || result.user === null) {
    redirect("/auth/login");
  }
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
