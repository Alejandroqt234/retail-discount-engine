// Retail Discount Engine: Dynamic Pricing Rules and Inventory Cycling

const products = [
  { name: "Wireless Headphones", category: "electronics", price: 79.99, inventory: 8 },
  { name: "T-Shirt", category: "apparel", price: 19.99, inventory: 15 },
  { name: "Rice (5 lb)", category: "groceries", price: 12.49, inventory: 20 },
  { name: "Laundry Detergent", category: "household", price: 14.99, inventory: 10 },
  { name: "Notebook", category: "school", price: 4.99, inventory: 30 } // default case (no discount)
];

for (const product of products) {
  let discount = 0;

  switch (product.category) {
    case "electronics":
      discount = 0.20;
      break;

    case "apparel":
      discount = 0.15;
      break;

    case "groceries":
    case "household":
      discount = 0.10;
      break;

    default:
      discount = 0; // no discount
      break;
  }

  // Store discount info + update price after category discount
  product.categoryDiscount = discount;
  product.discountedPrice = product.price * (1 - discount);
}

console.log("=== Products after category discounts ===");
for (const p of products) {
  console.log(
    `${p.name} (${p.category}) | Original: $${p.price.toFixed(2)} | Discount: ${(p.categoryDiscount * 100).toFixed(0)}% | New: $${p.discountedPrice.toFixed(2)} | Inv: ${p.inventory}`
  );
}

let customerType = "student"; // change to: "regular", "student", or "senior"
let extraDiscount = 0;

if (customerType === "student") {
  extraDiscount = 0.05;
} else if (customerType === "senior") {
  extraDiscount = 0.07;
} else {
  extraDiscount = 0;
}

console.log("\n=== Customer Type Discount ===");
console.log(`Customer Type: ${customerType}`);
console.log(`Extra Discount: ${(extraDiscount * 100).toFixed(0)}%`);

console.log("\n=== Checkout Simulation (3 customers) ===");

for (let customerNumber = 1; customerNumber <= 3; customerNumber++) {
  let total = 0;

  // Simple cart rule: customer buys 1 of each product if available
  for (const product of products) {
    if (product.inventory > 0) {
      const finalPrice = product.discountedPrice * (1 - extraDiscount);
      total += finalPrice;

      // Reduce inventory
      product.inventory--;
    }
  }

  console.log(`Customer #${customerNumber} total: $${total.toFixed(2)}`);
}

console.log("\n=== for...in (Single Product Details) ===");
const oneProduct = products[0];

for (const key in oneProduct) {
  console.log(`${key}: ${oneProduct[key]}`);
}

console.log("\n=== Object.entries() + Destructuring (All Products After Inventory Updates) ===");
for (const product of products) {
  console.log("---- Product ----");
  for (const [key, value] of Object.entries(product)) {
    console.log(`${key}: ${value}`);
  }
}
