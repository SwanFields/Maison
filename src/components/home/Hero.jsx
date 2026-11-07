import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Image } from "@/components/ui/image";
import { brand, products } from "@/data/products";

/* ------------------------------------------------------------------ *
 *  "Bloom Tunnel" hero
 *  A tall sticky section. Scrolling drives one continuous story:
 *   1. The wordmark rises in, a mandala-orchid slowly opens behind it.
 *   2. Letters drift apart and dissolve while the orchid grows into a portal.
 *   3. Product cards fly out of the portal toward the viewer (3D tunnel).
 *   4. The brand message blooms in at the end.
 * ------------------------------------------------------------------ */

const WORD_TOP = Array.from("L’Orchidée");
const WORD_BOTTOM = Array.from("Azur");

const cardProducts = products
  .filter((p, i, all) => all.findIndex((q) => q.image === p.image) === i)
  .slice(0, 7);

const cardSpecs = [
  { x: -27, y: -14, r: -6 },
  { x: 26, y: 10, r: 5 },
  { x: -34, y: 16, r: -4 },
  { x: 30, y: -18, r: 7 },
  { x: -20, y: -26, r: -8 },
  { x: 22, y: 20, r: 4 },
  { x: -30, y: -4, r: -3 },
];

/* ---------- single letter of the wordmark ---------- */
function Letter({ char, index, total, progress, className = "" }) {
  const dir = index - (total - 1) / 2;
  const seed = (index * 37) % 11;

  const y = useTransform(progress, [0, 0.34], [0, -(140 + seed * 22)]);
  const x = useTransform(progress, [0, 0.34], [0, dir * 46]);
  const rotate = useTransform(progress, [0, 0.34], [0, (index % 2 ? 1 : -1) * (8 + seed * 2.2)]);
  const opacity = useTransform(progress, [0.04, 0.3], [1, 0]);
  const filter = useTransform(progress, [0, 0.3], ["blur(0px)", "blur(16px)"]);

  return (
    <motion.span style={{ x, y, rotate, opacity, filter }} className="inline-block">
      <span className="-mb-[0.16em] inline-block overflow-hidden px-[0.02em] pb-[0.16em] align-bottom">
        <motion.span
          initial={{ y: "118%", rotate: 6 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.35 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block ${className}`}
        >
          {char}
        </motion.span>
      </span>
    </motion.span>
  );
}

/* ---------- the orchid mandala ---------- */
function Petal({ angle, length, width, bloom, tone }) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        height: `${length}%`,
        width: `${width}%`,
        transform: `translate(-50%, -100%) rotate(${angle}deg)`,
        transformOrigin: "50% 100%",
      }}
    >
      <motion.div
        style={{
          scaleY: bloom,
          transformOrigin: "50% 100%",
          background: tone,
          mixBlendMode: "multiply",
        }}
        className="h-full w-full rounded-[50%_50%_50%_50%/78%_78%_22%_22%] border border-bloom/25"
      />
    </div>
  );
}

function Emblem({ progress, mx, my }) {
  const rotate = useTransform(progress, [0, 1], [0, 200]);
  const rotateBack = useTransform(progress, [0, 1], [0, -140]);
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.9, 3.6]);
  const opacity = useTransform(progress, [0, 0.6, 1], [1, 0.85, 0.22]);
  const bloom = useTransform(progress, [0, 0.4], [0.45, 1]);
  const bloomInner = useTransform(progress, [0, 0.45], [0.3, 1]);
  const x = useTransform(mx, (v) => v * 36);
  const y = useTransform(my, (v) => v * 36);

  const outer = Array.from({ length: 12 }, (_, i) => i * 30);
  const inner = Array.from({ length: 12 }, (_, i) => i * 30 + 15);

  return (
    <motion.div style={{ x, y, scale, opacity }} className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[min(92vw,92vh)] w-[min(92vw,92vh)]"
      >
        {/* rotating text ring */}
        <motion.svg style={{ rotate }} viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
          <defs>
            <path id="hero-ring" d="M200,200 m-186,0 a186,186 0 1,1 372,0 a186,186 0 1,1 -372,0" />
          </defs>
          <text className="fill-ink/45" style={{ fontSize: 9.5, letterSpacing: "0.42em", fontFamily: "Inter, sans-serif" }}>
            <textPath href="#hero-ring">
              L’ORCHIDÉE AZUR · WEIGHTLESS OPULENCE · HAND-FINISHED IN ATELIER · LIMITED NUMBERS ·
            </textPath>
          </text>
        </motion.svg>

        {/* concentric hairlines */}
        <div className="absolute inset-[7%] rounded-full border border-ink/10" />
        <div className="absolute inset-[22%] rounded-full border border-bloom/20" />

        {/* petal layers */}
        <motion.div style={{ rotate }} className="absolute inset-0">
          {outer.map((a) => (
            <Petal
              key={a}
              angle={a}
              length={42}
              width={15}
              bloom={bloom}
              tone="linear-gradient(to top, rgba(240,98,146,0.04), rgba(247,211,224,0.85))"
            />
          ))}
        </motion.div>
        <motion.div style={{ rotate: rotateBack }} className="absolute inset-0">
          {inner.map((a) => (
            <Petal
              key={a}
              angle={a}
              length={30}
              width={12}
              bloom={bloomInner}
              tone="linear-gradient(to top, rgba(212,232,249,0.1), rgba(212,232,249,0.95))"
            />
          ))}
        </motion.div>

        {/* glowing core */}
        <div className="absolute left-1/2 top-1/2 h-[7%] w-[7%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bloom/70 blur-[2px]" />
        <div className="absolute left-1/2 top-1/2 h-[16%] w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-2xl" />
      </motion.div>
    </motion.div>
  );
}

/* ---------- product card flying out of the portal ---------- */
function TunnelCard({ product, index, progress }) {
  const spec = cardSpecs[index % cardSpecs.length];
  const start = 0.24 + index * 0.065;

  const opacity = useTransform(progress, [start, start + 0.06, start + 0.26, start + 0.32], [0, 1, 1, 0]);
  const transform = useTransform(progress, (p) => {
    const z = -1800 + (p - start) * 7270;
    return `translate(-50%, -50%) translate3d(${spec.x}vw, ${spec.y}vh, ${z}px) rotate(${spec.r}deg)`;
  });

  return (
    <motion.div
      style={{ transform, opacity }}
      className="absolute left-1/2 top-1/2 aspect-[3/4] w-[38vw] overflow-hidden rounded-[1.6rem] bg-white shadow-[0_30px_80px_-30px_rgba(26,35,126,0.4)] md:w-[17vw]"
    >
      <Image src={product.image} alt={product.name} className="h-full w-full" fittingType="cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-4 pt-10">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/80">{product.name}</p>
      </div>
    </motion.div>
  );
}

/* ---------- scroll-driven hero ---------- */
function ScrollHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5 });

  // pointer parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 50, damping: 18 });
  const my = useSpring(py, { stiffness: 50, damping: 18 });
  useEffect(() => {
    const onMove = (e) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  const background = useTransform(progress, [0, 0.45, 1], ["#FDFAF8", "#FCE4EC", "#E3F2FD"]);

  const orbA = useTransform(progress, [0, 1], ["0vh", "-40vh"]);
  const orbB = useTransform(progress, [0, 1], ["0vh", "30vh"]);
  const orbX = useTransform(mx, (v) => v * -60);
  const orbY = useTransform(my, (v) => v * -60);

  const wordScale = useTransform(progress, [0, 0.34], [1, 1.12]);
  const cueOpacity = useTransform(progress, [0, 0.06], [1, 0]);

  const finalOpacity = useTransform(progress, [0.66, 0.8], [0, 1]);
  const finalY = useTransform(progress, [0.66, 0.8], [50, 0]);
  const finalFilter = useTransform(progress, [0.66, 0.8], ["blur(12px)", "blur(0px)"]);
  const finalPointer = useTransform(progress, (v) => (v > 0.72 ? "auto" : "none"));

  return (
    <section ref={ref} className="relative h-[420vh]">
      <motion.div style={{ background }} className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* soft drifting light */}
        <motion.div
          aria-hidden
          style={{ y: orbA, x: orbX }}
          className="absolute -left-[10vw] top-[8vh] h-[55vmin] w-[55vmin] rounded-full bg-petalDeep/70 blur-3xl"
        />
        <motion.div
          aria-hidden
          style={{ y: orbB, x: orbY }}
          className="absolute -right-[8vw] bottom-[4vh] h-[60vmin] w-[60vmin] rounded-full bg-cloudDeep/80 blur-3xl"
        />

        <Emblem progress={progress} mx={mx} my={my} />

        {/* wordmark */}
        <motion.div
          style={{ scale: wordScale }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ink/55 md:mb-6"
          >
            Maison de Luxe · Pastel
          </motion.p>

          <h1 className="font-heading text-[15.5vw] font-light leading-[0.9] text-ink md:text-[10.5vw]" aria-label={brand.name}>
            <span aria-hidden className="block whitespace-nowrap">
              {WORD_TOP.map((c, i) => (
                <Letter key={i} char={c} index={i} total={WORD_TOP.length} progress={progress} />
              ))}
            </span>
            <span aria-hidden className="block whitespace-nowrap italic text-bloom">
              {WORD_BOTTOM.map((c, i) => (
                <Letter key={i} char={c} index={i + 3} total={WORD_TOP.length} progress={progress} />
              ))}
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex items-center gap-4 md:mt-8"
          >
            <span className="h-px w-10 bg-ink/25 md:w-16" />
            <span className="text-[10px] uppercase tracking-[0.42em] text-ink/60">{brand.tagline}</span>
            <span className="h-px w-10 bg-ink/25 md:w-16" />
          </motion.div>
        </motion.div>

        {/* flying product cards */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20" style={{ perspective: "1200px" }}>
          {cardProducts.map((p, i) => (
            <TunnelCard key={p.id} product={p} index={i} progress={progress} />
          ))}
        </div>

        {/* final message */}
        <motion.div
          style={{ opacity: finalOpacity, y: finalY, filter: finalFilter, pointerEvents: finalPointer }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.5em] text-bloom">The Collection</p>
          <h2 className="mt-5 font-heading text-[2.6rem] font-light leading-[1.08] text-ink md:text-[5rem]">
            ความหรูหราที่เบา
            <br />
            <span className="italic text-bloom">ดุจกลีบดอกไม้</span>
          </h2>
          <p className="mt-6 max-w-md text-[13px] leading-relaxed text-ink/65 md:text-[15px]">
            งานมือจากสตูดิโอของเรา ในจำนวนจำกัด ทุกชิ้นเบา นุ่มนวล และทำให้คุณยิ้มได้ทุกครั้งที่หยิบขึ้นมา
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="rounded-full bg-ink px-9 py-3.5 text-[11px] uppercase tracking-[0.28em] text-white transition hover:bg-bloom"
            >
              เลือกชมคอลเลกชัน
            </Link>
            <a
              href="#atelier"
              className="rounded-full border border-ink/25 px-9 py-3.5 text-[11px] uppercase tracking-[0.28em] text-ink transition hover:border-bloom hover:text-bloom"
            >
              เรื่องราวของเรา
            </a>
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex flex-col items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] text-ink/55">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-ink/15">
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-bloom"
            />
          </span>
        </motion.div>

        {/* progress rail */}
        <div aria-hidden className="absolute right-5 top-1/2 z-30 hidden h-24 w-px -translate-y-1/2 bg-ink/10 md:block">
          <motion.div style={{ scaleY: progress, transformOrigin: "top" }} className="h-full w-full bg-bloom" />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- reduced-motion fallback ---------- */
function StaticHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center bg-gradient-to-b from-cream via-petal to-cloud px-6 text-center">
      <h1 className="font-heading text-[14vw] font-light leading-[0.95] text-ink md:text-[9vw]">
        {brand.short} <span className="italic text-bloom">{brand.accent}</span>
      </h1>
      <p className="mt-6 text-[11px] uppercase tracking-[0.42em] text-ink/60">{brand.tagline}</p>
      <Link
        to="/shop"
        className="mt-10 rounded-full bg-ink px-9 py-3.5 text-[11px] uppercase tracking-[0.28em] text-white transition hover:bg-bloom"
      >
        เลือกชมคอลเลกชัน
      </Link>
    </section>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  return reduce ? <StaticHero /> : <ScrollHero />;
}
