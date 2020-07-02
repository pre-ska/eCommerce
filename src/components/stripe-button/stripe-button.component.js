import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_x9rPYMlgaj9DsNEzpFpbs9ES00uCUxhLoQ";

  const onToken = token => {
    console.log(token);
    alert("Payment successful");
  };

  return (
    <StripeCheckout
      name="eCommerce Test Ltd." // the pop-in header title
      shippingAddress
      billingAddress={false}
      label="Pay Now" // text inside the Stripe button
      description={`Your total is $${price}`} // the pop-in header subtitle
      image="https://stripe.com/img/documentation/checkout/marketplace.png" // the pop-in header image (default none)
      amount={priceForStripe} // cents
      panelLabel="Pay Now" // prepended to the amount in the bottom pay button
      token={onToken} // submit callback
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
