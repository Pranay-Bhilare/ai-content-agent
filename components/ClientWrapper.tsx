"use client";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "./ConvexWithClerkWrapper";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
       {children}
    </ConvexClientProvider  >
  );
}
