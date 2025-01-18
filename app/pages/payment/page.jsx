"use client";

import CheckoutForm from "../../components/ChekoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  if (!amount) {
    return <div>Error: Amount is missing!</div>;
  }

  console.log(amount);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY
  );

  const options = {
    mode: "payment",
    amount: Math.round(amount * 100),
    currency: "usd",
  };

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
}
