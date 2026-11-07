import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { formatTHB } from "@/lib/format";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, setQty, removeItem, subtotal, count } = useCart();
  const [notice, setNotice] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cloud/50 via-white to-petal/40 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.34em] text-bloom">Your Selection</p>
          <h1 className="mt-4 font-heading text-[2.6rem] font-light leading-[1.05] text-ink md:text-[3.6rem]">
            ตะกร้าของคุณ <span className="text-ink/30">({count})</span>
          </h1>
        </Reveal>

        {items.length === 0 ? (
          <Reveal className="mt-12 rounded-[2rem] border border-petal bg-white/70 p-12 text-center backdrop-blur">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-petal/70">
              <ShoppingBag className="h-6 w-6 text-ink" strokeWidth={1.4} />
            </div>
            <p className="mt-6 font-heading text-2xl font-light text-ink">ยังไม่มีสินค้าในตะกร้า</p>
            <p className="mt-2 text-[13px] text-ink/55">เริ่มเลือกชิ้นที่ใช่สำหรับคุณได้เลย</p>
            <Link
              to="/shop"
              className="mt-7 inline-flex h-12 items-center rounded-full bg-ink px-7 text-[12px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-bloom"
            >
              ไปเลือกสินค้า
            </Link>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <div className="space-y-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-4 rounded-[1.5rem] border border-petal/80 bg-white p-3 md:p-4"
                  >
                    <Link to={`/product/${item.product.slug}`} className="h-28 w-24 flex-none overflow-hidden rounded-[1.1rem] bg-mist">
                      <Image src={item.product.image} alt={item.product.nameTh} className="h-full w-full" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link to={`/product/${item.product.slug}`} className="font-heading text-lg leading-tight text-ink">
                            {item.product.nameTh}
                          </Link>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-ink/40">{item.product.name}</p>
                        </div>
                        <p className="whitespace-nowrap text-[13px] text-ink/80">{formatTHB(item.product.price * item.qty)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex h-9 items-center rounded-full border border-ink/12">
                          <button
                            onClick={() => setQty(item.id, item.qty - 1)}
                            aria-label="ลดจำนวน"
                            className="flex h-9 w-9 items-center justify-center text-ink/60 hover:text-ink"
                          >
                            <Minus className="h-3 w-3" strokeWidth={1.8} />
                          </button>
                          <span className="w-7 text-center text-[12px] text-ink">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
                            aria-label="เพิ่มจำนวน"
                            className="flex h-9 w-9 items-center justify-center text-ink/60 hover:text-ink"
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.8} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`ลบ ${item.product.nameTh} ออกจากตะกร้า`}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-petal/60 hover:text-bloom"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-[12px] tracking-[0.14em] text-ink/55 transition-colors hover:text-bloom">
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
                เลือกสินค้าต่อ
              </Link>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-[1.75rem] border border-petal bg-white p-6 md:sticky md:top-28 md:p-7">
                <p className="font-heading text-xl text-ink">สรุปคำสั่งซื้อ</p>
                <div className="mt-6 space-y-3 text-[13px]">
                  <div className="flex justify-between text-ink/60">
                    <span>ยอดรวมสินค้า</span>
                    <span className="text-ink">{formatTHB(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-ink/60">
                    <span>ค่าจัดส่ง</span>
                    <span className="text-bloom">ฟรี</span>
                  </div>
                  <div className="flex justify-between text-ink/60">
                    <span>แพ็คเกจผ้าไหมพร้อมกล่อง</span>
                    <span className="text-bloom">รวมแล้ว</span>
                  </div>
                </div>
                <div className="mt-5 flex items-baseline justify-between border-t border-petal pt-5">
                  <span className="text-[12px] uppercase tracking-[0.2em] text-ink/50">รวมทั้งสิ้น</span>
                  <span className="font-heading text-2xl text-ink">{formatTHB(subtotal)}</span>
                </div>

                <button
                  onClick={() => setNotice(true)}
                  className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-ink text-[12px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-bloom"
                >
                  ดำเนินการชำระเงิน
                </button>

                <AnimatePresence>
                  {notice && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 rounded-xl bg-petal/60 px-4 py-3 text-[11px] leading-relaxed text-ink/65"
                    >
                      นี่คือหน้า mock-up สำหรับทดลองดีไซน์ — ยังไม่มีการตัดเงินจริงในขั้นตอนนี้
                    </motion.p>
                  )}
                </AnimatePresence>

                <p className="mt-4 text-center text-[11px] text-ink/40">จัดส่งฟรี · คืนสินค้าได้ภายใน 14 วัน</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}