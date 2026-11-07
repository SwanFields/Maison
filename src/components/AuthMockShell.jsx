import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";
import { heroImage } from "@/data/products";

export default function AuthMockShell({ eyebrow, title, subtitle, children, footer, sideTitle, sideCaption }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-petal via-white to-cloud">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cloudDeep/50 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-[1300px] items-center gap-10 px-5 py-10 md:grid-cols-2 md:px-10">
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[3rem]"
          >
            <div className="h-[78vh] w-full">
              <Image src={heroImage} alt="L'Orchidée Azur collection" className="h-full w-full" fittingType="cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-9">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.9 }}
                className="font-heading text-[2.4rem] font-light leading-[1.1] text-white"
              >
                {sideTitle}
              </motion.p>
              <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-white/75">{sideCaption}</p>
            </div>
          </motion.div>
        </div>

        <div className="w-full">
          <div className="mb-10 flex items-center justify-between md:justify-end">
            <Link to="/" className="font-heading text-lg tracking-[0.22em] text-ink md:hidden">
              L&apos;ORCHIDÉE
            </Link>
            <Link to="/" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink/50 transition-colors hover:text-bloom">
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
              กลับหน้าแรก
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-md rounded-[2rem] border border-white/70 bg-white/65 p-7 shadow-[0_40px_80px_-60px_rgba(26,35,126,0.6)] backdrop-blur-xl md:p-9"
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-bloom">{eyebrow}</p>
            <h1 className="mt-3 font-heading text-[2.1rem] font-light leading-tight text-ink">{title}</h1>
            <p className="mt-2 text-[13px] leading-relaxed text-ink/55">{subtitle}</p>
            <div className="mt-7">{children}</div>
            <div className="mt-6 text-center text-[12px] text-ink/55">{footer}</div>
          </motion.div>

          <p className="mx-auto mt-5 max-w-md text-center text-[10px] uppercase tracking-[0.2em] text-ink/35">
            Mock-up preview · ดีไซน์ตัวอย่างสำหรับเว็บไซต์
          </p>
        </div>
      </div>
    </div>
  );
}