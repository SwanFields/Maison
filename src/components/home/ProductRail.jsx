import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { products } from "@/data/products";

export default function ProductRail({ eyebrow = "New In", title = "มาใหม่ในสัปดาห์นี้" }) {
  const railRef = useRef(null);

  const scrollBy = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.34em] text-bloom">{eyebrow}</p>
          <h2 className="mt-3 font-heading text-4xl font-light text-ink md:text-5xl">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/shop" className="mr-2 text-[11px] uppercase tracking-[0.22em] text-ink/55 transition-colors hover:text-bloom">
            ดูทั้งหมด
          </Link>
          <button
            onClick={() => scrollBy(-1)}
            aria-label="เลื่อนซ้าย"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="เลื่อนขวา"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>
      </Reveal>

      <div
        ref={railRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 md:-mx-10 md:px-10"
      >
        {products.map((product, index) => (
          <div key={product.id} className="w-[72%] flex-none snap-start sm:w-[46%] lg:w-[28%] xl:w-[23.5%]">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}