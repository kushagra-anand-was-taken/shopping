const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51Hly6dGagzp60v4F615yVqERZ7x4AcXqdOWZnLrKt6I2r6qXPpD8NwkODNLcub2n1qTv59DKujcp6acP6zqH5aZl00JhjN827k"
);

router.post("/", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { data, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotency_key = data.transaction_id;
    const charge = await stripe.charges.create(
      {
        amount: data.amount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased Something for sure`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

module.exports = router;
