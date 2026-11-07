import { Link } from "react-router-dom";
import { Instagram, Mail, Phone } from "lucide-react";

const columns = [
  {
    title: "ช้อปปิ้ง",
    links: [
      { label: "สินค้าทั้งหมด", to: "/shop" },
      { label: "กระเป๋า", to: "/shop?category=bag" },
      { label: "รองเท้า", to: "/shop?category=shoes" },
      { label: "สูท & โค้ท", to: "/shop?category=suit" },
    ],
  },
  {
    title: "บัญชี",
    links: [
      { label: "เข้าสู่ระบบ", to: "/login" },
      { label: "สมัครสมาชิก", to: "/register" },
      { label: "ตะกร้าของฉัน", to: "/cart" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-petal bg-white px-5 pb-10 pt-16 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-heading text-xl tracking-[0.22em] text-ink">L&apos;ORCHIDÉE AZUR</p>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink/55">
              บ้านของสินค้าแฟชั่นที่เบา นุ่มนวล และทำด้วยมือในจำนวนจำกัด สำหรับคนที่เชื่อว่าความหรูหราคือความสบายใจ
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition-colors hover:border-bloom hover:text-bloom"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="mailto:concierge@orchidee-azur.com"
                aria-label="อีเมล"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition-colors hover:border-bloom hover:text-bloom"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href="tel:+6620001234"
                aria-label="โทรศัพท์"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition-colors hover:border-bloom hover:text-bloom"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-ink/40">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-[13px] text-ink/65 transition-colors hover:text-bloom">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-ink/40">Concierge</p>
            <p className="mt-5 text-[13px] leading-relaxed text-ink/65">
              บริการให้คำปรึกษาส่วนตัวทุกวัน
              <br />
              10:00 – 19:00 (ICT)
            </p>
            <a href="mailto:concierge@orchidee-azur.com" className="mt-3 inline-block text-[13px] text-ink underline-offset-4 hover:underline">
              concierge@orchidee-azur.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-petal pt-6 text-[11px] text-ink/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} L&apos;Orchidée Azur. All rights reserved.</p>
          <p className="uppercase tracking-[0.24em]">Made by hand · Bangkok</p>
        </div>
      </div>
    </footer>
  );
}