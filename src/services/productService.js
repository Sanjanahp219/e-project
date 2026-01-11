import axios from "axios";

const categories = [
  // Women
  "women's dresses", // Note: DummyJSON categories might usage spaces or dashes. I'll usage the slugs I verified earlier to be safe.
  "womens-dresses",
  "womens-shoes",
  "womens-bags",
  "womens-jewellery",
  "womens-watches",
  "tops",
  "beauty",
  "skin-care",
  "fragrances",

  // Men
  "mens-shirts",
  "mens-shoes",
  "mens-watches",

  // Others
  "laptops",
  "smartphones",
  "tablets",
  "mobile-accessories",
  "furniture",
  "home-decoration",
  "groceries",
  "sunglasses",
  "vehicle",
  "motorcycle",
  "sports-accessories",
  "kitchen-accessories"
];

const fetchAllByCategory = async (category) => {
  let allProducts = [];
  let skip = 0;
  const limit = 30;


  console.log('called api');
  

  while (true) {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
      );

      if (res.data.products.length === 0) break;

      allProducts = allProducts.concat(res.data.products);

      if (res.data.products.length < limit) break;

      skip += limit;
    } catch (err) {
      console.warn(`Failed to fetch category ${category}`, err);
      break;
    }
  }

  return allProducts;
};

export const fetchProducts = async () => {
  // Use Promise.allSettled to avoid one failure breaking everything
  const results = await Promise.allSettled(
    categories.map(cat => fetchAllByCategory(cat))
  );

  const merged = results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value)
    .flat();

  // Convert USD prices to INR (multiply by 83)
  const productsInINR = merged.map(product => ({
    ...product,
    price: Math.round(product.price * 83)
  }));

  console.log("TOTAL PRODUCTS:", productsInINR.length);
  return productsInINR;
};
