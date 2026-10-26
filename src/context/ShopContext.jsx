import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ShopContext = createContext(null);
const validCart = (value) =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      typeof item.id === 'string' &&
      typeof item.name === 'string' &&
      typeof item.image === 'string' &&
      Number.isFinite(item.price) &&
      item.price >= 0 &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      item.quantity <= 99,
  );
const validFavorites = (value) =>
  Array.isArray(value) && value.every((id) => typeof id === 'string');

export function ShopProvider({ children }) {
  const [cart, setCart] = useLocalStorage('shopease:cart', [], validCart);
  const [favorites, setFavorites] = useLocalStorage('shopease:favorites', [], validFavorites);
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(product) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);
      return existing
        ? items.map((item) =>
            item.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item,
          )
        : [...items, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function updateQuantity(id, quantity) {
    setCart((items) =>
      quantity <= 0
        ? items.filter((item) => item.id !== id)
        : items.map((item) =>
            item.id === id ? { ...item, quantity: Math.min(quantity, 99) } : item,
          ),
    );
  }

  function toggleFavorite(id) {
    setFavorites((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  }

  return (
    <ShopContext.Provider
      value={{
        cart,
        favorites,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQuantity,
        toggleFavorite,
        cartCount: cart.reduce((count, item) => count + item.quantity, 0),
        subtotal: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider');
  return context;
}
