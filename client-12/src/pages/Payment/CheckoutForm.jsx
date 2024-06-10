// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const CheckoutForm = ({ product, user, title, name }) => {
//     const [error, setError] = useState('');
//     const [clientSecret, setClientSecret] = useState('');
//     const [transactionId, setTransactionId] = useState('');
//     const stripe = useStripe();
//     const elements = useElements();
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         // Fetch client secret for payment intent
//         if (product && product.price > 0) {
//             axiosSecure.post('/create-payment-intent', { price: product.price })
//                 .then(res => {
//                     console.log(res.data.clientSecret);
//                     setClientSecret(res.data.clientSecret);
//                 })
//                 .catch(err => {
//                     console.error("Error fetching client secret:", err);
//                 });
//         }
//     }, [axiosSecure, product]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const card = elements.getElement(CardElement);

//         if (!card) {
//             return;
//         }

//         try {
//             // Create payment method
//             const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card
//             });

//             if (paymentError) {
//                 console.error('Payment error:', paymentError);
//                 setError(paymentError.message);
//                 return;
//             }

//             // Confirm card payment
//             const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: card,
//                     billing_details: {
//                         email: user?.email || 'anonymous',
//                         name: user?.displayName || 'anonymous'
//                     }
//                 }
//             });

//             if (confirmError) {
//                 console.error('Confirm error:', confirmError);
//                 return;
//             }

//             // Payment successful
//             console.log('Payment intent:', paymentIntent);
//             if (paymentIntent.status === 'succeeded') {
//                 console.log('Transaction id:', paymentIntent.id);
//                 setTransactionId(paymentIntent.id);

//                 // Save the payment in the database
//                 const payment = {
//                     email: user.email,
//                     price: product.price,
//                     productId: product._id,
//                     title: title,
//                     name: name,
//                     transactionId: paymentIntent.id,
//                     date: new Date(),
//                     status: 'pending' // Change status if needed
//                 };

//                 const res = await axiosSecure.post('/payments', payment);
//                 console.log('Payment saved:', res.data);
//                 // Show SweetAlert on successful payment
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: "Thank you for the payment",
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//             }
//         } catch (err) {
//             console.error('Error processing payment:', err);
//             setError('Error processing payment. Please try again later.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement
//                 options={{
//                     style: {
//                         base: {
//                             fontSize: '16px',
//                             color: '#424770',
//                             '::placeholder': {
//                                 color: '#aab7c4',
//                             },
//                         },
//                         invalid: {
//                             color: '#9e2146',
//                         },
//                     },
//                 }}
//             />
//             <button className="btn btn-sm btn-primary my-4" type="submit" >
//                 Pay
//             </button>
//             <p className="text-red-600">{error}</p>
//             {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
//         </form>
//     );
// };

// export default CheckoutForm;
