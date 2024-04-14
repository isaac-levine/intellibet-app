import React from "react";
import CheckoutButton from "@/app/checkout/CheckoutButton";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function Checkout() {
  const session = await getServerSession(authOptions);
  let user = null;

  if (session?.user?.email) {
    user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
  }

  return (
    <>
      <Header user={user} />
      <MaxWidthWrapper>
        <h1>Checkout</h1>
      </MaxWidthWrapper>
    </>
  );
}
