import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded yet.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      elements.submit();

      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        throw new Error("Failed to fetch clientSecret.");
      }

      console.log("Client Secret:", clientSecret);

      // Confirm the payment after form submission
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:3000/pages/success-payement",
        },
      });

      if (error) {
        console.log("Payment failed", error.message);
        setErrorMessage(error.message);
      } else {
        console.log("Payment successful!");
      }
    } catch (error) {
      console.log("Error processing payment:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
      <h2 className="m-5 font-semibold">Amount to Pay: ${amount}</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <PaymentElement />
        <button
          className="bg-black text-white p-2 rounded-lg mt-2 w-full"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
}
