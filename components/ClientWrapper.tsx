"use client";

import ConvexClientProvider from "./ConvexWithClerkWrapper";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
