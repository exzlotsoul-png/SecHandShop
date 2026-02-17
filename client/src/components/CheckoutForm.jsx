import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/user";
import usesechandStore from "../store/sechand-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const token = usesechandStore((state) => state.token);
  const clearCart = usesechandStore((state) => state.clearCart);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (payload.error) {
      setMessage(payload.error.message);
      toast.error(payload.error.message);
    } else if (payload.paymentIntent?.status === "succeeded") {
      saveOrder(token, payload)
        .then(() => {
          clearCart();
          toast.success("ชำระเงินสำเร็จ!");
          navigate("/user/history");
        })
        .catch((err) => console.log(err));
    } else {
      toast.warning("ชำระเงินไม่สำเร็จ");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          ชำระเงิน
        </h2>
        <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
          <button
            className="w-full bg-[#c9795e] hover:bg-[#724333] text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            {isLoading ? (
              <span className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full mx-auto"></span>
            ) : (
              "ชำระเงิน"
            )}
          </button>
          {message && <div className="text-red-500 text-sm text-center">{message}</div>}
        </form>
      </div>
    </div>
  );
}
