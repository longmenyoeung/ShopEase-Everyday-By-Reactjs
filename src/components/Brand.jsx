import { ShoppingBag } from 'lucide-react';

export default function Brand() {
  return (
    <a
      className="inline-flex shrink-0 items-center gap-2.5"
      href="#"
      aria-label="Shop everyday home"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-ink text-white">
        <ShoppingBag size={23} strokeWidth={1.5} />
      </span>
      <span className="leading-none">
        <span className="mb-1 block text-[8px] font-semibold tracking-[0.26em] text-muted">
          SHOP
        </span>
        <span className="font-display text-[23px] font-bold tracking-[-1px]">
          everyday<span className="text-accent">.</span>
        </span>
      </span>
    </a>
  );
}
