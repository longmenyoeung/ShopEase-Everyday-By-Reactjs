import { ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/format';
import { useShop } from '../context/ShopContext';

export default function DealBanner({ product }) {
  const { addToCart } = useShop();
  if (!product) return null;
  return (
    <section className="deal-banner" id="deal" aria-labelledby="deal-title">
      <div className="deal-copy">
        <span className="eyebrow">THE LITTLE UPGRADE YOU DESERVE</span>
        <h2 id="deal-title">
          Big on style.
          <br />
          Small on price.
        </h2>
        <p>One great find. One even better price.</p>
        <button className="text-button" onClick={() => addToCart(product)}>
          Shop the deal <ArrowRight size={18} />
        </button>
      </div>
      <div className="deal-product">
        <div className="deal-image">
          <span className="deal-save">SAVE 50%</span>
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
        <div className="deal-details">
          <span className="eyebrow">YOUR EVERYDAY COMPANION</span>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="deal-price">
            {formatPrice(product.price)} <del>{formatPrice(product.originalPrice)}</del>
          </div>
          <div className="stock-label">
            <span className="stock-dot" />
            Only {product.stock} left at this price
          </div>
          <div className="stock-track">
            <span />
          </div>
          <span className="deal-footnote">A good thing doesn’t last forever.</span>
        </div>
      </div>
    </section>
  );
}
