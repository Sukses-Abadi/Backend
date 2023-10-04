const stripe = require("stripe")(
  "sk_test_51Nw69kFzErKAgD5nIo7s005lkR3tXuBSiscK1jyc0Ia2RAVwndel265bbjpIJuKpausKNTrXu6e3H1VjSMYi8Tsl004g5fV861"
);
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { id, total_payment } = req.body;
  console.log(req.body);
  const productName = `Order #${id.toString().padStart(7, "0")}`;
  const priceInCents = +total_payment * 100;
  const product = await stripe.products.create({
    name: productName,
    type: "good",
  });

  console.log(`Product created: ${product.id}`);

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: priceInCents, // Amount in cents
    currency: "idr", // Set currency to IDR
  });

  console.log(`Price created for product ${product.id}: ${price.id}`);
  const items = [{ price: price.id, quantity: 1 }];
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout/success/${id}`,
    cancel_url: `${process.env.CLIENT_URL}/checkout/cancel/`,
  });
  // console.log(session);
  res.json({ id: session.id, url: session.url });
});
module.exports = router;
