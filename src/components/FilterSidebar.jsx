import React from "react";
import "../styles/components/FilterSidebar.css";

export default function FilterSidebar({
    filters,
    setFilters,
    prices,
    brands,
    onClearFilters
}) {
    const handleBrandChange = (brand) => {
        const newBrands = filters.brands.includes(brand)
            ? filters.brands.filter((b) => b !== brand)
            : [...filters.brands, brand];
        setFilters({ ...filters, brands: newBrands });
    };
    const handlePriceChange = (range) => {
        // Toggle logic: if already selected, clear it (optional, usually radio for ranges or multi-select)
        // Let's implement radio-style behavior for simplicity or check logic if we want multi-select ranges.
        // For Myntra style, it's usually checkboxes. Let's stick to single range or simple min/max later.
        // For now: Checkboxes that add up? Or just one exclusive range?
        // Let's go with exclusive radio for simplicity for now, or checkboxes that are "OR".

        // Actually, let's do checkboxes for brands and radio for price ranges to avoid complex overlap logic for now.
        setFilters({ ...filters, priceRange: range });
    };
    return (
        <aside className="filter-sidebar">
            <div className="filter-header">
                <h3>Filters</h3>
                <button className="clear-btn" onClick={onClearFilters}>
                    CLEAR ALL
                </button>
            </div>
            <div className="filter-section">
                <h4>Price</h4>
                {prices.map((price) => (
                    <label key={price.label} className="filter-option">
                        <input
                            type="radio"
                            name="price"
                            checked={filters.priceRange === price.value}
                            onChange={() => handlePriceChange(price.value)}
                        />
                        <span className="checkmark radio"></span>
                        {price.label}
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h4>Brand</h4>
                <div className="brand-list">
                    {brands.map((brand) => (
                        <label key={brand} className="filter-option">
                            <input
                                type="checkbox"
                                checked={filters.brands.includes(brand)}
                                onChange={() => handleBrandChange(brand)}
                            />
                            <span className="checkmark"></span>
                            {brand}
                        </label>
                    ))}
                </div>
            </div>
            <div className="filter-section">
                <h4>Rating</h4>
                {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="filter-option">
                        <input
                            type="radio"
                            name="rating"
                            checked={filters.minRating === rating}
                            onChange={() => setFilters({ ...filters, minRating: rating })}
                        />
                        <span className="checkmark radio"></span>
                        {rating}★ & above
                    </label>
                ))}
            </div>
        </aside>
    );
}
