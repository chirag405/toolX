// "use client";

import { ClerkProvider } from "@clerk/nextjs";
// import { SchematicProvider } from "@schematichq/schematic-react";
// import SchematicWrapped from "./SchematicWrapped";

export default function ChildWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const publishableKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLIC_KEY;
  // if (!publishableKey) {
  //   console.log("Missing NEXT_PUBLIC_SCHEMATIC_PUBLIC_KEY");
  //   throw new Error("Missing NEXT_PUBLIC_SCHEMATIC_PUBLIC_KEY");
  // }
  return (
    <ClerkProvider>
      {/* <SchematicProvider */}
      {/* // publishableKey={process.env.NEXT_PUBLIC_SCHEMATIC_PUBLIC_KEY!} */}
      {/* > */}
      {/* <SchematicWrapped> */}
      {children}
      {/* </SchematicWrapped> */}
      {/* </SchematicProvider> */}
    </ClerkProvider>
  );
}
