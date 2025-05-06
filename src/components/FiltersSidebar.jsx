import styles from '../styles/Home.module.scss';

export default function FilterSidebar({ products, filters, setFilters, showFilters }) {
  // Extract unique categories from products
  const categories = [...new Set(products.map((p) => p.category))];

  // Extract occasions from descriptions
  const occasions = [...new Set(products.flatMap((p) => {
    const desc = p.description.toLowerCase();
    const possibleOccasions = ['casual', 'work', 'outdoors'];
    return possibleOccasions.filter((occasion) => desc.includes(occasion));
  }))];

  // Define price ranges
  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: 'Over $500', min: 500, max: Infinity },
  ];

  // Define rating ranges
  const ratingRanges = [
    { label: '4 Stars & Up', min: 4, max: 5 },
    { label: '3 Stars & Up', min: 3, max: 5 },
    { label: '2 Stars & Up', min: 2, max: 5 },
  ];

  // Define availability options
  const availabilityOptions = [
    { label: 'In Stock', value: 'inStock' },
    { label: 'Out of Stock', value: 'outOfStock' },
  ];

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (filterType === 'customizable') {
        newFilters.customizable = !prev.customizable;
      } else {
        const currentValues = prev[filterType];
        if (currentValues.includes(value)) {
          newFilters[filterType] = currentValues.filter((v) => v !== value);
        } else {
          newFilters[filterType] = [...currentValues, value];
        }
      }
      return newFilters;
    });
  };

  // Filter products based on current filters
  const filteredProducts = products.filter((product) => {
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false;
    }
    if (filters.occasion.length > 0) {
      const desc = product.description.toLowerCase();
      const matchesOccasion = filters.occasion.some((occasion) => desc.includes(occasion));
      if (!matchesOccasion) return false;
    }
    if (filters.priceRange.length > 0) {
      const matchesPrice = filters.priceRange.some((rangeLabel) => {
        const range = priceRanges.find((r) => r.label === rangeLabel);
        return product.price >= range.min && product.price < range.max;
      });
      if (!matchesPrice) return false;
    }
    if (filters.rating.length > 0) {
      const matchesRating = filters.rating.some((ratingLabel) => {
        const range = ratingRanges.find((r) => r.label === ratingLabel);
        return product.rating.rate >= range.min && product.rating.rate <= range.max;
      });
      if (!matchesRating) return false;
    }
    if (filters.availability.length > 0) {
      const isOutOfStock = product.rating.count < 20;
      const wantsInStock = filters.availability.includes('inStock');
      const wantsOutOfStock = filters.availability.includes('outOfStock');
      if (wantsInStock && isOutOfStock) return false;
      if (wantsOutOfStock && !isOutOfStock) return false;
    }
    return true;
  });

  return (
    <aside className={`${styles.sidebar} ${!showFilters ? styles.hidden : ''}`}>
      <h4>{filteredProducts.length} ITEMS</h4>
      <div className={styles.filterSection}>
        <label>
          <input
            type="checkbox"
            checked={filters.customizable}
            onChange={() => handleFilterChange('customizable')}
          /> CUSTOMIZABLE
        </label>
        <div>
          <p><strong>CATEGORY</strong></p>
          <p
            className={styles.unselect}
            onClick={() => setFilters((prev) => ({ ...prev, category: [] }))}
          >
            Unselect all
          </p>
          {categories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleFilterChange('category', category)}
              /> {category}
            </label>
          ))}
        </div>
        <div>
          <p><strong>OCCASION</strong> </p>
          <p
            className={styles.unselect}
            onClick={() => setFilters((prev) => ({ ...prev, occasion: [] }))}
          >
            Unselect all
          </p>
          {occasions.map((occasion) => (
            <label key={occasion}>
              <input
                type="checkbox"
                checked={filters.occasion.includes(occasion)}
                onChange={() => handleFilterChange('occasion', occasion)}
              /> {occasion}
            </label>
          ))}
        </div>
        <div>
          <p><strong>PRICE RANGE</strong> </p>
          <p
            className={styles.unselect}
            onClick={() => setFilters((prev) => ({ ...prev, priceRange: [] }))}
          >
            Unselect all
          </p>
          {priceRanges.map((range) => (
            <label key={range.label}>
              <input
                type="checkbox"
                checked={filters.priceRange.includes(range.label)}
                onChange={() => handleFilterChange('priceRange', range.label)}
              /> {range.label}
            </label>
          ))}
        </div>
        <div>
          <p><strong>RATING</strong> </p>
          <p
            className={styles.unselect}
            onClick={() => setFilters((prev) => ({ ...prev, rating: [] }))}
          >
            Unselect all
          </p>
          {ratingRanges.map((range) => (
            <label key={range.label}>
              <input
                type="checkbox"
                checked={filters.rating.includes(range.label)}
                onChange={() => handleFilterChange('rating', range.label)}
              /> {range.label}
            </label>
          ))}
        </div>
        <div>
          <p><strong>AVAILABILITY</strong></p>
          <p
            className={styles.unselect}
            onClick={() => setFilters((prev) => ({ ...prev, availability: [] }))}
          >
            Unselect all
          </p>
          {availabilityOptions.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                checked={filters.availability.includes(option.value)}
                onChange={() => handleFilterChange('availability', option.value)}
              /> {option.label}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}