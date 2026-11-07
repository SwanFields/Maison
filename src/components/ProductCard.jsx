import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatTHB } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_60px_-40px_rgba(26,35,126,0.45)]">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <Image
              src={product.image}
              alt={`${product.nameTh} ${product.name}`}
              className="h-full w-full transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {product.exclusive && (
            <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-ink backdrop-blur-sm">
              Exclusive
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={() => addItem(product.id)}
        aria-label={`เพิ่ม ${product.nameTh} ลงตะกร้า`}
        className="absolute bottom-[5.6rem] right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-bloom hover:text-white"
      >
        <Plus className="h-4 w-4" strokeWidth={1.8} />
      </button>

      <Link to={`/product/${product.slug}`} className="mt-4 flex items-start justify-between gap-3 px-1">
        <div>
          <p className="font-heading text-lg leading-tight text-ink">{product.nameTh}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-ink/40">{product.name}</p>
        </div>
        <p className="whitespace-nowrap pt-1 text-[13px] text-ink/80">{formatTHB(product.price)}</p>
      </Link>
    </motion.article>
  );
}