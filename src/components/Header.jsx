import { useState } from 'react';
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag, Tag, Truck, X } from 'lucide-react';
import Brand from './Brand';
import { useShop } from '../context/ShopContext';

export default function Header({ onCategory, onFavorites, onSearch, favoritesOnly }) {
  const { cartCount, favorites, setCartOpen } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const navigate = (category) => {
    onCategory(category);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="announcement">
        <div className="page-container announcement-inner">
          <span>
            <Truck size={17} />
            <span>
              <strong>FREE SHIPPING</strong> on orders over $75
            </span>
          </span>
          <span className="announcement-offer">
            <Tag size={16} />
            <span>
              A little extra joy. <strong>Up to 50% off selected finds.</strong>
            </span>
          </span>
          <a href="#deal">
            Discover the deals <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <header className="header page-container">
        <Brand />
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <button onClick={() => navigate('all')}>
            New in <span className="nav-dot" />
          </button>
          <button onClick={() => navigate('women')}>Women</button>
          <button onClick={() => navigate('men')}>Men</button>
          <button onClick={() => navigate('home')}>Home & living</button>
          <a className="deals-link" href="#deal" onClick={() => setMenuOpen(false)}>
            Deals
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={21} />
          </button>
          <button
            className={`icon-button favorites-button ${favoritesOnly ? 'active' : ''}`}
            aria-label={`Show favorites, ${favorites.length} saved products`}
            aria-pressed={favoritesOnly}
            onClick={onFavorites}
          >
            <Heart size={21} />
            {favorites.length > 0 && <span className="count-badge">{favorites.length}</span>}
          </button>
          <span className="action-divider" />
          <button
            className="icon-button"
            aria-label={`Open shopping bag, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={21} />
            <span className="cart-count">{cartCount}</span>
          </button>
          <button
            className="icon-button menu-button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {searchOpen && (
        <form
          className="search-bar page-container"
          onSubmit={(event) => {
            event.preventDefault();
            onSearch(query);
          }}
        >
          <Search size={20} />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find your next favorite…"
            aria-label="Search the collection"
          />
          <button className="button button-small" type="submit">
            Search
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            <X size={19} />
          </button>
        </form>
      )}
    </>
  );
}
