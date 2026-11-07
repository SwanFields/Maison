import { Outlet } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartFab from "@/components/CartFab";

export default function Layout() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div className="relative min-h-screen bg-white">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-bloom via-petalDeep to-cloudDeep"
      />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartFab />
    </div>
  );
}