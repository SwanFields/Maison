import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    setEmail("");
  };

  return (
    <section className="px-5 pb-20 pt-6 md:px-10 md:pb-28">
      <Reveal className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-petal via-white to-cloud px-6 py-14 md:rounded-[3.5rem] md:px-16 md:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/60 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-cloudDeep/50 blur-2xl" />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-bloom">The Inner Circle</p>
              <h2 className="mt-4 font-heading text-[2.2rem] font-light leading-[1.1] text-ink md:text-[3rem]">
                รับสิทธิ์ก่อนใคร <br />
                <span className="italic">กับคอลเลกชันใหม่</span>
              </h2>
              <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-ink/60">
                ข่าวสาร Exclusive การเปิดจองล่วงหน้า และ invitation พิเศษถึงคุณก่อนใคร
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/70 bg-white/60 p-2 backdrop-blur-xl">
              <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setDone(false);
                  }}
                  placeholder="อีเมลของคุณ"
                  className="h-12 flex-1 rounded-full bg-transparent px-5 text-[13px] text-ink outline-none placeholder:text-ink/35"
                  aria-label="อีเมลสำหรับรับข่าวสาร"
                />
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[12px] uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-bloom"
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={1.8} /> : null}
                  {done ? "เรียบร้อย" : "สมัครรับข่าวสาร"}
                  {!done && <ArrowRight className="h-4 w-4" strokeWidth={1.6} />}
                </motion.button>
              </form>
              <p className="px-5 pb-2 pt-3 text-[11px] text-ink/45">
                {done ? "ขอบคุณค่ะ เราจะส่งข่าวสาร Exclusive ให้คุณก่อนใคร" : "ไม่มีการส่งสแปม · ยกเลิกได้ทุกเมื่อ"}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}