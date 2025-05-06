import styles from '../styles/Home.module.scss';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, filters, sortOption, setSortOption }) {
  // Define price ranges for filtering
  const priceRanges = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: 'Over $500', min: 500, max: Infinity },
  ];

  // Define rating ranges for filtering
  const ratingRanges = [
    { label: '4 Stars & Up', min: 4, max: 5 },
    { label: '3 Stars & Up', min: 3, max: 5 },
    { label: '2 Stars & Up', min: 2, max: 5 },
  ];

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

  // Sort products based on the selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'priceLowToHigh') {
      return a.price - b.price;
    } else if (sortOption === 'priceHighToLow') {
      return b.price - a.price;
    } else if (sortOption === 'ratingHighToLow') {
      return b.rating.rate - a.rating.rate;
    }
    return 0;
  });

  return (
    <div className={styles.productsGridWrapper}>
      <div className={styles.sortBar}>
        <label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="recommended">RECOMMENDED</option>
            <option value="newestFirst">NEWEST FIRST</option>
            <option value="priceLowToHigh">PRICE: LOW TO HIGH</option>
            <option value="priceHighToLow">PRICE: HIGH TO LOW</option>
            <option value="ratingHighToLow">RATING: HIGH TO LOW</option>
          </select>
        </label>
      </div>
      <div className={styles.productsGrid}>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}