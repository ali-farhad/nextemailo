import { loadStripe } from "@stripe/stripe-js";

export async function checkout({lineItems}) {
    let stripePromise = null;

    const getStripe =  async () => {
        if(!stripePromise) {
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
        }
        return stripePromise;
    }

    const stripe = await getStripe();

    await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems,
        successUrl: `${window.location.origin}/?status=success`,
        cancelUrl: `${window.location.origin}/?status=cancel`,
        //run function when payment is successful
        onSuccess: async (result) => {
            console.log(result);
        }

    })
}