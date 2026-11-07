import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { exclusiveProducts } from "@/data/products";
import { formatTHB } from "@/lib/format";

function ShowcaseCard({ product, offset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={offset ? "md:mt-20" : ""}
    >
      <Link to={`/product/${product.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-[2rem] bg-white md:rounded-[2.75rem]">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <Image
              src={product.image}
              alt={`${product.nameTh} ${product.name}`}
              className="h-full w-full transition-transform duration-[1300ms] ease-out group-hover:scale-[1.05]"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent p-5 md:p-7">
            <div>
              <p className="text-[9px] uppercase tracking-[0.32em] text-white/75">Exclusive</p>
              <p className="mt-2 font-heading text-2xl font-light leading-tight text-white md:text-3xl">{product.nameTh}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-white/70">{product.name}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <span className="text-[13px] text-white/90">{formatTHB(product.price)}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink transition-transform duration-300 group-hover:-translate-y-1">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ExclusiveShowcase() {
  const [first, second] = exclusiveProducts;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cloud/60 via-petal/40 to-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal className="mb-12 max-w-2xl">
          <p className="text-[10px] uppercase tracking-[0.34em] text-bloom">The Exclusive Selection</p>
          <h2 className="mt-4 font-heading text-[2.6rem] font-light leading-[1.05] text-ink md:text-[3.6rem]">
            หยิบจับความพิเศษ <span className="italic text-bloom">ที่ไม่มีซ้ำ</span>
          </h2>
          <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-ink/65">
            แต่ละชิ้นผลิตในจำนวนจำกัด เย็บด้วยมือโดยช่างฝีมือของเรา พร้อมใบรับรองและกล่องผ้าไหมพร้อมมอบให้
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <ShowcaseCard product={first} />
          <ShowcaseCard product={second} offset />
        </div>

        <Reveal delay={0.15} className="mt-14 flex justify-center">
          <Link
            to="/shop"
            className="group flex h-12 items-center gap-3 rounded-full border border-ink/15 px-8 text-[12px] uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
          >
            ดูคอลเลกชันทั้งหมด
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}