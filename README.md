# Quiz Universe

Quiz Universe là một nền tảng web toàn diện cho việc tạo, quản lý và tham gia các bài quiz trực tuyến. Dự án bao gồm frontend hiện đại được xây dựng bằng React và TypeScript, cùng với backend API mạnh mẽ sử dụng Spring Boot.

## 🚀 Tính năng chính

- **Quản lý người dùng**: Đăng ký, đăng nhập, xác thực JWT
- **Tạo và quản lý quiz**: Tạo đề thi, ngân hàng câu hỏi, môn học
- **Giao diện admin**: Quản lý người dùng, thống kê, giám sát hệ thống
- **Tham gia quiz**: Giao diện người dùng để làm bài thi
- **Dashboard**: Thống kê cá nhân và tổng quan
- **Forum và Feedback**: Tương tác cộng đồng
- **Đa ngôn ngữ**: Hỗ trợ i18n
- **Responsive**: Thiết kế đáp ứng trên mọi thiết bị
- **WebSocket**: Thời gian thực cho các tính năng tương tác

## 🛠️ Tech Stack

### Frontend
- **React 19** với TypeScript
- **Vite** - Build tool nhanh
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching
- **React Router** - Routing
- **Three.js** - 3D graphics
- **Axios** - HTTP client
- **Zod** - Schema validation

### Backend
- **Spring Boot 3.5** với Java 21
- **Spring Data JPA** - ORM
- **MySQL** - Database
- **Spring Security** - Authentication & Authorization
- **JWT** - Token-based auth
- **WebSocket** - Real-time communication
- **SpringDoc OpenAPI** - API documentation

### Công cụ khác
- **Playwright** - E2E testing và web crawling
- **ESLint** - Code linting
- **Maven** - Java build tool
- **GitHub Pages** - Deployment

## 📋 Yêu cầu hệ thống

- Node.js >= 18
- Java 21
- MySQL >= 8.0
- Maven >= 3.6

## 🚀 Cài đặt và chạy

### 1. Clone repository
```bash
git clone https://github.com/tranminhphu7425/quiz-universe.git
cd quiz-universe
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Thiết lập database
- Tạo database MySQL
- Import file `database.sql` để tạo schema và dữ liệu mẫu

### 4. Cấu hình backend
- Vào thư mục `demo/`
- Cập nhật file `application.properties` với thông tin database

### 5. Chạy ứng dụng
```bash
npm run dev
```

Lệnh này sẽ khởi động cả frontend (port 5173) và backend (port 8080).

## 📜 Scripts có sẵn

- `npm run dev` - Chạy cả frontend và backend
- `npm run dev:frontend` - Chỉ chạy frontend
- `npm run dev:backend` - Chỉ chạy backend
- `npm run build` - Build production
- `npm run typecheck` - Kiểm tra TypeScript
- `npm run lint` - Lint code
- `npm run preview` - Preview build
- `npm run deploy` - Deploy lên GitHub Pages

## 🏗️ Cấu trúc dự án

```
quiz-universe/
├── src/                    # Frontend source code
│   ├── app/               # App configuration
│   ├── components/        # Reusable components
│   ├── features/          # Feature modules
│   ├── layouts/           # Layout components
│   ├── lib/               # Utilities
│   ├── pages/             # Page components
│   └── shared/            # Shared resources
├── demo/                  # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   └── test/
│   └── pom.xml
├── public/                # Static assets
├── docs/                  # Built documentation
├── database.sql           # Database schema
└── package.json
```

## 🌐 API Documentation

Sau khi chạy backend, truy cập:
- Swagger UI: `http://localhost:8080/swagger-ui.html`

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này sử dụng license MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 👨‍💻 Tác giả

**Trần Minh Phú** - [tranminhphu7425](https://github.com/tranminhphu7425)

## 🙏 Lời cảm ơn

Cảm ơn tất cả contributors và cộng đồng open source đã hỗ trợ phát triển dự án này!
