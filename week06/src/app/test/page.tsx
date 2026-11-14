"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();

  if (session) {
    console.log(session);
  }

  return null;
}
