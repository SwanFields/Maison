import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const links = [
  { to: "/", label: "หน้าแรก", en: "Home" },
  { to: "/shop", label: "สินค้าทั้งหมด", en: "Collection" },
  { to: "/shop?category=suit", label: "สูท & โค้ท", en: "Tailoring" },
  { to: "/shop?category=bag", label: "กระเป๋า", en: "Bags" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { pathname, search } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, search]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-petal/70 bg-white/80 py-3 backdrop-blur-xl" : "border-b border-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 md:px-10">
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="font-heading text-xl tracking-[0.22em] text-ink md:text-[1.4rem]">L&apos;ORCHIDÉE</span>
            <span className="hidden text-[10px] uppercase tracking-[0.42em] text-bloom md:inline">Azur</span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group relative text-[13px] tracking-[0.12em] text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-[1px] w-0 bg-bloom transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <Link
              to="/login"
              className="hidden text-[12px] uppercase tracking-[0.18em] text-ink/60 transition-colors hover:text-bloom sm:block"
            >
              เข้าสู่ระบบ
            </Link>
            <Link
              to="/register"
              className="hidden rounded-full border border-ink/15 px-5 py-2.5 text-[12px] uppercase tracking-[0.18em] text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white sm:block"
            >
              สมัครสมาชิก
            </Link>
            <Link to="/cart" className="relative flex h-11 w-11 items-center justify-center rounded-full bg-petal/70 transition-colors hover:bg-petalDeep">
              <ShoppingBag className="h-[18px] w-[18px] text-ink" strokeWidth={1.5} />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-bloom px-1 text-[10px] font-medium text-white"
                >
                  {count}
                </motion.span>
              )}
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink lg:hidden"
              aria-label="เปิดเมนู"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-gradient-to-b from-petal via-white to-cloud lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-10 pt-6">
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg tracking-[0.22em] text-ink">L&apos;ORCHIDÉE</span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-ink"
                  aria-label="ปิดเมนู"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <nav className="mt-14 flex flex-col gap-7">
                {links.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * index + 0.1, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
                  >
                    <Link to={link.to} onClick={() => setOpen(false)}>
                      <p className="font-heading text-3xl text-ink">{link.label}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.32em] text-ink/40">{link.en}</p>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex h-12 flex-1 items-center justify-center rounded-full border border-ink/20 text-[12px] uppercase tracking-[0.2em] text-ink"
                >
                  เข้าสู่ระบบ
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex h-12 flex-1 items-center justify-center rounded-full bg-ink text-[12px] uppercase tracking-[0.2em] text-white"
                >
                  สมัครสมาชิก
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}