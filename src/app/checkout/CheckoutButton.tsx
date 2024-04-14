import React, { useState } from "react";
import { createCheckoutLink } from "@/lib/stripe";

function CheckoutButton({ user }: { user: any }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    const checkoutUrl = await createCheckoutLink(user.stripe_customer_id);
  };

  return (
    <button onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? "Loading..." : "Go to Checkout"}
    </button>
  );
}

export default CheckoutButton;
