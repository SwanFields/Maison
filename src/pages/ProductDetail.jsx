import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Truck, Sparkles } from "lucide-react";
import { Image } from "@/components/ui/image";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getCategoryName, getProductBySlug, products } from "@/data/products";
import { formatTHB } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(0);
  const [added, setAdded] = useState(false);
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  useEffect(() => {
    if (product) return;
    const meta = document.createElement("meta");
    meta.name = "prerender-status-code";
    meta.content = "404";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, [product]);

  useEffect(() => {
    setQty(1);
    setColor(0);
    setAdded(false);
  }, [slug]);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gradient-to-b from-petal/60 to-white px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.34em] text-bloom">Not Found</p>
        <h1 className="font-heading text-4xl font-light text-ink">ไม่พบสินค้าชิ้นนี้</h1>
        <Link to="/shop" className="mt-2 flex h-12 items-center rounded-full bg-ink px-7 text-[12px] uppercase tracking-[0.2em] text-white">
          กลับไปหน้าสินค้า
        </Link>
      </div>
    );
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  const suggestions = related.length >= 3 ? related : products.filter((item) => item.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  return (
    <div className="bg-white pb-24 pt-28 md:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-8 flex items-center gap-2 text-[11px] tracking-[0.14em] text-ink/40">
          <Link to="/shop" className="flex items-center gap-2 transition-colors hover:text-bloom">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
            สินค้าทั้งหมด
          </Link>
          <span>/</span>
          <span className="text-ink/60">{getCategoryName(product.category)}</span>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-7">
            <div ref={imageRef} className="overflow-hidden rounded-[2rem] bg-petal/40 md:rounded-[2.75rem]">
              <motion.div
                style={{ y: imageY }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-[58vh] w-full md:h-[82vh]"
              >
                <Image
                  src={product.image}
                  alt={`${product.nameTh} ${product.name}`}
                  className="h-full w-full"
                  fittingType="cover"
                />
              </motion.div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-petal bg-mist/60 p-5">
                <Sparkles className="h-4 w-4 text-bloom" strokeWidth={1.5} />
                <p className="mt-3 text-[12px] leading-relaxed text-ink/65">งานเย็บมือทุกชิ้น พร้อมใบรับรองจากสตูดิโอ</p>
              </div>
              <div className="rounded-2xl border border-cloud bg-cloud/40 p-5">
                <Truck className="h-4 w-4 text-ink/70" strokeWidth={1.5} />
                <p className="mt-3 text-[12px] leading-relaxed text-ink/65">จัดส่งฟรีทั่วประเทศ ภายใน 2–4 วันทำการ</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              {product.exclusive && (
                <span className="inline-flex rounded-full bg-petal px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-bloom">
                  Exclusive
                </span>
              )}
              <h1 className="mt-4 font-heading text-[2.3rem] font-light leading-[1.08] text-ink md:text-[3rem]">{product.nameTh}</h1>
              <p className="mt-2 text-[11px] uppercase tracking-[0.26em] text-ink/40">{product.name}</p>
              <p className="mt-5 font-heading text-2xl text-ink">{formatTHB(product.price)}</p>
              <p className="mt-1 text-[12px] text-ink/45">{product.tagline}</p>

              <p className="mt-6 border-t border-petal pt-6 text-[14px] leading-relaxed text-ink/65">{product.description}</p>

              <div className="mt-7">
                <p className="text-[10px] uppercase tracking-[0.28em] text-ink/40">สี</p>
                <div className="mt-3 flex gap-3">
                  {product.colors.map((hex, index) => (
                    <button
                      key={hex}
                      onClick={() => setColor(index)}
                      aria-label={`เลือกสี ${index + 1}`}
                      className={`h-9 w-9 rounded-full border-2 transition-all duration-300 ${
                        color === index ? "border-ink scale-105" : "border-white ring-1 ring-ink/10"
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-7 flex items-center gap-4">
                <div className="flex h-12 items-center rounded-full border border-ink/12">
                  <button onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="ลดจำนวน" className="flex h-12 w-11 items-center justify-center text-ink/60 transition-colors hover:text-ink">
                    <Minus className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </button>
                  <span className="w-8 text-center text-[13px] text-ink">{qty}</span>
                  <button onClick={() => setQty((value) => value + 1)} aria-label="เพิ่มจำนวน" className="flex h-12 w-11 items-center justify-center text-ink/60 transition-colors hover:text-ink">
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-ink text-[12px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-bloom"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
                  ใส่ตะกร้า
                </motion.button>
              </div>

              <div className="mt-4 h-6">
                {added && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-[12px] text-bloom"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2} />
                    เพิ่มลงตะกร้าแล้ว ·{" "}
                    <Link to="/cart" className="underline underline-offset-4">
                      ไปที่ตะกร้า
                    </Link>
                  </motion.p>
                )}
              </div>

              <div className="mt-8 border-t border-petal pt-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-ink/40">รายละเอียด</p>
                <ul className="mt-4 space-y-2.5">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-[13px] leading-relaxed text-ink/60">
                      <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-bloom" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-20 max-w-[1400px] px-5 md:mt-28 md:px-10">
        <Reveal className="mb-8 flex items-end justify-between">
          <h2 className="font-heading text-3xl font-light text-ink md:text-4xl">อาจถูกใจคุณ</h2>
          <Link to="/shop" className="text-[11px] uppercase tracking-[0.22em] text-ink/50 transition-colors hover:text-bloom">
            ดูทั้งหมด
          </Link>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {suggestions.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}