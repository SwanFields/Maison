import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { categories } from "@/data/products";

export default function CategoryRail() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.34em] text-bloom">Shop by Category</p>
          <h2 className="mt-3 font-heading text-4xl font-light text-ink md:text-5xl">เลือกช้อปตามหมวด</h2>
        </div>
        <Link to="/shop" className="text-[11px] uppercase tracking-[0.22em] text-ink/55 underline-offset-8 transition-colors hover:text-bloom hover:underline">
          ดูทั้งหมด
        </Link>
      </Reveal>

      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-8 md:gap-5 md:overflow-visible md:px-0">
        {categories.map((category, index) => (
          <Reveal key={category.slug} delay={index * 0.05} className="min-w-[7.5rem] snap-start md:min-w-0">
            <Link to={`/shop?category=${category.slug}`} className="group block text-center">
              <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full bg-mist">
                <Image
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/60" />
              </div>
              <p className="mt-4 text-[13px] text-ink transition-colors group-hover:text-bloom">{category.name}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-ink/35">{category.en}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}