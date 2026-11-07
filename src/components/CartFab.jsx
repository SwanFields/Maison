import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatTHB } from "@/lib/format";

export default function CartFab() {
  const { count, subtotal } = useCart();
  const { pathname } = useLocation();
  const visible = count > 0 && pathname !== "/cart";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8"
        >
          <Link
            to="/cart"
            className="group flex items-center gap-3 rounded-full bg-ink px-5 py-3.5 text-white shadow-[0_18px_40px_-16px_rgba(26,35,126,0.6)] transition-all duration-300 hover:shadow-[0_22px_48px_-14px_rgba(240,98,146,0.55)]"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
              <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-bloom px-1 text-[9px]">
                {count}
              </span>
            </span>
            <span className="hidden text-[12px] tracking-[0.16em] sm:block">{formatTHB(subtotal)}</span>
            <span className="text-[12px] tracking-[0.16em] text-white/70 transition-colors group-hover:text-white">ดูตะกร้า</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}