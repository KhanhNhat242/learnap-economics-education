import type { Locale } from '@/lib/i18n-config'

type Localized = Record<Locale, string>

export type CourseId = 'ap-micro' | 'ap-macro' | 'sat' | 'mentor' | 'materials'

export interface Course {
  id: CourseId
  /** Nhãn phân loại hiển thị trên thẻ */
  tag: Localized
  title: Localized
  /** 2 dòng mô tả ngắn trên thẻ (≈15–20 từ) */
  summary: Localized
  /** Mô tả đầy đủ — giữ nguyên ý theo phiếu [KHÁCH] */
  description: Localized
  image: string
  imageAlt: Localized
}

/** Đúng 5 sản phẩm, đúng thứ tự theo docs/REQUIREMENTS.md — mục 4. Giá: chưa có (Q5). */
export const courses: Course[] = [
  {
    id: 'ap-micro',
    tag: { vi: 'AP · Vi mô', en: 'AP · Micro' },
    title: {
      vi: 'Khóa luyện thi AP Microeconomics',
      en: 'AP Microeconomics Exam Prep',
    },
    summary: {
      vi: 'Chuẩn College Board, hệ thống video bài giảng và bài tập thực hành toàn diện.',
      en: 'Aligned with College Board, with full video lectures and comprehensive practice sets.',
    },
    description: {
      vi: 'Khóa học Kinh tế Vi mô theo chuẩn College Board Hoa Kỳ, gồm video bài giảng và tài liệu thực hành.',
      en: 'A Microeconomics course built on the U.S. College Board framework, combining video lectures with hands-on practice materials.',
    },
    image: '/images/laptop-video-lecture.avif',
    imageAlt: {
      vi: 'Laptop đang phát video bài giảng trực tuyến',
      en: 'Laptop playing an online video lecture',
    },
  },
  {
    id: 'ap-macro',
    tag: { vi: 'AP · Vĩ mô', en: 'AP · Macro' },
    title: {
      vi: 'Khóa luyện thi AP Macroeconomics',
      en: 'AP Macroeconomics Exam Prep',
    },
    summary: {
      vi: 'Phương pháp giải đề thực chiến, mục tiêu bứt phá điểm số 4–5/5.',
      en: 'Exam-tested problem-solving methods built to push your score to a 4 or 5.',
    },
    description: {
      vi: 'Khóa học Kinh tế Vĩ mô chuyên sâu, phương pháp giải đề thực chiến hướng tới điểm 4–5/5.',
      en: 'An in-depth Macroeconomics course with practical, exam-tested strategies aimed at scoring a 4–5 out of 5.',
    },
    image: '/images/lecture-hall.avif',
    imageAlt: {
      vi: 'Giảng đường đại học với sinh viên đang nghe giảng',
      en: 'University lecture hall with students attending a lecture',
    },
  },
  {
    id: 'sat',
    tag: { vi: 'SAT', en: 'SAT' },
    title: {
      vi: 'Luyện thi chứng chỉ SAT',
      en: 'SAT Test Preparation',
    },
    summary: {
      vi: 'Chiến thuật làm bài chuẩn hóa, tối ưu điểm số để săn học bổng du học Mỹ.',
      en: 'Proven test-taking strategies to maximize your score for U.S. scholarship applications.',
    },
    description: {
      vi: 'Khóa chiến thuật làm bài và luyện bộ đề chuẩn hóa cho học sinh săn học bổng du học Mỹ.',
      en: 'Test-taking strategy and standardized practice sets for students pursuing U.S. study-abroad scholarships.',
    },
    image: '/images/students-library-laptops.avif',
    imageAlt: {
      vi: 'Học sinh ôn luyện với laptop trong thư viện',
      en: 'Students studying on laptops in a library',
    },
  },
  {
    id: 'mentor',
    tag: { vi: 'Mentor 1:1', en: '1:1 Mentoring' },
    title: {
      vi: 'Lớp kèm / Mentor 1:1 theo yêu cầu',
      en: 'On-Demand 1:1 Tutoring & Mentoring',
    },
    summary: {
      vi: 'Hướng dẫn trực tiếp, giải đáp chuyên sâu và định hướng tích lũy tín chỉ đại học sớm.',
      en: 'Direct guidance, in-depth answers and a clear plan for earning college credit early.',
    },
    description: {
      vi: 'Hướng dẫn trực tiếp, giải đáp thắc mắc và định hướng tích lũy tín chỉ sớm đại học.',
      en: 'One-on-one guidance, answers to every question, and direction on earning early college credit.',
    },
    image: '/images/mentor-video-call.avif',
    imageAlt: {
      vi: 'Học viên trao đổi 1:1 với giảng viên qua video call',
      en: 'Student in a one-on-one video call with an instructor',
    },
  },
  {
    id: 'materials',
    tag: { vi: 'Tài liệu · Đề thi', en: 'Materials · Mock Tests' },
    title: {
      vi: 'Gói tài liệu & Đề thi thử độc quyền',
      en: 'Exclusive Study Materials & Mock Tests',
    },
    summary: {
      vi: 'Ngân hàng đề online cùng tài liệu ôn tập song ngữ Anh – Việt.',
      en: 'An online question bank with bilingual English–Vietnamese review materials.',
    },
    description: {
      vi: 'Hệ thống câu hỏi, bài test online và tài liệu ôn tập song ngữ.',
      en: 'A question bank, online tests and bilingual review materials.',
    },
    image: '/images/student-laptop-smiling.avif',
    imageAlt: {
      vi: 'Học viên làm bài test online trên laptop',
      en: 'Student taking an online test on a laptop',
    },
  },
]
