# ✨ Hệ Thống Thiết Kế & Giao Diện (Premium Design System)

Tài liệu này tổng hợp phong cách thiết kế giao diện (UI/UX) được áp dụng tại `HomePage.tsx`. Mục tiêu là để các trang khác trong dự án (như Dashboard, Profile, Courses...) học theo và duy trì sự nhất quán, tạo ra trải nghiệm "Premium" (cao cấp) xuyên suốt ứng dụng.

---

## 🎨 1. Bảng màu (Color Palette)

Dự án ưu tiên sử dụng các dải màu Gradient thay vì màu đơn sắc để tạo cảm giác hiện đại và có chiều sâu.

*   **Màu nền chính (Background)**:
    *   Sáng (Light Mode): `bg-slate-50`
    *   Tối (Dark Mode): `bg-slate-900`
*   **Màu nhấn (Accent Gradients)**: Dùng cho Icon, Viền (Border), hoặc các dải phân cách.
    *   *Sinh thái/Thành công*: `from-emerald-500 to-teal-400`
    *   *Sáng tạo/Năng động*: `from-amber-500 to-pink-500`
    *   *Công nghệ/Chuyên nghiệp*: `from-indigo-500 to-purple-500`
*   **Màu Nút bấm chính (Call to Action)**:
    *   Sử dụng màu Vàng nổi bật trên nền tối: `bg-yellow-400 text-emerald-950`
    *   Hiệu ứng hover: `hover:brightness-105 shadow-lg hover:shadow-xl transition-all duration-300`

---

## ✒️ 2. Nghệ thuật chữ (Typography)

*   **Tiêu đề lớn (Hero Title)**:
    *   Cấu trúc: `text-[2.5rem] md:text-[3rem] font-black leading-tight`.
    *   Sử dụng component `<GradientText>` (font Poppins) cho các từ khóa thương hiệu (VD: *QuizUniverse*).
    *   Sử dụng `<TypewriterText>` để tạo hiệu ứng gõ chữ sinh động.
*   **Văn bản phụ (Description)**:
    *   Màu sắc: `text-slate-600 dark:text-slate-400` (hoặc `text-white/90 dark:text-gray-300` nếu nằm trên nền màu tối/gradient).
    *   Tránh dùng màu đen tuyền (`text-black`), hãy dùng `text-slate-900` hoặc `text-slate-800` để làm mềm mắt.

---

## 💫 3. Hiệu ứng chuyển động (Framer Motion)

Sự khác biệt của giao diện Premium nằm ở **Micro-animations**. Luôn sử dụng `framer-motion` cho các tương tác nhỏ nhất.

### 3.1. Hiệu ứng xuất hiện (Entrance Animations)
Luôn thiết lập độ trễ (delay) xếp tầng để các thành phần không hiện ra cùng một lúc.
```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.1 }}
>
  Nội dung...
</motion.div>
```

### 3.2. Hiệu ứng Hover (Card Hover)
Khi người dùng di chuột qua các thẻ (Card), thẻ phải phản hồi lại:
```tsx
<motion.div
  whileHover={{ y: -8 }} // Nổi nhẹ lên trên
  className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
>
  Nội dung Card...
</motion.div>
```

### 3.3. Cuộn trang (Scroll Animations)
Sử dụng wrapper component `<FadeInOnView>` (đã có sẵn trong `shared/ui`) để các phần tử bên dưới chỉ hoạt ảnh (animate) khi người dùng cuộn chuột tới.

---

## 🧊 4. Glassmorphism & UI Element (Kính mờ)

Sử dụng phong cách Glassmorphism cho các nhãn (Badge), Header, hoặc Modal để tạo cảm giác trong suốt cao cấp.

*   **Ví dụ một Badge Glassmorphism**:
```tsx
<div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur dark:bg-white/5 dark:ring-white/10">
  <Sparkles className="h-4 w-4" />
  Badge Nội Dung
</div>
```

---

## 🧩 5. Tái sử dụng Component (Reusability)

Thay vì code lại từ đầu, hãy sử dụng các UI components đã được thiết kế sẵn cho dự án:

1.  **Nền động**: `<AnimatedGradientBackground />` - Dùng cho các khu vực Hero/Header cần sự thu hút mạnh.
2.  **Chữ hiển thị đẹp**: `<TypewriterText />` và `<GradientText />`.
3.  **Trang trí nền**: `<OrbitingSkills />` và `<Floating />` - Đặt ở layer chìm dưới cùng (`z-index: 0`) để không gian web không bị trống trải.
4.  **Thẻ nội dung**: `<FeatureCard />` và `<StepCard />`.

---

## 💡 Tổng kết (Checklist cho các trang mới)

Khi code một trang mới (VD: `SettingsPage` hoặc `Dashboard`), hãy tự hỏi:
- [ ] Mình đã sử dụng nền `bg-slate-50 dark:bg-slate-900` chưa?
- [ ] Các thẻ (Cards) đã có bo góc `rounded-2xl` và hiệu ứng nổi `shadow` khi di chuột chưa?
- [ ] Các nút bấm đã có icon (Lucide React) và bo tròn `rounded-full` / `rounded-lg` chưa?
- [ ] Khi load trang, nội dung có hiện lên từ từ (mượt mà) bằng `framer-motion` không, hay là giật cục xuất hiện ngay lập tức?
- [ ] Đã tương thích hoàn hảo (đủ độ tương phản) cho cả Light Mode và Dark Mode chưa?
