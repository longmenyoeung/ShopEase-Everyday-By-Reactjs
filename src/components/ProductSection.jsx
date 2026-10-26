import { ArrowRight, SearchX } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductSection({
  products,
  categories,
  category,
  onCategory,
  query,
  favoritesOnly,
  expanded,
  onExpand,
  onReset,
}) {
  const title = favoritesOnly
    ? 'Your saved favorites.'
    : query
      ? `Results for “${query}”`
      : 'Fresh finds. Instant favorites.';
  return (
    <section className="section products-section" id="collection" aria-labelledby="products-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">JUST LANDED</span>
          <h2 id="products-title">{title}</h2>
        </div>
        <button className="text-button" onClick={onExpand}>
          {expanded ? 'Show less' : 'View all products'} <ArrowRight size={16} />
        </button>
      </div>
      <div className="product-tabs" aria-label="Filter products by category">
        {[{ id: 'all', name: 'All finds' }, ...categories].map((item) => (
          <button
            key={item.id}
            className={category === item.id ? 'active' : ''}
            aria-pressed={category === item.id}
            onClick={() => onCategory(item.id, false)}
          >
            {item.name}
          </button>
        ))}
        {(query || favoritesOnly) && (
          <button className="clear-filters" onClick={onReset}>
            Clear filters ×
          </button>
        )}
      </div>
      {products.length ? (
        <div className="product-grid">
          {(expanded ? products : products.slice(0, 4)).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <SearchX size={32} />
          <h3>No finds just yet.</h3>
          <p>
            {favoritesOnly
              ? 'Tap the heart on a product to save it here.'
              : 'Try a different search or browse the full collection.'}
          </p>
          <button className="button button-small" onClick={onReset}>
            Explore all products
          </button>
        </div>
      )}
    </section>
  );
}
