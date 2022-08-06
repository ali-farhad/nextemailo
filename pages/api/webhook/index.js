import Stripe from "@stripe/react-stripe-js";

import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
    api: {
        bodyParser: false
    }
};


export default async function handler(req, res) {
    let event;
    try {
        const rawbody = await buffer(req);
        const signature = req.headers["stripe-signature"];

        event = stripe.webhooks.constructEvent(
            rawbody.toString(),
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        console.log("Success Event Created:", event.id);

        if (event.type === "checkout.session.completed") {
            console.log("PAYMENT RECEIVED");
        };
    }
     catch (err) {
        console.log("Error message:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
}