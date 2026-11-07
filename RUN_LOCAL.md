# วิธีรันในเครื่อง (VS Code)

ต้องมี Node.js 20.19+ (แนะนำ 22 LTS)

```bash
npm install
npm run dev:local
```

เปิด http://localhost:5173

- `dev:local` รันแบบ standalone ไม่ต้องใช้ Base44 backend / login
- หน้าร้านใช้ข้อมูลสินค้าจาก `src/data/products.js` ส่วนตะกร้าทำงานในเครื่อง
- ระบบสมัคร/ล็อกอิน/รีเซ็ตรหัสผ่านใช้งานจริงไม่ได้ใน local mode (เป็นหน้า UI)
- รูปสินค้าโหลดจาก media.base44.com ต้องต่ออินเทอร์เน็ต
- ถ้าต้องการใช้ร่วมกับ Base44 จริง ให้ดู README.md (base44 login / link / dev)
