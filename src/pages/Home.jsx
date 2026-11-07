import Hero from "@/components/home/Hero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import CategoryRail from "@/components/home/CategoryRail";
import ExclusiveShowcase from "@/components/home/ExclusiveShowcase";
import ProductRail from "@/components/home/ProductRail";
import AtelierSection from "@/components/home/AtelierSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <CategoryRail />
      <ExclusiveShowcase />
      <ProductRail />
      <AtelierSection />
      <NewsletterSection />
    </>
  );
}