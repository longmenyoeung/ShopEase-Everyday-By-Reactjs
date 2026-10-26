import { Heart, Plus, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/format';

export default function ProductCard({ product }) {
  const { addToCart, favorites, toggleFavorite } = useShop();
  const saved = favorites.includes(product.id);
  return (
    <article className="product-card group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
        <span
          className={`absolute top-3 left-3 z-10 rounded-full px-2.5 py-1.5 text-[8px] font-semibold tracking-wider ${product.badge === 'BESTSELLER' ? 'bg-accent-soft text-accent' : 'bg-white/90 text-muted'}`}
        >
          {product.badge || 'NEW'}
        </span>
        <button
          className={`absolute top-2 right-2 z-10 grid size-9 place-items-center rounded-full transition-colors hover:bg-white ${saved ? 'bg-white text-accent' : 'text-muted'}`}
          aria-label={`${saved ? 'Remove' : 'Save'} ${product.name} ${saved ? 'from' : 'to'} favorites`}
          aria-pressed={saved}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} strokeWidth={1.5} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-contain p-5 transition-transform duration-500 group-hover:scale-105 sm:p-8"
        />
        <button
          className="absolute right-4 bottom-4 left-4 hidden translate-y-20 items-center justify-center gap-2 rounded-full bg-white/95 py-3 text-xs font-medium transition-transform group-focus-within:translate-y-0 group-hover:translate-y-0 hover:bg-ink hover:text-white lg:flex"
          onClick={() => addToCart(product)}
        >
          <Plus size={16} /> Add to bag
        </button>
      </div>
      <div className="px-0.5 pt-4">
        <div className="flex items-center justify-between gap-1 text-[8px] text-muted sm:text-[9px]">
          <span className="truncate tracking-wide">{product.categoryLabel}</span>
          <span className="flex shrink-0 items-center gap-1">
            <Star size={10} fill="currentColor" /> {product.rating}
          </span>
        </div>
        <h3 className="mt-2 text-xs font-medium tracking-tight sm:text-sm">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold sm:text-sm">
            {formatPrice(product.price)}
            {product.originalPrice && (
              <del className="ml-2 text-[10px] font-normal text-muted">
                {formatPrice(product.originalPrice)}
              </del>
            )}
          </span>
          <button
            className="grid size-8 shrink-0 place-items-center rounded-full border border-line transition-colors hover:border-ink hover:bg-ink hover:text-white"
            aria-label={`Add ${product.name} to bag`}
            onClick={() => addToCart(product)}
          >
            <Plus size={17} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
