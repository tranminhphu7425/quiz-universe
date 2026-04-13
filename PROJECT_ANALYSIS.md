# 📊 Quiz Universe - Phân Tích Toàn Bộ Dự Án

> **Ngày phân tích:** 2026-04-12  
> **Tác giả:** Trần Minh Phú  
> **Repository:** https://github.com/tranminhphu7425/quiz-universe

---

## 1. 🎯 Tổng Quan Dự Án

**Quiz Universe** là một nền tảng web toàn diện cho việc tạo, quản lý và tham gia các bài quiz trực tuyến. Dự án sử dụng kiến trúc **monorepo** với:

- **Frontend**: React 19 + TypeScript + Vite (port 5173)
- **Backend**: Spring Boot 3.5.4 + Java 21 (port 8080)
- **Database**: MySQL 9.5 (database: `quiz_universe`)
- **Deployment**: GitHub Pages (tĩnh) + Backend riêng

---

## 2. 🛠️ Tech Stack Chi Tiết

### 2.1 Frontend
| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| React | 19.1.1 | UI Library |
| TypeScript | ~5.8.3 | Type safety |
| Vite | 7.1.2 | Build tool |
| Tailwind CSS | 3.4.17 | Styling |
| Framer Motion | 12.23.16 | Animations |
| React Router | 7.9.6 | Routing (HashRouter) |
| TanStack React Query | 5.85.3 | Data fetching & caching |
| Axios | 1.11.0 | HTTP client |
| Zod | 4.0.17 | Schema validation |
| Three.js / R3F | 0.180.0 | 3D graphics |
| i18next | 25.3.6 | Đa ngôn ngữ |
| Recharts | 3.2.1 | Charts/Dashboard |
| Lucide React | 0.540.0 | Icons |
| React Hot Toast | 2.6.0 | Notifications |
| STOMP.js + SockJS | 7.2.0 / 1.6.1 | WebSocket (real-time) |
| Headless UI | 2.2.9 | Accessible components |
| React Select | 5.10.2 | Dropdown select |
| AOS | 2.3.4 | Scroll animations |
| Sonner | 2.0.7 | Toast notifications (alt) |
| Playwright | 1.57.0 | E2E testing / crawling |

### 2.2 Backend
| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| Spring Boot | 3.5.4 | Framework chính |
| Java | 21 | Ngôn ngữ |
| Spring Data JPA | (included) | ORM |
| MySQL Connector/J | (included) | Database driver |
| Spring Security | (included) | Auth & Authorization |
| JWT (jjwt) | 0.11.5 | Token-based authentication |
| BCrypt | (included) | Password hashing |
| Spring WebSocket | (included) | Real-time communication |
| SpringDoc OpenAPI | 2.5.0 | Swagger API docs |
| Lombok | (included) | Code reduction |
| Spring Validation | (included) | Input validation |
| Spring DevTools | (included) | Hot reload |

---

## 3. 📁 Cấu Trúc Dự Án

```
quiz-universe/
├── 📂 src/                          # Frontend source (React + TS)
│   ├── App.tsx                      # Root component (providers tree)
│   ├── App.css                      # Global styles
│   ├── 📂 app/                      # App-level configuration
│   │   ├── main.tsx                 # Entry point
│   │   ├── router.tsx               # Route definitions (HashRouter)
│   │   ├── 📂 providers/            # Context Providers
│   │   │   ├── AuthProvider.tsx     # ✅ Auth context (JWT, login/register/logout)
│   │   │   ├── QueryProvider.tsx    # React Query configuration
│   │   │   ├── ThemeProvider.tsx    # Dark/Light theme
│   │   │   └── I18nProvider.tsx     # i18n internationalization
│   │   └── 📂 store/               # State management
│   │       ├── index.ts             # (placeholder - 19 bytes)
│   │       └── 📂 slices/           # Store slices
│   │
│   ├── 📂 pages/                    # Page components (20 modules)
│   │   ├── 📂 home/                 
│   │   │   └── HomePage.tsx         # ✅ Trang chủ (21KB - đầy đủ)
│   │   ├── 📂 auth/                 
│   │   │   ├── LoginPage.tsx        # ✅ Đăng nhập (10KB)
│   │   │   ├── RegisterPage.tsx     # ✅ Đăng ký (13KB)
│   │   │   ├── ForgotPasswordPage.tsx # ✅ Quên mật khẩu (10KB)
│   │   │   ├── SetupProfilePage.tsx # ✅ Thiết lập profile (14KB)
│   │   │   ├── DashboardPage.tsx    # ✅ Dashboard cá nhân (34KB)
│   │   │   ├── ProfilePage.tsx      # ✅ Trang profile (27KB)
│   │   │   └── SettingsPage.tsx     # ✅ Cài đặt (57KB - rất chi tiết)
│   │   ├── 📂 subjects/            
│   │   │   ├── SubjectsPage.tsx     # ✅ Danh sách môn học (47KB)
│   │   │   ├── SubjectDetailPage.tsx # ✅ Chi tiết môn học (19KB)
│   │   │   └── CreateSubjectPage.tsx # ✅ Tạo môn học (54KB)
│   │   ├── 📂 question-banks/       
│   │   │   ├── QuestionBanksPage.tsx # ✅ Ngân hàng câu hỏi (46KB)
│   │   │   └── CreateQuestionBankPage.tsx # ✅ Tạo ngân hàng (54KB)
│   │   ├── 📂 questions/            
│   │   │   ├── QuestionsPage.tsx    # ✅ Xem câu hỏi (42KB)
│   │   │   └── EditQuestionPage.tsx # ✅ Sửa câu hỏi (30KB)
│   │   ├── 📂 exams/               
│   │   │   ├── CreateExamPage.tsx   # ⚠️ PLACEHOLDER (135 bytes - "Auto-generated")
│   │   │   ├── TakeExamPage.tsx     # ⚠️ PLACEHOLDER (171 bytes - "Auto-generated")
│   │   │   └── ReviewExamPage.tsx   # ⚠️ PLACEHOLDER (135 bytes - "Auto-generated")
│   │   ├── 📂 admin/               
│   │   │   ├── AdminDashboardPage.tsx # ✅ Admin dashboard (8KB)
│   │   │   └── AdminUsersPage.tsx   # ✅ Quản lý users (8KB)
│   │   ├── 📂 forum/                
│   │   │   └── ForumPage.tsx        # ✅ Diễn đàn (36KB)
│   │   ├── 📂 feedback/             
│   │   │   └── FeedbackPage.tsx     # ✅ Phản hồi (35KB)
│   │   ├── 📂 ctu/                  
│   │   │   ├── CTUHomePage.tsx      # ✅ Trang CTU (9KB)
│   │   │   └── CTUCalendarPage.tsx  # ✅ Lịch CTU (23KB)
│   │   ├── 📂 resources/            
│   │   │   └── ExplorePage.tsx      # ✅ Khám phá tài nguyên (21KB)
│   │   ├── 📂 documents/            
│   │   │   ├── DocumentationPage.tsx # ✅ Tài liệu (4KB)
│   │   │   ├── QuickGuidePage.tsx   # ✅ Hướng dẫn nhanh (7KB)
│   │   │   └── UserGuidePage.tsx    # ✅ Hướng dẫn SD (4KB)
│   │   ├── 📂 about/                
│   │   │   └── AboutPage.tsx        # ✅ Giới thiệu (9KB)
│   │   ├── 📂 contact/              
│   │   │   └── ContactPage.tsx      # ✅ Liên hệ
│   │   ├── 📂 recruit/              
│   │   │   └── RecruitmentPage.tsx  # ✅ Tuyển dụng (30KB)
│   │   ├── 📂 faq/                  
│   │   │   └── FaqPage.tsx          # ✅ FAQ
│   │   ├── 📂 legal/                
│   │   │   └── TermsPage.tsx        # ✅ Điều khoản
│   │   ├── 📂 security/             
│   │   │   └── SecurityPage.tsx     # ✅ Bảo mật
│   │   ├── 📂 cookies/              
│   │   │   └── CookiesPage.tsx      # ✅ Cookie policy
│   │   └── 📂 not-found/            
│   │       └── NotFoundPage.tsx     # ✅ 404 page
│   │
│   ├── 📂 features/                 # Feature modules (FSD pattern)
│   │   ├── 📂 auth/                 
│   │   │   ├── api.ts               # (placeholder - 19 bytes)
│   │   │   ├── hooks.ts             # (placeholder - 19 bytes)
│   │   │   └── 📂 components/       
│   │   ├── 📂 admin/                
│   │   │   ├── api.ts               # (placeholder - 19 bytes)
│   │   │   └── 📂 components/       
│   │   ├── 📂 exams/                
│   │   │   ├── api.ts               # (placeholder - 19 bytes)
│   │   │   ├── hooks.ts             # (placeholder - 19 bytes)
│   │   │   ├── 📂 components/       
│   │   │   └── 📂 utils/            
│   │   ├── 📂 question-bank/        
│   │   │   ├── api.ts               # (placeholder - 19 bytes)
│   │   │   ├── hooks.ts             # (placeholder - 19 bytes)
│   │   │   ├── 📂 components/       
│   │   │   └── 📂 utils/            
│   │   ├── 📂 subjects/             
│   │   │   ├── api.ts               # ✅ (261 bytes) 
│   │   │   └── 📂 components/       
│   │   └── 📂 universities/         
│   │       ├── api.ts               # (placeholder - 19 bytes)
│   │       └── 📂 components/       
│   │
│   ├── 📂 shared/                   # Shared resources
│   │   ├── 📂 api/                  # API service layer
│   │   │   ├── api.ts               # ✅ ApiService + PublicApiService (Axios)
│   │   │   ├── questionBanksApi.ts  # ✅ CRUD question banks
│   │   │   ├── questionsApi.ts      # ✅ CRUD questions
│   │   │   ├── subjectApi.ts        # ✅ Subject queries
│   │   │   ├── userApi.ts           # ✅ User profile API
│   │   │   ├── favoriteApi.ts       # ✅ Favorites service
│   │   │   ├── adminApi.ts          # ⚠️ Minimal (chỉ getAdminStats)
│   │   │   ├── major-universityApi.ts # ✅ Major/University queries
│   │   │   ├── http.ts             # HTTP utilities
│   │   │   └── endpoints.ts        # (placeholder)
│   │   ├── 📂 types/               # TypeScript type definitions
│   │   │   ├── user.ts             # ✅ User, Role types
│   │   │   ├── question.ts         # ✅ Question, QuestionOption
│   │   │   ├── questionBank.ts     # ✅ QuestionBank, CRUD requests
│   │   │   ├── subject.ts          # ✅ Subject, SubjectOption
│   │   │   ├── favorite.ts         # ✅ Favorite types
│   │   │   ├── common.ts           # ✅ Shared types
│   │   │   ├── pagination.ts       # ✅ PageParams, PaginatedResponse
│   │   │   ├── courses.ts          # ✅ Course types (CTU)
│   │   │   ├── profile.ts          # ✅ Profile types
│   │   │   ├── authUser.ts         # ✅ ChangePasswordRequest
│   │   │   ├── major.ts            # ✅ Major type
│   │   │   ├── university.ts       # ✅ University type
│   │   │   └── aos.d.ts            # AOS type declarations
│   │   ├── 📂 hooks/               
│   │   │   ├── useAuth.tsx          # ⚠️ DUPLICATE: Mock auth (cũ, không còn dùng)
│   │   │   ├── useHMR.ts           # Hot module reload hook
│   │   │   ├── usePagination.ts    # (placeholder)
│   │   │   └── useTenant.ts        # (placeholder)
│   │   ├── 📂 ui/                   # Shared UI components
│   │   │   ├── FadeInOnView.tsx    # Scroll animation wrapper
│   │   │   ├── Floatting.tsx       # Floating animation
│   │   │   ├── GradientText.tsx    # Gradient text component
│   │   │   ├── OrbitingSkills.tsx  # 3D orbiting skills viz
│   │   │   ├── ThemeToggle.tsx     # Dark/Light toggle
│   │   │   ├── TypewriterText.tsx  # Typewriter effect
│   │   │   ├── 📂 form/           # Form components
│   │   │   └── 📂 table/          # Table components
│   │   ├── 📂 config/              
│   │   │   ├── env.ts             # (placeholder)
│   │   │   └── tenants.ts         # (placeholder)
│   │   ├── 📂 constants/           
│   │   │   ├── exam.ts            # (placeholder)
│   │   │   ├── permissions.ts     # (placeholder)
│   │   │   └── roles.ts           # (placeholder)
│   │   ├── 📂 lib/                 
│   │   │   ├── cn.ts              # className merge utility
│   │   │   ├── array.ts           # Array utilities
│   │   │   ├── date.ts            # (placeholder)
│   │   │   └── rand.ts            # (placeholder)
│   │   └── 📂 utils/               
│   │       ├── downloadUtils.ts   # Download helpers
│   │       └── textUtils.ts       # Text utilities
│   │
│   ├── 📂 components/              # Global components
│   │   └── 📂 ui/                   
│   │       ├── ClassTable.tsx      # Table component
│   │       ├── dock.tsx            # Dock component
│   │       ├── colorful-dock.tsx   # Colorful dock
│   │       ├── floating-dock.tsx   # Floating dock
│   │       ├── minimal-dock.tsx    # Minimal dock
│   │       └── simple-dock.tsx     # Simple dock
│   │
│   ├── 📂 widgets/                  # Widget components
│   │   ├── Header.tsx              # ✅ Main header/nav (50KB!)
│   │   ├── HeaderCTU.tsx           # ✅ CTU header (51KB)
│   │   ├── Footer.tsx              # ✅ Footer (14KB)
│   │   ├── ControlBar.tsx          # ✅ Control bar (5KB)
│   │   ├── DashboardAdminSidebar.tsx # ✅ Admin sidebar (4KB)
│   │   ├── FeatureCard.tsx         # ✅ Feature card (2KB)
│   │   ├── StepCard.tsx            # ✅ Step card (2KB)
│   │   ├── HeroIllustration.tsx    # ✅ Hero 3D illustration (9KB)
│   │   ├── LoadingState.tsx        # ✅ Loading component
│   │   ├── ScrollToTop.tsx         # ✅ Scroll to top
│   │   ├── Breadcrumbs.tsx         # (placeholder)
│   │   └── Sidebar.tsx             # (placeholder)
│   │
│   ├── 📂 entities/                 # Domain entities (FSD)
│   │   ├── 📂 exam/                 
│   │   │   ├── index.ts            # (placeholder)
│   │   │   └── model.ts            # (placeholder)
│   │   ├── 📂 subject/              
│   │   │   ├── index.ts            # ✅ Exports
│   │   │   └── model.ts            # ✅ Subject model (957 bytes)
│   │   ├── 📂 user/                 
│   │   │   ├── index.ts            # (placeholder)
│   │   │   └── model.ts            # (placeholder)
│   │   └── 📂 university/           
│   │       ├── index.ts            # (placeholder)
│   │       └── model.ts            # (placeholder)
│   │
│   ├── 📂 layouts/                  # Layout components
│   │   ├── Layout.tsx              # ✅ Main layout (Header + Footer + Outlet)
│   │   ├── LayoutNoFooter.tsx      # ✅ Layout without footer
│   │   ├── AdminLayout.tsx         # ✅ Admin layout (sidebar)
│   │   ├── CTULayout.tsx           # ✅ CTU layout
│   │   └── PublicLayout.tsx        # ✅ Public layout
│   │
│   ├── 📂 styles/                   
│   │   ├── index.css               # ✅ Global styles (2KB)
│   │   └── theme.css               # (placeholder)
│   │
│   ├── 📂 assets/                   # Static assets (images, fonts)
│   └── 📂 test/                     # Test files
│
├── 📂 demo/                         # Backend (Spring Boot)
│   ├── pom.xml                      # Maven configuration
│   ├── 📂 src/main/java/com/quizuniverse/
│   │   ├── QuizUniverseApplication.java  # ✅ Spring Boot entry
│   │   ├── 📂 controller/          # REST Controllers
│   │   │   ├── AuthController.java       # ✅ Login, Register, ChangePassword
│   │   │   ├── QuestionController.java   # ✅ CRUD Questions
│   │   │   ├── QuestionBankController.java # ✅ CRUD Question Banks
│   │   │   ├── SubjectController.java    # ✅ Subject queries
│   │   │   ├── UserController.java       # ✅ User management
│   │   │   ├── FavoriteController.java   # ✅ Favorite toggle
│   │   │   └── ProfileController.java    # ✅ Profile setup/update
│   │   ├── 📂 entity/              # JPA Entities
│   │   │   ├── User.java                 # ✅
│   │   │   ├── Question.java             # ✅
│   │   │   ├── QuestionBank.java         # ✅
│   │   │   ├── QuestionOption.java       # ✅
│   │   │   ├── Subject.java              # ✅
│   │   │   ├── Topic.java                # ✅
│   │   │   ├── Major.java                # ✅
│   │   │   ├── University.java           # ✅
│   │   │   ├── FavoriteQuestionBank.java # ✅
│   │   │   ├── FavoriteSubject.java      # ✅
│   │   │   ├── FavoriteQuestionBankId.java # ✅ (Composite key)
│   │   │   └── FavoriteSubjectId.java    # ✅ (Composite key)
│   │   ├── 📂 service/             # Business logic
│   │   │   ├── AuthService.java          # ✅
│   │   │   ├── QuestionService.java      # ✅ (7KB - most complex)
│   │   │   ├── QuestionBankService.java  # ✅
│   │   │   ├── SubjectService.java       # ✅
│   │   │   ├── UserService.java          # ✅
│   │   │   ├── FavoriteService.java      # ✅
│   │   │   ├── ProfileService.java       # ✅
│   │   │   ├── MajorService.java         # ✅
│   │   │   ├── UniversityService.java    # ✅
│   │   │   ├── SubjectNotFoundException.java # ✅
│   │   │   └── 📂 impl/
│   │   │       ├── FavoriteServiceImpl.java      # ✅ (11KB)
│   │   │       └── QuestionBankServiceImpl.java  # ✅ (10KB)
│   │   ├── 📂 repository/          # Spring Data JPA Repos
│   │   │   ├── UserRepository.java               # ✅
│   │   │   ├── QuestionRepository.java           # ✅
│   │   │   ├── QuestionBankRepository.java       # ✅
│   │   │   ├── QuestionOptionRepository.java     # ✅
│   │   │   ├── SubjectRepository.java            # ✅
│   │   │   ├── MajorRepository.java              # ✅
│   │   │   ├── UniversityRepository.java         # ✅
│   │   │   ├── FavoriteQuestionBankRepository.java # ✅
│   │   │   └── FavoriteSubjectRepository.java    # ✅
│   │   ├── 📂 security/            # JWT Security
│   │   │   ├── JwtUtil.java              # ✅ JWT token generation/validation
│   │   │   └── JwtAuthenticationFilter.java # ✅ JWT filter
│   │   ├── 📂 config/              # Spring Config
│   │   │   ├── SecurityConfig.java       # ✅ CORS, Security chain, BCrypt
│   │   │   └── WebSocketConfig.java      # ✅ STOMP WebSocket endpoint
│   │   ├── 📂 dto/                  # Data Transfer Objects (22 files)
│   │   │   ├── LoginRequest/Response     # ✅
│   │   │   ├── RegisterRequest/Response  # ✅
│   │   │   ├── QuestionDTO/OptionDTO     # ✅
│   │   │   ├── QuestionBankDTO           # ✅
│   │   │   ├── SubjectDTO                # ✅
│   │   │   ├── UserDTO                   # ✅
│   │   │   ├── Favorite DTOs             # ✅
│   │   │   ├── ProfileSetupRequest       # ✅
│   │   │   ├── ChangePasswordRequest     # ✅
│   │   │   └── UpdateQuestionPayload     # ✅
│   │   ├── 📂 exception/           # Exception handling
│   │   │   ├── GlobalExceptionHandler.java       # ✅
│   │   │   ├── ResourceNotFoundException.java    # ✅
│   │   │   └── UnauthorizedAccessException.java  # ✅
│   │   └── 📂 subject/             # (Additional subject module)
│   └── 📂 target/                   # Maven build output
│
├── 📂 public/                        # Static public assets
│   ├── 📂 data/                     # JSON data files
│   │   ├── questionBanks.json       # ✅ Bank metadata (3KB)
│   │   ├── questionBank3.json       # ✅ Bank 3 questions (121KB)
│   │   ├── questionBank4.json       # ✅ Bank 4 questions (134KB)
│   │   ├── questionBank5.json       # ✅ Bank 5 questions (30KB)
│   │   ├── questionBank7.json       # ✅ Bank 7 questions (125KB)
│   │   ├── questionBank8.json       # ✅ Bank 8 questions (220KB)
│   │   ├── questionBank10.json      # ✅ Bank 10 questions (170KB)
│   │   ├── courses.json             # ✅ Courses data (898KB)
│   │   ├── ket_qua_dkmh_full.json   # ✅ Registration results (3.1MB)
│   │   └── ket_qua_dkmh_full1.json  # ✅ Registration results v2 (2.9MB)
│   ├── 📂 tenant-assets/           # Multi-tenant assets
│   ├── files.json                   # Google Drive file tree (11MB!)
│   ├── favicon.svg                  # Favicon
│   └── vite.svg                     # Vite logo
│
├── 📂 docs/                          # Built production (GitHub Pages)
│   ├── index.html                   # Deployed entry
│   ├── 📂 assets/                   # Built JS/CSS bundles
│   └── 📂 data/                     # Deployed data files
│
├── 📂 scripts/                       
│   └── sync-banks.js                # Sync question banks script
│
├── 📂 node_modules/                  # npm dependencies
│
├── 📄 Cấu hình files
│   ├── package.json                 # npm config + scripts
│   ├── vite.config.ts               # Vite config (aliases, proxy, build→docs)
│   ├── tsconfig.json                # TypeScript config
│   ├── tsconfig.app.json            # TS app config
│   ├── tsconfig.node.json           # TS node config
│   ├── tailwind.config.js           # Tailwind config
│   ├── postcss.config.js            # PostCSS config
│   ├── eslint.config.js             # ESLint config
│   ├── .env                         # Environment variables
│   └── .gitignore                   # Git ignore rules
│
├── 📄 Database & Tools
│   ├── database.sql                 # ✅ Complete MySQL dump (26KB)
│   ├── generate-tree.cjs            # Google Drive tree generator
│   ├── generate-tree1.js            # Tree generator v2
│   ├── crawl-playwright.js          # Web crawler (Playwright)
│   ├── cao_data.py                  # Python data script
│   ├── cao_data1.py                 # Python data script v2
│   ├── setup1.js                    # Setup script
│   └── ket_qua_dkmh.json           # Registration data (898KB)
│
└── 📄 Logs (nên clean up)
    ├── hs_err_pid*.log              # 10 JVM crash logs (53-66KB each)
    └── replay_pid*.log              # 6 replay logs (426-742KB each)
```

---

## 4. 🗄️ Database Schema (MySQL)

### 4.1 Bảng chính (18 tables + 1 view)

| Bảng | Mục đích | PK | Records (ước lượng) |
|---|---|---|---|
| `users` | Người dùng | `user_id` (bigint) | ~33 |
| `subjects` | Môn học | `subject_id` (bigint) | ~11 |
| `question_banks` | Ngân hàng câu hỏi | `bank_id` (bigint) | ~10 |
| `questions` | Câu hỏi | `question_id` (bigint) | ~776 |
| `question_options` | Lựa chọn trả lời | `option_id` (bigint) | ~3020 |
| `question_versions` | Lịch sử phiên bản câu hỏi | `qv_id` (bigint) | ~122 |
| `question_tags` | Tags cho câu hỏi (M-M) | `(question_id, tag_id)` | - |
| `question_topics` | Topics cho câu hỏi (M-M) | `(question_id, topic_id)` | - |
| `exams` | Đề thi | `exam_id` (bigint) | ~1 |
| `exam_sections` | Phần của đề thi | `section_id` (bigint) | ~1 |
| `exam_questions` | Câu hỏi trong đề thi (M-M) | `eq_id` (bigint) | ~2 |
| `tags` | Tags | `tag_id` (bigint) | ~134 |
| `topics` | Chủ đề theo môn | `topic_id` (bigint) | ~10 |
| `sources` | Nguồn tài liệu | `source_id` (bigint) | ~6 |
| `source_sections` | Phần của nguồn | `section_id` (bigint) | ~8 |
| `import_jobs` | Jobs import câu hỏi | `job_id` (bigint) | ~1 |
| `import_items` | Items được import | `item_id` (bigint) | ~1 |
| `bloom_levels` | Cấp độ Bloom | `bloom_id` (tinyint) | - |
| `difficulty_levels` | Cấp độ khó | `difficulty_id` (tinyint) | - |
| `universities` | Trường đại học | `university_code` (varchar) | - |
| `majors` | Ngành học | `major_id` (bigint) | ~121 |
| `user_favorite_question_banks` | Yêu thích ngân hàng | `(user_id, bank_id)` | - |
| `user_favorite_subjects` | Yêu thích môn | `(user_id, subject_id)` | - |

### 4.2 View
- **`v_question_full`**: JOIN questions + subjects + question_banks + difficulty_levels + bloom_levels + sources + source_sections

### 4.3 Entity Relationship Diagram (Tóm tắt)

```
users ─┬─ question_banks (created_by)
       ├─ questions (created_by, updated_by)
       ├─ exams (created_by)
       ├─ sources (created_by)
       ├─ import_jobs (initiated_by)
       ├─ user_favorite_question_banks ──── question_banks
       ├─ user_favorite_subjects ────────── subjects
       ├─ universities (FK: university_code)
       └─ majors (FK: major_id)

subjects ─┬─ question_banks (subject_id)
           ├─ questions (subject_id)
           ├─ exams (subject_id)
           └─ topics (subject_id)

question_banks ── questions (bank_id)

questions ─┬─ question_options (question_id, CASCADE)
           ├─ question_tags ── tags
           ├─ question_topics ── topics
           ├─ question_versions (question_id, CASCADE)
           ├─ difficulty_levels (difficulty_id)
           ├─ bloom_levels (bloom_id)
           ├─ sources (source_id)
           └─ source_sections (section_id)

exams ─┬─ exam_sections (exam_id, CASCADE)
       └─ exam_questions (exam_id, CASCADE) ── questions
                                              └── exam_sections (section_id)

sources ── source_sections (source_id, CASCADE)
        └─ import_jobs (source_id)
               └─ import_items (job_id, CASCADE)
```

---

## 5. 🔌 API Endpoints

### 5.1 Backend REST API (`/api`)

#### Auth (`/api/auth`)
| Method | Endpoint | Auth | Mô tả |
|---|---|---|---|
| POST | `/auth/login` | ❌ | Đăng nhập → `{token, user}` |
| POST | `/auth/register` | ❌ | Đăng ký → `{token, id, name, email}` |
| POST | `/auth/change-password` | ✅ JWT | Đổi mật khẩu |

#### Users (`/api/users`)
| Method | Endpoint | Auth | Mô tả |
|---|---|---|---|
| GET | `/users` | ✅ | Lấy profile user hiện tại |
| PUT | `/users` | ✅ | Cập nhật profile |

#### Profile (`/api/profile`)
| Method | Endpoint | Auth | Mô tả |
|---|---|---|---|
| POST | `/profile/setup` | ✅ | Setup profile ban đầu |

#### Subjects (`/api/subjects`)
| Method | Endpoint | Auth | Mô tả |
|---|---|---|---|
| GET | `/subjects` | ❌ | Lấy tất cả môn học |
| GET | `/subjects/{id}/name` | ❌ | Lấy tên môn theo ID |

#### Question Banks (`/api/question-banks`)
| Method | Endpoint | Auth | Mô tả |
|---|---|---|---|
| POST | `/question-banks` | ✅ | Tạo ngân hàng mới |
| GET | `/question-banks` | ✅ | Lấy tất cả (paginated) |
| GET | `/question-banks/{id}` | ✅ | Lấy theo ID |
| PUT | `/question-banks/{id}` | ✅ | Cập nhật |
| DELETE | `/question-banks/{id}` | ✅ | Xóa |
| PATCH | `/question-banks/{id}/visibility` | ✅ | Đổi visibility |
| GET | `/question-banks/subject/{id}` | ✅ | Lấy theo môn |
| GET | `/question-banks/me` | ✅ | Lấy banks của tôi |
| GET | `/question-banks/search` | ✅ | Tìm kiếm |
| POST | `/question-banks/clone` | ✅ | Clone bank |
| GET | `/question-banks/statistics` | ✅ | Thống kê |

#### Questions (`/api/questions`)
| Method | Endpoint | Auth | Mô tả |
|---|---|---|---|
| GET | `/questions/subject/{id}` | ❌ | Lấy câu hỏi theo môn |
| GET | `/questions/question-bank/{id}` | ❌ | Lấy câu hỏi theo bank |
| GET | `/questions/count` | ❌ | Tổng số câu hỏi |
| POST | `/questions/subject/{id}` | ❌ | Tạo câu hỏi mới |
| PUT | `/questions/{id}` | ❌ | Cập nhật câu hỏi |
| DELETE | `/questions/{id}` | ❌ | Xóa câu hỏi |

#### Favorites (`/api/favorites`)
| Method | Endpoint | Auth | Mô tả |
|---|---|---|---|
| POST | `/favorites/question-banks/{id}` | ❌* | Thêm yêu thích bank |
| DELETE | `/favorites/question-banks/{id}` | ❌* | Xóa yêu thích bank |
| GET | `/favorites/question-banks` | ❌* | Lấy tất cả banks yêu thích |
| GET | `/favorites/question-banks/{id}/status` | ❌* | Check trạng thái |
| POST | `/favorites/subjects/{id}` | ❌* | Thêm yêu thích môn |
| DELETE | `/favorites/subjects/{id}` | ❌* | Xóa yêu thích môn |
| GET | `/favorites/subjects` | ❌* | Lấy tất cả môn yêu thích |
| GET | `/favorites/subjects/{id}/status` | ❌* | Check trạng thái |

> ❌* = Được config permitAll trong SecurityConfig nhưng logic sử dụng JWT token

#### Lookup APIs
| Method | Endpoint | Auth | Mô tả |
|---|---|---|---|
| GET | `/universities` | ❌ | Danh sách trường |
| GET | `/majors` | ❌ | Danh sách ngành |

### 5.2 WebSocket
- **Endpoint**: Cấu hình trong `WebSocketConfig.java`
- **Protocol**: STOMP over SockJS
- **Frontend**: `@stomp/stompjs` + `sockjs-client`

---

## 6. 🔐 Authentication & Authorization

### Flow
```
1. User POST /api/auth/login {email, password}
2. Backend: verify BCrypt password → generate JWT
3. Response: {token, user}
4. Frontend: store token in localStorage/sessionStorage
5. Subsequent requests: Authorization: Bearer <token>
6. JwtAuthenticationFilter validates token on each request
```

### Security Rules (SecurityConfig)
- **Public**: `/api/auth/**`, `/api/universities`, `/api/majors`, `/api/subjects/**`, `/api/questions/**`, `/api/favorites/**`
- **Authenticated**: `/api/question-banks/**`, mọi endpoint khác
- **Session**: STATELESS (JWT only)
- **CORS**: Chỉ cho phép `http://localhost:5173`
- **Password**: BCrypt

### Roles (Frontend)
```typescript
type Role = "admin" | "user" | "teacher";
```

### Roles (Backend - Database)
```sql
`role` varchar(255) -- flexible, no enum constraint
```

---

## 7. 🧭 Routing Map

### Layout: `Layout` (Header + Footer)
| Path | Page | Auth | Mô tả |
|---|---|---|---|
| `/` | HomePage | ❌ | Trang chủ |
| `/login` | LoginPage | ❌ | Đăng nhập |
| `/register` | RegisterPage | ❌ | Đăng ký |
| `/forgot-password` | ForgotPasswordPage | ❌ | Quên mật khẩu |
| `/about` | AboutPage | ❌ | Giới thiệu |
| `/contact` | ContactPage | ❌ | Liên hệ |
| `/terms` | TermsPage | ❌ | Điều khoản |
| `/security` | SecurityPage | ❌ | Bảo mật |
| `/cookies` | CookiesPage | ❌ | Cookie |
| `/quickguide` | QuickGuidePage | ❌ | Hướng dẫn nhanh |
| `/documents` | DocumentationPage | ❌ | Tài liệu |
| `/userguide` | UserGuidePage | ❌ | Hướng dẫn sử dụng |
| `/forum` | ForumPage | ❌ | Diễn đàn |
| `/faq` | FaqPage | ❌ | FAQ |
| `/recruits` | RecruitmentPage | ❌ | Tuyển dụng |
| `/feedback` | FeedbackPage | ❌ | Phản hồi |
| `/subjects` | SubjectsPage | ❌ | Danh sách môn |
| `/subject/:id` | SubjectDetailPage | ❌ | Chi tiết môn |
| `/subject/create` | CreateSubjectPage | ❌ | Tạo môn mới |
| `/questions/subject/:id` | QuestionsPage | ❌ | Câu hỏi theo môn |
| `/questions/subject/:id/edit` | EditQuestionPage | ❌ | Sửa câu hỏi |
| `/question-banks` | QuestionBanksPage | ❌ | Ngân hàng câu hỏi |
| `/question-bank/create` | CreateQuestionBankPage | ❌ | Tạo ngân hàng |
| `/resources` | ExplorePage | ❌ | Tài nguyên |
| `/dashboard` | DashboardPage | ✅ | Dashboard cá nhân |
| `/settings` | SettingsPage | ✅ | Cài đặt |
| `/setup` | SetupProfilePage | ✅ | Setup profile |
| `/profile` | ProfilePage | ✅ | Trang cá nhân |
| `/admin` | AdminDashboardPage | ✅ | Admin dashboard |
| `/admin/users` | AdminUsersPage | ✅ | Quản lý users |
| `/admin/settings` | AdminDashboardPage | ✅ | Admin settings |

### Layout: `LayoutNoFooter`
| Path | Page | Auth | Mô tả |
|---|---|---|---|
| `/questions/question-bank/:bankId` | QuestionsPage | ❌ | Câu hỏi theo bank |
| `/questions/question-bank/:bankId/edit` | EditQuestionPage | ❌ | Sửa câu hỏi |

### Layout: `CTULayout`
| Path | Page | Auth | Mô tả |
|---|---|---|---|
| `/ctu` | CTUHomePage | ❌ | Trang CTU |
| `/ctu/calendar` | CTUCalendarPage | ❌ | Lịch CTU |

---

## 8. 📊 Trạng Thái Tính Năng

### ✅ Đã hoàn thành (Functional)
| Tính năng | Frontend | Backend | Ghi chú |
|---|---|---|---|
| Authentication (Login/Register) | ✅ | ✅ | JWT, BCrypt, LocalStorage |
| User Profile & Settings | ✅ | ✅ | Setup, Update, Change Password |
| Dashboard cá nhân | ✅ | ✅ | Stats, charts với Recharts |
| Quản lý Môn học | ✅ | ✅ | CRUD, search, filter |
| Quản lý Ngân hàng câu hỏi | ✅ | ✅ | CRUD, visibility, clone |
| Xem & Sửa câu hỏi | ✅ | ✅ | MCQ, fill-in, options |
| Favorites (Yêu thích) | ✅ | ✅ | Banks + Subjects |
| Admin Dashboard | ✅ | ⚠️ Minimal | Stats page có, API basic |
| Admin User Management | ✅ | ✅ | List, manage users |
| Home Page | ✅ | N/A | 3D Hero, features |
| Trang thông tin (About, FAQ...) | ✅ | N/A | Static pages |
| Forum Page | ✅ | N/A | UI xong, backend unclear |
| Feedback Page | ✅ | N/A | UI xong |
| CTU Pages | ✅ | N/A | Calendar, Home |
| Resources/Explore | ✅ | N/A | Google Drive integration |
| Dark/Light Theme | ✅ | N/A | ThemeProvider |
| i18n (Đa ngôn ngữ) | ✅ | N/A | I18nProvider |

### ⚠️ Placeholder / Chưa hoàn thành
| Tính năng | Frontend | Backend | Vấn đề |
|---|---|---|---|
| **Tạo đề thi (CreateExam)** | ❌ PLACEHOLDER | ❌ Chưa có | Chỉ có `<div>CreateExamPage</div>` |
| **Làm bài thi (TakeExam)** | ❌ PLACEHOLDER | ❌ Chưa có | Chỉ có `<div>TakeExamPage</div>` |
| **Xem lại kết quả (ReviewExam)** | ❌ PLACEHOLDER | ❌ Chưa có | Chỉ có `<div>ReviewExamPage</div>` |
| Feature module APIs | ❌ Nhiều placeholder | - | `features/*/api.ts` = 19 bytes |
| Feature module hooks | ❌ Nhiều placeholder | - | `features/*/hooks.ts` = 19 bytes |
| Entity models | ❌ Phần lớn placeholder | - | `entities/*/model.ts` = 19 bytes |
| Constants (roles, permissions) | ❌ Placeholder | - | 19 bytes mỗi file |
| Breadcrumbs | ❌ Placeholder | - | 19 bytes |
| Sidebar | ❌ Placeholder | - | 19 bytes |
| Password Reset (API backend) | ❌ Frontend có UI | ❌ Chưa implement | `requestPasswordReset` gọi API nhưng backend chưa có endpoint |
| WebSocket Features | ⚠️ Config xong | ⚠️ Config xong | Chưa có real-time features thực tế |

---

## 9. 🔧 Cấu Hình Quan Trọng

### Environment Variables (`.env`)
```
VITE_API_BASE=http://localhost:8080/api
BASE_URL=http://localhost:5173
```

### Vite Config
- **Base URL**: `/quiz-universe/` (cho GitHub Pages)
- **Build output**: `docs/` folder
- **Proxy**: `/api` → `http://localhost:8080`
- **Port**: 5173 (strictPort)
- **Aliases**: `@`, `@app`, `@shared`, `@features`, `@entities`, `@pages`, `@layouts`, `@widgets`

### Scripts
```bash
npm run dev            # Chạy cả frontend + backend (npm-run-all)
npm run dev:frontend   # Chỉ frontend (vite)
npm run dev:backend    # Chỉ backend (mvn spring-boot:run)
npm run build          # TypeScript check + Vite build
npm run deploy         # gh-pages deploy
npm run sync-banks     # Sync question banks
```

---

## 10. ⚠️ Vấn Đề & Cải Thiện

### 10.1 Vấn đề nghiêm trọng

1. **🔴 Exam module hoàn toàn trống**: 3 trang exam (Create, Take, Review) chỉ là placeholder. Đây là tính năng core nhưng chưa implement.
   
2. **🔴 Duplicate AuthProvider**: 
   - `src/shared/hooks/useAuth.tsx` - Mock auth cũ (158 dòng, mock user)
   - `src/app/providers/AuthProvider.tsx` - Auth thật (228 dòng, gọi API)
   - Cả 2 export cùng tên `useAuth`, tiềm ẩn import sai

3. **🔴 Security gaps**: 
   - Questions API được set `permitAll` (cả POST, PUT) - ai cũng có thể tạo/sửa/xóa câu hỏi
   - Favorites API `permitAll` nhưng cần user context
   - Console.log token trong AuthProvider (dòng 107, 147) → **security risk**

4. **🟡 Console.log tràn lan**: Nhiều `console.log` debug trong production code (AuthProvider, api.ts)

### 10.2 Vấn đề cấu trúc

5. **🟡 Quá nhiều placeholder files** (19 bytes): ~20+ files chỉ chứa comment hoặc rỗng. Tạo noise khi navigate code.

6. **🟡 Feature Sliced Design (FSD) không nhất quán**: 
   - `features/` có structure nhưng logic chính nằm trong `pages/` và `shared/api/`
   - Nhiều feature modules rỗng

7. **🟡 File sizes quá lớn**: 
   - `Header.tsx` = 50KB, `HeaderCTU.tsx` = 51KB → Cần tách components
   - `SettingsPage.tsx` = 57KB → Cần refactor
   - `CreateSubjectPage.tsx` = 54KB
   - `CreateQuestionBankPage.tsx` = 54KB

8. **🟡 `files.json` = 11MB** trong public - rất nặng

### 10.3 Cần dọn dẹp

9. **🟡 JVM crash logs**: 10 file `hs_err_pid*.log` + 6 file `replay_pid*.log` (tổng ~6MB) → Nên xóa và thêm vào `.gitignore`

10. **🟡 Data files lớn trong repo**: 
    - `ket_qua_dkmh.json` (898KB ở root)
    - `ket_qua_dkmh_full.json` (3.1MB)
    - `ket_qua_dkmh_full1.json` (2.9MB)

11. **🟡 File tạm**: `tempCodeRunnerFile.js`, `package.txt` → Cần xóa

### 10.4 Cải thiện đề xuất

12. **Kết nối Exam**: Database đã có schema (exams, exam_sections, exam_questions) nhưng chưa có backend API tương ứng (không có ExamController, ExamService, ExamRepository)

13. **Role-based access control**: Frontend có 3 roles nhưng chưa có middleware/guard riêng cho từng role

14. **Password Reset flow**: Frontend code gọi `/auth/password/request-reset` và `/auth/password/reset` nhưng backend `AuthController` chưa có endpoints này

15. **Admin Stats API**: `adminApi.ts` sử dụng `fetch` thay vì `apiService` (inconsistent)

---

## 11. 📈 Thống Kê Code

### Frontend
| Metric | Giá trị |
|---|---|
| Tổng pages | 20 modules (36+ page components) |
| Tổng API files | 10 files |
| Tổng types | 13 type files |
| Tổng widgets | 12 components |
| Placeholder files (~19 bytes) | ~20+ files |

### Backend  
| Metric | Giá trị |
|---|---|
| Controllers | 7 |
| Entities | 12 |
| Services | 10 + 2 impl |
| Repositories | 9 |
| DTOs | 22 |
| Exception handlers | 3 |

### Database
| Metric | Giá trị |
|---|---|
| Tables | 23 |
| Views | 1 |
| Estimated rows (questions) | ~776 |
| Estimated rows (options) | ~3020 |
| Estimated rows (users) | ~33 |

---

## 12. 🚀 Ưu Tiên Phát Triển Tiếp

### Priority 1: Core Features (Exam Module)
1. Tạo `ExamController`, `ExamService`, `ExamRepository` (backend)
2. Implement `CreateExamPage` - chọn câu hỏi, cấu hình thời gian, điểm
3. Implement `TakeExamPage` - giao diện làm bài, countdown timer
4. Implement `ReviewExamPage` - xem lại đáp án, giải thích

### Priority 2: Security Fixes
1. Bảo vệ Questions API (bỏ `permitAll` cho POST/PUT/DELETE)
2. Xóa console.log token
3. Xóa/rename mock `useAuth.tsx` để tránh nhầm lẫn
4. Implement Password Reset endpoints ở backend

### Priority 3: Code Quality
1. Dọn dẹp logs (JVM crash, replay)
2. Tách các file >30KB thành components nhỏ
3. Xóa placeholder files hoặc implement
4. Thống nhất API pattern (bỏ raw `fetch` trong `adminApi.ts`)

### Priority 4: Features Enhancement
1. Implement WebSocket real-time features
2. Role-based UI (admin, teacher, student views)
3. Hoàn thiện FSD structure
4. E2E testing với Playwright
