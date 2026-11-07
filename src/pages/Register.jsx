import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import AuthMockShell from "@/components/AuthMockShell";

const fieldClass =
  "h-12 w-full rounded-xl border border-ink/12 bg-white/80 px-4 text-[13px] text-ink outline-none transition-all duration-300 placeholder:text-ink/30 focus:border-bloom focus:ring-2 focus:ring-bloom/20";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [message, setMessage] = useState("");

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    setMessage(
      form.password.length < 8
        ? "รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร (โหมด mock-up)"
        : "โหมด mock-up: ฟอร์มสมัครสมาชิกพร้อมใช้งาน แต่ยังไม่เชื่อมต่อระบบจริง"
    );
  };

  return (
    <AuthMockShell
      eyebrow="Join the Inner Circle"
      title="สมัครสมาชิก"
      subtitle="รับสิทธิ์เข้าถึงคอลเลกชัน Exclusive ก่อนใคร พร้อมของขวัญต้อนรับ"
      sideTitle="ทุกชิ้นมีเรื่องราวของตัวเอง"
      sideCaption="Created in limited numbers, each piece carries the quiet signature of our atelier."
      footer={
        <>
          มีบัญชีอยู่แล้ว?{" "}
          <Link to="/login" className="text-ink underline underline-offset-4 transition-colors hover:text-bloom">
            เข้าสู่ระบบ
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-3.5">
        <div>
          <label htmlFor="reg-name" className="mb-1.5 block text-[10px] uppercase tracking-[0.24em] text-ink/45">
            ชื่อของคุณ
          </label>
          <input id="reg-name" required value={form.name} onChange={update("name")} placeholder="ชื่อ – นามสกุล" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="reg-email" className="mb-1.5 block text-[10px] uppercase tracking-[0.24em] text-ink/45">
            อีเมล
          </label>
          <input id="reg-email" type="email" required value={form.email} onChange={update("email")} placeholder="you@example.com" className={fieldClass} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="reg-password" className="mb-1.5 block text-[10px] uppercase tracking-[0.24em] text-ink/45">
              รหัสผ่าน
            </label>
            <input id="reg-password" type="password" required value={form.password} onChange={update("password")} placeholder="••••••••" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="reg-confirm" className="mb-1.5 block text-[10px] uppercase tracking-[0.24em] text-ink/45">
              ยืนยันรหัสผ่าน
            </label>
            <input id="reg-confirm" type="password" required value={form.confirm} onChange={update("confirm")} placeholder="••••••••" className={fieldClass} />
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-2 pt-1 text-[11px] leading-relaxed text-ink/55">
          <input type="checkbox" required className="mt-[3px] h-3.5 w-3.5 accent-[#1A237E]" />
          ฉันยอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัวของ L&apos;Orchidée Azur
        </label>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-ink text-[12px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-bloom"
        >
          สมัครสมาชิก
        </motion.button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-start gap-2 rounded-xl bg-petal/60 px-4 py-3 text-[11px] leading-relaxed text-ink/70"
        >
          <Check className="mt-[2px] h-3.5 w-3.5 flex-none text-bloom" strokeWidth={2} />
          {message}
        </motion.p>
      )}
    </AuthMockShell>
  );
}