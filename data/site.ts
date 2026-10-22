/**
 * Thông tin liên hệ lấy từ Phiếu Dev 31 (docs/REQUIREMENTS.md — mục 2).
 * SĐT là số Mỹ; số/Zalo Việt Nam đang chờ khách xác nhận (Q3).
 */
export const site = {
  brand: 'LearnAP Economics',
  phone: {
    display: '+1 (669) 247-9708',
    href: 'tel:+16692479708',
  },
  zaloHref: 'https://zalo.me/16692479708',
  facebookHref: 'https://www.facebook.com/profile.php?id=61583968445838',
  messengerHref: 'https://m.me/61583968445838',
  /**
   * PLACEHOLDER — link website bán khóa học (section Programs). Tạm trỏ tới trang tham khảo cleveracademy.vn
   * (docs/REQUIREMENTS.md mục 8, đã bỏ tham số fbclid). Thay bằng domain/route khóa học thật của LearnAP khi chốt Q4.
   */
  courseSiteHref: 'https://cleveracademy.vn/',
  logo: '/images/logo-learnap.webp',
  logoMark: '/images/logo-learnap-mark.webp',
} as const
