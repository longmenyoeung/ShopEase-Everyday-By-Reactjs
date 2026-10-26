import { ArrowRight, ArrowUpRight, RotateCcw, Truck } from 'lucide-react';

const shoppingBenefits = [
  { icon: Truck, label: 'Free shipping over $75' },
  { icon: RotateCcw, label: 'Easy 30-day returns' },
];

export default function Hero({ onExplore }) {
  return (
    <section
      className="relative isolate overflow-hidden rounded-[28px] border border-line bg-[#f2f4f3] sm:rounded-[32px]"
      aria-labelledby="hero-title"
    >
      <div className="grid lg:min-h-[560px] lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 flex flex-col items-start justify-center px-7 pt-9 pb-8 sm:px-12 sm:py-12 xl:px-14">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="h-px w-7 bg-accent/60" aria-hidden="true" />
            <span className="text-[9px] font-semibold tracking-[0.2em] text-accent sm:text-[10px]">
              THE ART OF EVERYDAY LIVING
            </span>
          </div>

          <h1
            id="hero-title"
            className="font-display text-[44px] leading-[1.08] font-medium tracking-[-2px] min-[400px]:text-[50px] sm:text-[64px] sm:tracking-[-3px] xl:text-[76px]"
          >
            A little better.
            <br />
            <span className="font-[Georgia,serif] font-normal text-accent italic">Every day.</span>
          </h1>

          <p className="mt-5 max-w-[320px] text-[13px] leading-7 text-muted sm:mt-6 sm:text-sm">
            Good design. Everyday comfort. Discover thoughtful finds that make the ordinary feel a
            little more special.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-8">
            <button
              className="group inline-flex items-center gap-6 rounded-full bg-ink py-2 pr-2 pl-5 text-xs font-medium text-white transition-colors hover:bg-accent sm:pl-6"
              onClick={onExplore}
            >
              Explore collection
              <span
                className="grid size-9 place-items-center rounded-full bg-white/15 transition-transform group-hover:rotate-[-35deg]"
                aria-hidden="true"
              >
                <ArrowRight size={17} strokeWidth={1.5} />
              </span>
            </button>
            <a
              href="#deal"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
            >
              Discover the offers <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-ink/10 pt-5 sm:mt-10">
            {shoppingBenefits.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 text-[9px] text-muted sm:text-[10px]"
              >
                <Icon size={15} strokeWidth={1.4} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-4 mb-4 h-[330px] sm:mx-6 sm:mb-6 sm:h-[430px] lg:my-5 lg:mr-5 lg:ml-0 lg:h-auto">
          <div className="absolute inset-0 left-5 overflow-hidden rounded-[22px] rounded-tl-[100px] bg-[#e1e2db] sm:left-7 sm:rounded-tl-[140px]">
            <img
              src="/images/category-home.jpg"
              alt="A sunlit living room with warm neutral furnishings and thoughtfully chosen everyday pieces"
              fetchPriority="high"
              className="h-full w-full object-cover object-[52%_center]"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-ink/50 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute right-7 bottom-8 hidden text-right text-white sm:block">
              <span className="block text-[8px] tracking-[0.22em] text-white/85">
                LESS, BUT BETTER.
              </span>
              <span className="mt-2 block font-[Georgia,serif] text-[23px] leading-tight italic sm:text-3xl">
                Make room
                <br />
                for the good things.
              </span>
            </div>
          </div>

          <a
            href="#deal"
            aria-label="Explore offers up to 50% off"
            className="absolute top-4 right-4 flex size-[76px] -rotate-6 flex-col items-center justify-center rounded-full border border-white/70 bg-canvas/95 text-ink shadow-sm transition-transform hover:rotate-0 sm:top-5 sm:right-5 sm:size-[88px]"
          >
            <span className="text-[8px] tracking-[0.12em] text-muted">UP TO</span>
            <span className="mt-0.5 font-display text-2xl leading-none font-semibold tracking-tight sm:text-3xl">
              50<span className="text-base">%</span>
            </span>
            <span className="mt-1 text-[8px] tracking-[0.12em] text-muted">SELECT FINDS</span>
          </a>

          <button
            onClick={onExplore}
            className="group absolute bottom-6 left-0 w-[142px] -rotate-3 rounded-2xl border border-white bg-canvas p-3 text-left shadow-[0_12px_36px_-12px_rgba(37,44,53,0.3)] transition-transform hover:rotate-0 sm:bottom-8 sm:w-[175px] sm:p-4"
          >
            <span className="inline-flex items-center gap-1.5 text-[7px] font-semibold tracking-[0.13em] text-accent sm:text-[8px]">
              <span className="size-1 rounded-full bg-accent" /> THE EVERYDAY EDIT
            </span>
            <img
              src="/images/hero-bag.webp"
              alt="Classic tan leather handbag"
              className="mx-auto my-1 h-[112px] w-full object-contain sm:h-[142px]"
            />
            <span className="flex items-center justify-between gap-2 border-t border-line pt-2.5">
              <span>
                <span className="block text-[10px] font-semibold sm:text-xs">
                  Your next favorite.
                </span>
                <span className="mt-1 block text-[8px] text-muted sm:text-[9px]">
                  Explore the essentials
                </span>
              </span>
              <ArrowUpRight size={16} className="shrink-0 text-accent" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
