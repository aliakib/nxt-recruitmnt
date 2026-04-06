import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export const metadata: Metadata = {
  title: "Recruitment Dashboard | Manage Candidates & Jobs",
  description: "A modern recruitment dashboard to manage candidates, job postings, and hiring workflows efficiently. Built with Next.js and designed for scalable SaaS applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-8 bg-zinc-50">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
