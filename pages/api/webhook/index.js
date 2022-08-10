import { Stripe } from 'stripe';

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
        const rawBody = await buffer(req);
        const signature = req.headers["stripe-signature"];

        event = stripe.webhooks.constructEvent(
            rawBody.toString(),
            signature,
            "whsec_3ecc28c71b7052a3ae6fa2fdc9811771124b97f6ac5b1c26d3c5167cf35233dc"
            // process.env.STRIPE_WEBHOOK_SECRET,
        );

        console.log("Success Event Created:", event.id);

        if (event.type === "checkout.session.completed") {
            console.log("PAYMENT RECEIVED");
            const session = event.data.object;
        // Note that you'll need to add an async prefix to this route handler
        const { line_items } = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ["line_items"],
          }
        );
        console.log(session);
            
        };

        res.json({received: true})
    }
     catch (err) {
        console.log("Error message:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
}