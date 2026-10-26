import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import CategoryGrid from './components/CategoryGrid';
import DealBanner from './components/DealBanner';
import ProductSection from './components/ProductSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Modal from './components/Modal';
import { useCatalog } from './hooks/useCatalog';
import { useShop } from './context/ShopContext';

const information = {
  FAQs: 'Browse by category, save your favorites with the heart button, and add items to your bag. Your bag and favorites are saved in this browser. This is a demo storefront; purchases are not available yet.',
  'Shipping & delivery':
    'Our sample offer includes free shipping on orders over $75. Delivery areas, shipping fees, and estimated arrival dates will be confirmed when the store launches.',
  'Returns & refunds':
    'Our planned return window is 30 days. Final eligibility and return instructions will be available when the store launches. No orders or payments are processed in this preview.',
  'Privacy policy':
    'This preview stores your shopping bag and favorites locally in your browser. The newsletter form does not transmit your email address. No payment information is collected. A complete privacy policy will be added before launch.',
  'Terms & conditions':
    'This storefront is a UI demonstration. Products, prices, stock, offers, and contact details are sample content. Orders cannot be placed. Final store terms will be provided before launch.',
  'Follow Shop everyday':
    'Our social channels are coming soon. In the meantime, explore the collection and save your favorite finds.',
};

export default function App() {
  const { data, loading, error, retry } = useCatalog();
  const { favorites } = useShop();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [info, setInfo] = useState(null);

  const scrollToProducts = () =>
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  function selectCategory(id, scroll = true) {
    setCategory(id);
    setQuery('');
    setFavoritesOnly(false);
    setExpanded(id !== 'all');
    if (scroll) scrollToProducts();
  }
  function resetFilters() {
    setCategory('all');
    setQuery('');
    setFavoritesOnly(false);
  }
  const products = (data?.products || []).filter(
    (product) =>
      (category === 'all' || product.category === category) &&
      (!favoritesOnly || favorites.includes(product.id)) &&
      `${product.name} ${product.categoryLabel}`.toLowerCase().includes(query.toLowerCase().trim()),
  );

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        onCategory={selectCategory}
        favoritesOnly={favoritesOnly}
        onFavorites={() => {
          setFavoritesOnly(!favoritesOnly);
          setCategory('all');
          setQuery('');
          setExpanded(true);
          scrollToProducts();
        }}
        onSearch={(value) => {
          setQuery(value);
          setCategory('all');
          setFavoritesOnly(false);
          setExpanded(true);
          scrollToProducts();
        }}
      />
      <main className="page-container" id="main">
        <Hero onExplore={() => selectCategory('all')} />
        <Benefits />
        {loading && (
          <div className="catalog-loading" id="collection" role="status">
            <span className="loading-spinner" />
            Finding your new favorites…
            <div className="skeleton-grid">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} />
              ))}
            </div>
          </div>
        )}
        {error && (
          <div className="empty-state" id="collection" role="alert">
            <h2>A little hiccup.</h2>
            <p>{error}</p>
            <button className="button" onClick={retry}>
              Try again
            </button>
          </div>
        )}
        {data && (
          <>
            <CategoryGrid
              categories={data.categories}
              activeCategory={category}
              onSelect={selectCategory}
            />
            <DealBanner product={data.deal} />
            <ProductSection
              products={products}
              categories={data.categories}
              category={category}
              onCategory={selectCategory}
              query={query}
              favoritesOnly={favoritesOnly}
              expanded={expanded}
              onExpand={() => {
                if (!expanded) resetFilters();
                setExpanded(!expanded);
              }}
              onReset={resetFilters}
            />
          </>
        )}
        <Newsletter />
      </main>
      <Footer onCategory={selectCategory} onInfo={setInfo} />
      <CartDrawer />
      <Modal open={Boolean(info)} onClose={() => setInfo(null)} title={info || 'Store information'}>
        <p className="info-text">{information[info]}</p>
        <button className="button button-small" onClick={() => setInfo(null)}>
          Got it
        </button>
      </Modal>
    </>
  );
}
