# 👕 SecHandShop – ร้านขายเสื้อผ้ามือสองออนไลน์

**SecHandShop** คือเว็บแอปพลิเคชันร้านค้าออนไลน์สำหรับซื้อขาย **เสื้อผ้ามือสอง** (เสื้อ กางเกง รองเท้า ฯลฯ) ลูกค้าเลือกดูสินค้า ใส่ตะกร้า และชำระเงินออนไลน์ผ่าน Stripe ได้ ส่วนผู้ดูแลระบบมีหน้า Admin ไว้จัดการสินค้า หมวดหมู่ ผู้ใช้ และคำสั่งซื้อ

---

## 🎯 ที่มาและจุดประสงค์

เว็บไซต์นี้ทำขึ้นเพื่อเป็นช่องทางซื้อขายเสื้อผ้ามือสองในราคาที่เหมาะสม มีรายละเอียดสินค้าและราคาที่ชัดเจน ใช้งานง่าย ให้ผู้ใช้เลือกซื้อสินค้าได้สะดวกและรวดเร็ว พร้อมระบบชำระเงินออนไลน์ โปรเจ็กนี้ยังเป็นการฝึกพัฒนาเว็บแบบ Full-stack ตั้งแต่หน้าบ้าน (Frontend) หลังบ้าน (Backend/REST API) ไปจนถึงฐานข้อมูล

---

## ✨ ฟีเจอร์หลัก

### สำหรับลูกค้า / ผู้เยี่ยมชม
- **หน้าแรก** มีสไลด์รูปภาพ (Carousel) และแสดง **สินค้าขายดี** (เรียงตามยอดขาย) กับ **สินค้ามาใหม่** (เรียงตามวันที่อัปเดต) แบบเลื่อนดูด้วย Swiper
- **หน้าสินค้า** แสดงสินค้าทั้งหมด พร้อมตัวกรอง
  - ค้นหาจากชื่อสินค้า (พิมพ์แล้วค้นหาอัตโนมัติ)
  - กรองตามหมวดหมู่ (เลือกได้หลายหมวด)
  - กรองตามช่วงราคาด้วยแถบเลื่อน (0 – 5,000 บาท)
- ดูรายละเอียดสินค้าในหน้าต่างป๊อปอัป และ **เพิ่มสินค้าลงตะกร้า**
- **ตะกร้าสินค้า** เพิ่ม/ลดจำนวน ลบสินค้า และคำนวณยอดรวมอัตโนมัติ (ตะกร้าถูกเก็บไว้ในเบราว์เซอร์ ปิดเว็บแล้วกลับมาก็ยังอยู่)
- **สั่งซื้อ** ระบบจะเช็กสต็อกก่อน ถ้าสินค้าไม่พอจะแจ้งเตือนว่าสินค้าหมด
- **Checkout** กรอกที่อยู่จัดส่งและดูสรุปคำสั่งซื้อ
- **ชำระเงินออนไลน์ผ่าน Stripe** (สกุลเงินบาท THB) เมื่อชำระสำเร็จ ระบบจะบันทึกคำสั่งซื้อ ตัดสต็อก เพิ่มยอดขาย และล้างตะกร้าให้อัตโนมัติ
- **ประวัติการสั่งซื้อ** ดูรายการสินค้า ยอดรวม และสถานะของแต่ละออเดอร์
- **สมัครสมาชิก / เข้าสู่ระบบ** ตรวจสอบฟอร์มด้วย Zod (รูปแบบอีเมล, ยืนยันรหัสผ่านให้ตรงกัน) เข้ารหัสรหัสผ่านด้วย bcrypt และยืนยันตัวตนด้วย JWT (อายุ 1 วัน)
- หน้า **เกี่ยวกับเรา** และ **ติดต่อเรา**

### สำหรับผู้ดูแลระบบ (Admin Panel – `/admin`)
- **จัดการผู้ใช้** ดูรายชื่อผู้ใช้ทั้งหมด ค้นหาด้วยอีเมล เปลี่ยนบทบาท (User/Admin) และเปิด/ปิดการใช้งานบัญชี (บัญชีที่ถูกปิดจะเข้าสู่ระบบไม่ได้)
- **จัดการหมวดหมู่** เพิ่มและลบหมวดหมู่สินค้า
- **จัดการสินค้า** เพิ่ม แก้ไข และลบสินค้า (ชื่อ รายละเอียด ราคา จำนวน หมวดหมู่) อัปโหลดรูปได้หลายรูปไปเก็บที่ **Cloudinary** (ย่อรูปเหลือ 720×720 ก่อนอัปโหลด) มีช่องค้นหาและแบ่งหน้ารายการสินค้า
- **จัดการคำสั่งซื้อ** ดูออเดอร์ทั้งหมด (ผู้สั่ง ที่อยู่ วันที่ สินค้า ยอดรวม) ค้นหาด้วยอีเมล และเปลี่ยนสถานะออเดอร์เป็น `Not Process` / `Processing` / `Completed` / `Cancelled`

---

## 👥 ผู้ใช้งานและบทบาท

| บทบาท | สิทธิ์การใช้งาน |
|-------|----------------|
| **ผู้เยี่ยมชม (ยังไม่ล็อกอิน)** | ดูหน้าแรก, ดู/ค้นหาสินค้า, ใส่ตะกร้า, สมัครสมาชิก |
| **สมาชิก (`user`)** | ทุกอย่างของผู้เยี่ยมชม + สั่งซื้อ, กรอกที่อยู่, ชำระเงิน, ดูประวัติการสั่งซื้อ |
| **ผู้ดูแลระบบ (`admin`)** | เข้าหน้า Admin Panel เพื่อจัดการผู้ใช้ หมวดหมู่ สินค้า และคำสั่งซื้อ |

> ผู้ที่สมัครใหม่จะได้บทบาท `user` เป็นค่าเริ่มต้น ถ้าต้องการบัญชี admin ให้เปลี่ยนค่า `role` เป็น `admin` ในฐานข้อมูล (หรือให้ admin คนอื่นเปลี่ยนให้ในหน้าจัดการผู้ใช้)

---

## 🛠️ เทคโนโลยีที่ใช้

**Frontend (`client/`)**
- React 18 + Vite 5
- React Router DOM 6 (จัดการเส้นทางและป้องกันหน้า User/Admin)
- Tailwind CSS
- Zustand (จัดการ state + เก็บตะกร้า/ข้อมูลล็อกอินใน localStorage)
- Axios (เรียก API)
- React Hook Form + Zod (ตรวจสอบฟอร์ม)
- Stripe (`@stripe/react-stripe-js`, `@stripe/stripe-js`) สำหรับหน้าชำระเงิน
- Swiper, Framer Motion, rc-slider, lucide-react, react-toastify, react-image-file-resizer, lodash, moment, numeral

**Backend (`server/`)**
- Node.js + Express 4 (REST API ที่พอร์ต `5001`, path ขึ้นต้นด้วย `/api`)
- Prisma ORM 5
- JSON Web Token (jsonwebtoken) + bcryptjs
- Stripe (สร้าง Payment Intent)
- Cloudinary (เก็บรูปสินค้า)
- cors, morgan, nodemon

**Database**
- MySQL (มีไฟล์ `sechandshop.sql` ที่ export มาจาก phpMyAdmin พร้อมข้อมูลตัวอย่าง)
- ตารางหลัก: `User`, `Product`, `Category`, `Image`, `Cart`, `ProductOnCart`, `Order`, `ProductOnOrder`

---

## 📁 โครงสร้างโปรเจ็ก

```
SecHandShop/
├── client/                 # Frontend (React + Vite)
│   ├── public/             # โลโก้ร้าน และไฟล์ static
│   └── src/
│       ├── api/            # ฟังก์ชันเรียก API (auth, product, category, user, admin, stripe)
│       ├── components/     # คอมโพเนนต์ (card, home, admin, MainNav, CheckoutForm)
│       ├── layouts/        # Layout ของหน้าทั่วไป / User / Admin
│       ├── pages/          # หน้าเว็บ (Home, Shop, Cart, Checkout, auth, user, admin)
│       ├── routes/         # กำหนดเส้นทาง + ProtectRoute สำหรับ User/Admin
│       ├── store/          # Zustand store (sechand-store)
│       └── utils/          # ฟังก์ชันช่วย (จัดรูปแบบตัวเลข/วันที่, Swiper)
├── server/                 # Backend (Express + Prisma)
│   ├── config/prisma.js    # เชื่อมต่อ Prisma Client
│   ├── controllers/        # logic ของแต่ละ API
│   ├── middlewares/        # authCheck / adminCheck (ตรวจ JWT และสิทธิ์ admin)
│   ├── prisma/             # schema.prisma และ migrations
│   ├── routes/             # เส้นทาง API (โหลดทุกไฟล์อัตโนมัติ)
│   └── server.js           # จุดเริ่มต้นของเซิร์ฟเวอร์
└── sechandshop.sql         # ไฟล์ฐานข้อมูล MySQL พร้อมข้อมูลตัวอย่าง
```

---

## 🚀 วิธีติดตั้งและรันบนเครื่อง

### สิ่งที่ต้องมี
- [Node.js](https://nodejs.org/) (แนะนำเวอร์ชัน 18 ขึ้นไป) และ npm
- MySQL (เช่น XAMPP / MySQL Server)
- บัญชี [Stripe](https://stripe.com/) (ใช้คีย์โหมดทดสอบได้) และบัญชี [Cloudinary](https://cloudinary.com/) สำหรับอัปโหลดรูปสินค้า

### 1) Clone โปรเจ็ก
```bash
git clone https://github.com/exzlotsoul-png/SecHandShop.git
cd SecHandShop
```

### 2) เตรียมฐานข้อมูล
สร้างฐานข้อมูลชื่อ `sechandshop` ใน MySQL แล้วเลือกวิธีใดวิธีหนึ่ง
- **วิธี A (มีข้อมูลตัวอย่าง):** import ไฟล์ `sechandshop.sql` ผ่าน phpMyAdmin
- **วิธี B (ฐานข้อมูลเปล่า):** ให้ Prisma สร้างตารางให้ (ทำหลังขั้นตอนที่ 3)
  ```bash
  cd server
  npx prisma db push
  ```

### 3) ตั้งค่าและรัน Backend
```bash
cd server
npm install
```
สร้างไฟล์ `server/.env`
```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/sechandshop"
SECRET=ใส่ข้อความลับสำหรับ_JWT
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
จากนั้นสร้าง Prisma Client และเริ่มเซิร์ฟเวอร์
```bash
npx prisma generate
npm start
```
ถ้าสำเร็จจะเห็นข้อความ `Server is running on port 5001`

> 💡 ต้องสร้างไฟล์ `.env` ให้เรียบร้อย **ก่อน** รัน `npx prisma generate` เพราะเซิร์ฟเวอร์อาศัย Prisma ในการโหลดค่าจากไฟล์ `.env` (ถ้าไม่มี `STRIPE_SECRET_KEY` เซิร์ฟเวอร์จะเปิดไม่ขึ้น)

### 4) ตั้งค่าและรัน Frontend
เปิดเทอร์มินัลใหม่
```bash
cd client
npm install
```
สร้างไฟล์ `client/.env`
```env
VITE_STRIPE_PK=pk_test_xxxxxxxxxxxxxxxx
```
แล้วรัน
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่ **http://localhost:5173**

### คำสั่งอื่น ๆ ใน `client/`
| คำสั่ง | ความหมาย |
|--------|----------|
| `npm run dev` | รันโหมดพัฒนา |
| `npm run build` | build สำหรับนำไปใช้งานจริง (ไฟล์อยู่ใน `dist/`) |
| `npm run preview` | ดูผลลัพธ์ที่ build แล้ว |
| `npm run lint` | ตรวจโค้ดด้วย ESLint |

> หมายเหตุ: Frontend เรียก API ที่ `http://localhost:5001` (กำหนดไว้ในโค้ด) จึงต้องรัน Backend ไว้ด้วยทุกครั้ง

---

## 👨‍🎓 ผู้จัดทำ

นาย ธนภัทร เตียนต๊ะนันท์ รหัสนักศึกษา 661463013
ติดต่อ: 661463013@crru.ac.th
