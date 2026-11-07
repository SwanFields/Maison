import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { categories, products } from "@/data/products";

const allCategories = [{ slug: "all", name: "ทั้งหมด", en: "All" }, ...categories];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const active = params.get("category") || "all";

  const filtered = useMemo(
    () => (active === "all" ? products : products.filter((product) => product.category === active)),
    [active]
  );

  const select = (slug) => {
    if (slug === "all") setParams({});
    else setParams({ category: slug });
  };

  const activeCategory = allCategories.find((category) => category.slug === active);

  return (
    <div className="min-h-screen bg-gradient-to-b from-petal/70 via-white to-white pb-20">
      <section className="mx-auto max-w-[1400px] px-5 pb-8 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.34em] text-bloom">The Collection</p>
          <h1 className="mt-4 font-heading text-[2.6rem] font-light leading-[1.05] text-ink md:text-[4rem]">
            {activeCategory?.name ?? "ทั้งหมด"} <span className="italic text-bloom">·</span>{" "}
            <span className="text-ink/30">{activeCategory?.en ?? "All"}</span>
          </h1>
          <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-ink/60">
            คัดสรรทุกชิ้นด้วยมือ จากหนัง วูล และไหมคุณภาพสูง ในโทนชมพูพาสเทล ขาว และฟ้าพาสเทล
          </p>
        </Reveal>

        <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-2">
          {allCategories.map((category) => {
            const isActive = category.slug === active;
            return (
              <button
                key={category.slug}
                onClick={() => select(category.slug)}
                className={`relative whitespace-nowrap rounded-full border px-5 py-2.5 text-[12px] tracking-[0.1em] transition-all duration-300 ${
                  isActive
                    ? "border-ink bg-ink text-white"
                    : "border-ink/12 bg-white/70 text-ink/70 hover:border-ink/40 hover:text-ink"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-8 flex items-center justify-between border-t border-petal pt-6">
          <p className="text-[11px] uppercase tracking-[0.24em] text-ink/40">{filtered.length} ชิ้นงาน</p>
          <p className="hidden text-[11px] uppercase tracking-[0.24em] text-ink/40 sm:block">Hand-finished · Limited</p>
        </div>

        <motion.div
          key={active}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4"
        >
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}