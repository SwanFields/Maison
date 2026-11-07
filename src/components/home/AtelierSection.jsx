import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { atelierImage } from "@/data/products";

const stats = [
  { value: "34", label: "ชั่วโมงงานมือต่อชิ้น" },
  { value: "12", label: "ช่างฝีมือในสตูดิโอ" },
  { value: "100%", label: "วัสดุคัดสรรจากยุโรป" },
];

export default function AtelierSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);

  return (
    <section id="atelier" ref={ref} className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-10">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem]">
          <motion.div style={{ y }} className="h-[52vh] w-full md:h-[70vh]">
            <Image
              src={atelierImage}
              alt="บรรยากาศในสตูดิโอของ L'Orchidée Azur"
              className="h-full w-full"
              fittingType="cover"
            />
          </motion.div>
        </div>

        <div>
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.34em] text-bloom">The Atelier</p>
            <h2 className="mt-4 font-heading text-[2.4rem] font-light leading-[1.08] text-ink md:text-[3.2rem]">
              ความประณีตที่ <span className="italic text-bloom">จับต้องได้</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[14px] leading-relaxed text-ink/65">
              ทุกชิ้นเริ่มต้นจากแผ่นหนังและผ้าที่ถูกคัดเลือกด้วยมือ ช่างฝีมือของเราใช้เวลาหลายสิบชั่วโมง
              เพื่อให้ตะเข็บเดียว เส้นโค้งเดียว และน้ำหนักของวัสดุ รู้สึกพอดีเมื่ออยู่ในมือคุณ
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-ink/65">
              เราเชื่อว่าความหรูหราไม่จำเป็นต้องหนักหรือดูข่มขู่ — มันควรเบา นุ่มนวล และทำให้คุณยิ้มได้ทุกครั้งที่หยิบขึ้นมา
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-petal pt-8">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={0.12 + index * 0.08}>
                <p className="font-heading text-3xl font-light text-ink md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-ink/50">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}