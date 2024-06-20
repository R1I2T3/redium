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
      <main className="px-4 pt-4 mb-[100px] md:mb-10">{children}</main>
    </>
  );
}
