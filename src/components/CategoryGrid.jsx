import { ArrowUpRight } from 'lucide-react';

export default function CategoryGrid({ categories, activeCategory, onSelect }) {
  return (
    <section className="categories section" aria-labelledby="categories-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A LITTLE OF EVERYTHING</span>
          <h2 id="categories-title">Find your kind of favorite.</h2>
        </div>
        <span className="section-note">Good things, all in one place.</span>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <button
            className={`category-card ${activeCategory === category.id ? 'selected' : ''}`}
            key={category.id}
            onClick={() => onSelect(category.id)}
            aria-pressed={activeCategory === category.id}
          >
            <div className={`category-image category-${category.id}`}>
              <img src={category.image} alt="" loading="lazy" />
            </div>
            <div className="category-label">
              <span>
                <strong>{category.name}</strong>
                <small>Explore collection</small>
              </span>
              <span className="category-arrow">
                <ArrowUpRight size={19} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
