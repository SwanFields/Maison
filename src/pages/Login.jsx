import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import AuthMockShell from "@/components/AuthMockShell";

const fieldClass =
  "h-12 w-full rounded-xl border border-ink/12 bg-white/80 px-4 text-[13px] text-ink outline-none transition-all duration-300 placeholder:text-ink/30 focus:border-bloom focus:ring-2 focus:ring-bloom/20";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event) => {
    event.preventDefault();
    setMessage("โหมด mock-up: ยังไม่เชื่อมต่อระบบสมาชิกจริง");
  };

  return (
    <AuthMockShell
      eyebrow="The Inner Circle"
      title="ยินดีต้อนรับกลับ"
      subtitle="เข้าสู่พื้นที่ส่วนตัวของคุณ เพื่อดูคำสั่งซื้อและสิทธิ์ Exclusive"
      sideTitle="ความหรูหราที่เบาราวกับอากาศ"
      sideCaption="Exclusive pieces, hand-finished in our atelier — delivered in silk-wrapped boxes."
      footer={
        <>
          ยังไม่มีบัญชี?{" "}
          <Link to="/register" className="text-ink underline underline-offset-4 transition-colors hover:text-bloom">
            สมัครสมาชิก
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-3.5">
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-[10px] uppercase tracking-[0.24em] text-ink/45">
            อีเมล
          </label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1.5 block text-[10px] uppercase tracking-[0.24em] text-ink/45">
            รหัสผ่าน
          </label>
          <input
            id="login-password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className={fieldClass}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-[12px] text-ink/55">
            <input type="checkbox" className="h-3.5 w-3.5 accent-[#1A237E]" />
            จดจำฉัน
          </label>
          <button
            type="button"
            onClick={() => setMessage("โหมด mock-up: ระบบกู้รหัสผ่านยังไม่เปิดใช้งาน")}
            className="text-[12px] text-ink/55 underline underline-offset-4 transition-colors hover:text-bloom"
          >
            ลืมรหัสผ่าน?
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-ink text-[12px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-bloom"
        >
          เข้าสู่ระบบ
        </motion.button>
      </form>

      <div className="mt-5 flex items-center gap-3">
        <span className="h-[1px] flex-1 bg-ink/10" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-ink/30">หรือ</span>
        <span className="h-[1px] flex-1 bg-ink/10" />
      </div>

      <button
        type="button"
        onClick={() => setMessage("โหมด mock-up: ปุ่ม Google ถูกออกแบบไว้สำหรับตัวอย่างดีไซน์")}
        className="mt-5 flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-ink/12 bg-white/70 text-[12px] tracking-[0.06em] text-ink transition-colors hover:border-ink/30"
      >
        <span className="font-heading text-base font-semibold text-bloom">G</span>
        ดำเนินการต่อด้วย Google
      </button>

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