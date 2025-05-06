import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FiltersSidebar from '../components/FiltersSidebar';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

export async function getServerSideProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }) {
  const [filters, setFilters] = useState({
    customizable: false,
    category: [],
    occasion: [],
    priceRange: [],
    rating: [],
    availability: [],
  });

  const [sortOption, setSortOption] = useState('recommended');
  const [showFilters, setShowFilters] = useState(true);

  return (
    <>
      <Head>
        <title>Product Listing Page</title>
      </Head>
      <main className={styles.container}>
        <Header />
        <Hero />
        <section className={styles.mainContent}>
          <div className={styles.filterToggleWrapper}>
            <button
              className={styles.filterToggleButton}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          <FiltersSidebar
            products={products}
            filters={filters}
            setFilters={setFilters}
            showFilters={showFilters}
          />
          <ProductGrid
            products={products}
            filters={filters}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </section>
        <Footer />
      </main>
    </>
  );
}