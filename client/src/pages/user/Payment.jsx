import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import usesechandStore from "../../store/sechand-store";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const token = usesechandStore((s) => s.token);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true); // ใช้สำหรับแสดงสถานะการโหลด
  const [error, setError] = useState(null); // ใช้สำหรับจัดการข้อผิดพลาด

  useEffect(() => {
    payment(token)
      .then((res) => {
        console.log("API Response:", res.data); // เช็คค่าที่ได้
        setClientSecret(res.data.clientSecret);
        setLoading(false);
      })
      .catch((err) => {
        console.log("API Error:", err.response ? err.response.data : err.message);
        setError("ไม่สามารถดึงข้อมูลการชำระเงินได้");
        setLoading(false);
      });
  }, [token]);
  

  const appearance = {
    theme: "stripe",
  };

  if (loading) {
    return <div>Loading...</div>; // แสดงข้อความขณะโหลดข้อมูล
  }

  if (error) {
    return <div>{error}</div>; // แสดงข้อความเมื่อเกิดข้อผิดพลาด
  }

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
