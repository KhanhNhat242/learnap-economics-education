<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Quy tắc dự án LearnAP_Economics

Các quy tắc dưới đây áp dụng cho **mọi** thay đổi trong repo (code, nội dung, thiết kế, tài liệu). Nếu một yêu cầu mới mâu thuẫn với quy tắc này hoặc với `docs/REQUIREMENTS.md`, phải dừng lại và hỏi trước khi làm.

## 1. Yêu cầu là nguồn sự thật

- `docs/REQUIREMENTS.md` là nguồn duy nhất về phạm vi, nội dung và phong cách. Đọc nó trước khi làm bất kỳ tính năng/trang/section nào.
- Mọi tính năng, trang, section phải truy được về một mục trong `docs/REQUIREMENTS.md`. Thứ không có trong đó thì không tự thêm, mà đề xuất trước.
- Khi yêu cầu thay đổi (khách phản hồi, sale bổ sung): cập nhật `docs/REQUIREMENTS.md` (nội dung + mục "Nhật ký thay đổi") **trước**, code **sau**. Câu hỏi mở đã có trả lời thì chuyển từ mục "Câu hỏi mở" vào đúng mục nội dung.
- Không sửa nội dung gắn nhãn **[KHÁCH]** theo ý mình (tên khóa học, USP, khách hàng mục tiêu). Chỉ được trình bày lại câu chữ cho hay hơn, giữ nguyên ý và số liệu.

## 2. Nội dung trung thực

- Không bịa số liệu, giá, tên/ảnh giảng viên, tên học viên, điểm số, trường đỗ, chứng nhận, đối tác hay logo trường.
- Claim chỉ được dùng: PhD tốt nghiệp tại Mỹ, Giảng viên ĐH RMIT, 8+ năm kinh nghiệm, mục tiêu điểm 4–5/5, chuẩn College Board.
- Thiếu dữ liệu thì dùng placeholder theo mục 9 của `docs/REQUIREMENTS.md`, đặt tập trung trong file dữ liệu để dễ thay.
- Không dùng logo/thương hiệu College Board, RMIT, Fulbright, BUV… dưới dạng hình ảnh; chỉ nhắc tên trong câu chữ.

## 3. Song ngữ VI / EN (bắt buộc)

- Mọi chữ hiển thị cho người dùng (nội dung, nút, label, thông báo lỗi form, `alt` ảnh, `aria-label`, metadata/SEO) phải có **cả VI và EN**. Không hardcode chuỗi hiển thị trong component.
- Chuỗi để ở dictionary theo locale (`vi`, `en`); dữ liệu khóa học để trong file dữ liệu có trường cho cả hai ngôn ngữ. Thêm chuỗi ở một ngôn ngữ thì phải thêm ở ngôn ngữ còn lại trong cùng thay đổi.
- Routing đa ngôn ngữ theo hướng dẫn chính thức của bản Next.js đang cài: `node_modules/next/dist/docs/01-app/02-guides/internationalization.md` (route `app/[lang]/…`, chuyển locale bằng `proxy`). Mặc định `vi`. `<html lang>` phải đúng theo locale.
- Bản EN viết như người bản xứ (khách hàng có du học sinh tại Mỹ), không dịch máy từng chữ.

## 4. Phong cách & UI

- EdTech Academic Style: hiện đại, học thuật, chuyên nghiệp, thoáng, sắc nét; tham chiếu Thinkific, Clever Academy, heura.vn (landing), cleveracademy.vn (website).
- **Mobile-first.** Mỗi trang/section phải kiểm tra ở ~375px, ~768px, ≥1280px; không có cuộn ngang.
- Màu, font, bo góc, bóng đổ khai báo một lần làm design token (`@theme` trong `app/globals.css`); không rải mã màu hex trong className. Màu thương hiệu lấy theo logo thật của khách khi có.
- Ant Design (`antd`) dùng cho thành phần phức tạp (form, modal, tabs, tooltip…); bố cục và style dùng Tailwind. Theme antd phải dùng cùng token màu.
- Khả năng truy cập: ảnh có `alt`, nút icon có `aria-label`, focus nhìn thấy được, độ tương phản đạt WCAG AA, tôn trọng `prefers-reduced-motion`.
- Ảnh dùng `next/image`; tài sản của khách để trong `public/images/` với tên mô tả rõ (vd. `logo-learnap.svg`).

## 5. Kỹ thuật

- Next.js 16 (App Router) + React 19 + TypeScript strict + Tailwind v4 + antd 6. Đọc tài liệu trong `node_modules/next/dist/docs/` trước khi dùng API Next.js (xem khối quy tắc Next.js ở đầu file).
- Mặc định Server Component; chỉ thêm `'use client'` cho phần thật sự cần tương tác (menu, chuyển ngôn ngữ, form, chat). Không đặt `'use client'` cho cả trang.
- Cấu trúc: `app/` cho route; `components/` cho UI tái sử dụng (chia `components/landing`, `components/courses`, `components/ui`…); `data/` cho dữ liệu mock (khóa học…); `dictionaries/` cho chuỗi VI/EN; `docs/` cho tài liệu.
- Mỗi trang có `metadata` (title, description) song ngữ, đúng tên thương hiệu.
- Giai đoạn demo: frontend + dữ liệu mock, không backend, không thanh toán thật, không thu thập dữ liệu thật (mục 7.3 của yêu cầu). Không thêm thư viện mới khi chưa cần thiết; thêm thì nêu lý do.
- Không commit thông tin bí mật; cấu hình nhạy cảm để trong `.env*` (đã bị gitignore).

## 6. Hoàn thành một thay đổi

Một thay đổi chỉ coi là xong khi:
1. `npm run lint` và `npm run build` chạy không lỗi.
2. Đã xem trên trình duyệt ở cả VI và EN, cả mobile và desktop.
3. Không còn chuỗi hiển thị hardcode, không còn nội dung bịa (mục 2).
4. Nếu thay đổi phạm vi/nội dung: `docs/REQUIREMENTS.md` đã được cập nhật.

## 7. Phần còn sót từ template cũ (phải thay)

Repo được khởi tạo từ template của một dự án homestay khác. Không được giữ lại trong sản phẩm:
- `public/images/mainlogo-img1.jpg` — logo homestay (nhà gỗ, cây thông), **không phải logo LearnAP**.
- `metadata.title = "Booking Homestay"` trong `app/layout.tsx`; `"name": "ngu-am-o-dalat"` trong `package.json`.
- Màu `#01796F`, `#EFE8DC` và class `.glass-panel` màu kem trong `app/globals.css` / `components/Header.tsx` — thuộc nhận diện cũ.
- Menu mẫu trong `components/Header.tsx` (Trang chủ / Về chúng tôi / Dịch vụ / Liên hệ) chưa song ngữ, chưa theo sitemap của dự án.
