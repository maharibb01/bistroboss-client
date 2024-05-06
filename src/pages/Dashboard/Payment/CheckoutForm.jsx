import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const [transectionId, setTransectionId] = useState('');

    const [clientSecret, setClientSecret] = useState('')

    const stripe = useStripe();
    const elements = useElements();

    const axiosSecure = useAxiosSecure();

    const [cart, refetch] = useCart();
    // console.log(cart);

    const price = cart.reduce((total, item) => total + item.price, 0)
    console.log(price);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post("/create-payment-intent", { price: price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if (error) {
            console.log("payment error", error);
            setError(error.message)
        }
        else {
            console.log("payment method", paymentMethod);
            setError("");
        }

        // confirm card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "unknown",
                    name: user?.displayName || "unknown"
                }
            }
        })
        if (confirmError) {
            console.log("confirm error", confirmError);
        }
        else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                setTransectionId(paymentIntent.id)
                const payment = {
                    email: user.email,
                    price: price,
                    transectionId: paymentIntent.id,
                    date: new Date(),
                    cartId: cart.map(item => item._id),
                    menuItemId: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post("/payments", payment)
                console.log('data saved', res.data);
                refetch();
                if(res.data?.paymentResult?.insertedId){
                    navigate("/dashboard/paymentHistory")
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                // options={{
                //     style: {
                //         base: {
                //             fontSize: '16px',
                //             color: '#424770',
                //             '::placeholder': {
                //                 color: '#aab7c4',
                //             },
                //         },
                //         invalid: {
                //             color: '#9e2146',
                //         },
                //     },
                // }}
                className="bg-white p-5 mb-5 text-black placeholder-black"
            />
            <button type="submit" className="btn btn-outline text-white" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {
                transectionId && <p className="text-green-600">{transectionId}</p>
            }
        </form>
    );
};

export default CheckoutForm;