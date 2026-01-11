import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

const PRICE_RANGES = [
  { label: "Under Rs 500", value: "0-500" },
  { label: "Rs 500 - Rs 1000", value: "500-1000" },
  { label: "Rs 1000 - Rs 2000", value: "1000-2000" },
  { label: "Rs 2000 - Rs 5000", value: "2000-5000" },
  { label: "Over Rs 5000", value: "5000-100000" },
];

export default function ProductList({ gender }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { list, status } = useSelector((state) => state.products);

  // Parse Query Params for Search
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  const [filters, setFilters] = useState({
    priceRange: null,
    brands: [],
    minRating: 0,
  });

  const [sortOrder, setSortOrder] = useState("recommended");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Extract unique brands from the list
  const availableBrands = useMemo(() => {
    const brands = list.map((p) => p.brand).filter(Boolean);
    return [...new Set(brands)].sort();
  }, [list]);

  // Combined Filtering Logic
  const filteredList = useMemo(() => {
    let result = list;

    // 0. Search Filter (if URL param exists)
    if (searchTerm) {
      result = result.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm) ||
        product.category?.name?.toLowerCase().includes(searchTerm) ||
        product.category?.slug?.toLowerCase().includes(searchTerm)
      );
    }

    // 1. Gender Filtering (Existing Logic)
    if (gender) {
      result = result.filter((product) => {
        const category = product.category;
        const categoryName = category?.name ? category.name.toLowerCase() : "";
        const categorySlug = category?.slug ? category.slug.toLowerCase() : "";
        const title = product.title.toLowerCase();
        const description = product.description.toLowerCase();
        const textToCheck = `${title} ${description} ${categoryName} ${categorySlug}`;

        if (gender === "women") {
          return (
            textToCheck.includes("women") ||
            textToCheck.includes("woman") ||
            textToCheck.includes("lady") ||
            textToCheck.includes("dress") ||
            textToCheck.includes("skirt") ||
            textToCheck.includes("female") ||
            category === "beauty" ||
            category === "fragrances" ||
            category === "skin-care" ||
            category === "tops" ||
            category === "womens-dresses" ||
            category === "womens-shoes" ||
            category === "womens-watches" ||
            category === "womens-bags" ||
            category === "womens-jewellery"
          );
        }

        if (gender === "men") {
          const isWomen =
            textToCheck.includes("women") ||
            textToCheck.includes("woman") ||
            textToCheck.includes("female") ||
            textToCheck.includes("skirt") ||
            textToCheck.includes("dress") ||
            textToCheck.includes("makeup") ||
            textToCheck.includes("lipstick") ||
            textToCheck.includes("lotion") ||
            textToCheck.includes("heel") ||
            textToCheck.includes("purse") ||
            category === "beauty" ||
            category === "fragrances" ||
            category === "skin-care" ||
            category === "tops" ||
            category.includes("womens");

          return (
            !isWomen &&
            (category === "mens-shirts" ||
              category === "mens-shoes" ||
              category === "mens-watches" ||
              textToCheck.includes("men") ||
              textToCheck.includes("male") ||
              textToCheck.includes("shirt"))
          );
        }

        if (gender === "other") {
          const isWomen =
            textToCheck.includes("women") ||
            textToCheck.includes("woman") ||
            textToCheck.includes("female") ||
            textToCheck.includes("skirt") ||
            textToCheck.includes("dress") ||
            textToCheck.includes("makeup") ||
            category === "beauty" ||
            category === "fragrances" ||
            category === "skin-care" ||
            category === "tops" ||
            category.includes("womens");
          const isMen =
            category === "mens-shirts" ||
            category === "mens-shoes" ||
            category === "mens-watches" ||
            textToCheck.includes("men") ||
            textToCheck.includes("male") ||
            textToCheck.includes("shirt");
          return !isWomen && !isMen;
        }
        return true;
      });
    }

    // 2. Price Filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // 3. Brand Filter
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // 4. Rating Filter
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    return result;
  }, [list, gender, filters, searchTerm]);


  // Sorting Logic
  const sortedList = useMemo(() => {
    const listCopy = [...filteredList];
    if (sortOrder === "price-low") {
      return listCopy.sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "price-high") {
      return listCopy.sort((a, b) => b.price - a.price);
    }
    if (sortOrder === "rating") {
      return listCopy.sort((a, b) => b.rating - a.rating);
    }
    return listCopy; // "recommended" or default
  }, [filteredList, sortOrder]);

  const clearFilters = () => {
    setFilters({ priceRange: null, brands: [], minRating: 0 });
    setSortOrder("recommended");
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="product-page-container">
      {/* Sidebar */}
      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
        prices={PRICE_RANGES}
        brands={availableBrands}
        onClearFilters={clearFilters}
      />

      {/* Main Content */}
      <div className="product-list-content">
        <div className="sort-bar">
          <span>Sort By: </span>
          <select
            className="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>

        {searchTerm && <h3>Search Results for "{searchTerm}"</h3>}

        <div className="grid">
          {sortedList.length > 0 ? (
            sortedList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found matching your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
