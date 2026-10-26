import { Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/format';
import Modal from './Modal';

export default function CartDrawer() {
  const { cart, cartCount, subtotal, cartOpen, setCartOpen, updateQuantity } = useShop();
  return (
    <Modal
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      title={`Your bag (${cartCount})`}
      drawer
    >
      {cart.length ? (
        <>
          <div className="shipping-message">
            <Truck size={18} />
            {subtotal >= 75
              ? 'Your order qualifies for free shipping.'
              : `You’re ${formatPrice(75 - subtotal)} away from free shipping.`}
          </div>
          <div className="cart-items">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{formatPrice(item.price)}</p>
                  <div className="quantity-control">
                    <button
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase quantity of ${item.name}`}
                      disabled={item.quantity >= 99}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button
                  className="icon-button remove-item"
                  aria-label={`Remove ${item.name} from bag`}
                  onClick={() => updateQuantity(item.id, 0)}
                >
                  <Trash2 size={17} />
                </button>
              </article>
            ))}
          </div>
          <div className="cart-summary">
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p>Shipping and taxes will be calculated at checkout.</p>
            <div className="demo-notice">
              You’re exploring a demo storefront. Checkout will be available when the backend is
              connected.
            </div>
            <button className="button" onClick={() => setCartOpen(false)}>
              Continue shopping
            </button>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <ShoppingBag size={42} strokeWidth={1.3} />
          <h3>A little room for something good.</h3>
          <p>Your bag is empty. Find your next everyday favorite.</p>
          <button className="button" onClick={() => setCartOpen(false)}>
            Keep exploring
          </button>
        </div>
      )}
    </Modal>
  );
}
