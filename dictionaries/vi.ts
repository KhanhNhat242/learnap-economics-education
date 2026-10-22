/**
 * Chuỗi giao diện tiếng Việt. Cấu trúc ở đây là chuẩn — en.ts phải khớp 100% (kiểu Dictionary).
 * Nội dung bám docs/REQUIREMENTS.md mục 4–6 và 12. Không thêm số liệu ngoài phiếu.
 */
const vi = {
  meta: {
    title: 'LearnAP Economics — Luyện thi AP Kinh tế & SAT cùng Tiến sĩ Mỹ',
    description:
      'Luyện thi AP Microeconomics, AP Macroeconomics và SAT cùng Tiến sĩ tốt nghiệp tại Mỹ, giảng viên Đại học RMIT. Lộ trình cá nhân hóa, hướng tới điểm 4–5/5.',
  },
  common: {
    brandName: 'LearnAP',
    brandSuffix: 'Economics',
    logoAlt: 'Logo LearnAP Economics',
    languageLabel: 'Ngôn ngữ',
    languages: { vi: 'Tiếng Việt', en: 'English' },
    skipToContent: 'Bỏ qua tới nội dung chính',
  },
  nav: {
    items: [
      { id: 'expert', label: 'Về Chuyên Gia' },
      { id: 'programs', label: 'Khóa Học' },
      { id: 'journey', label: 'Lộ Trình' },
      { id: 'consult', label: 'Liên hệ' },
    ],
    cta: 'Đăng ký tư vấn',
    openMenu: 'Mở menu',
    closeMenu: 'Đóng menu',
    homeLabel: 'Về đầu trang',
  },
  hero: {
    tagline: 'Học viện Kinh tế & Du học Mỹ chuẩn quốc tế',
    headlineBefore: 'Chinh phục điểm',
    headlineHighlight: 'AP 4–5/5',
    headlineAfter: 'và chứng chỉ SAT cùng Tiến sĩ tốt nghiệp tại Mỹ',
    subheadline:
      'Định hướng tích lũy tín chỉ đại học sớm, tối ưu hóa hồ sơ du học và nắm vững kinh tế vi mô, vĩ mô cùng giảng viên Đại học RMIT.',
    primaryCta: 'Nhận tư vấn lộ trình 1:1',
    secondaryCta: 'Khám phá 5 khóa học',
    highlights: ['Song ngữ Việt – Anh', 'Lộ trình cá nhân hóa', 'Học online 24/7'],
    badges: {
      phd: 'PhD US · RMIT Lecturer',
      target: 'Target 4–5/5 AP',
      standard: 'College Board Standard',
    },
    video: {
      label: 'Bài giảng video',
      title: 'AP Macroeconomics · Unit 1',
      playLabel: 'Xem bài giảng mẫu',
    },
    imageAlt: 'Học sinh học tập trong thư viện cổ điển với đèn bàn xanh',
    videoImageAlt: 'Giảng viên giảng bài kinh tế trước bảng công thức',
    scrollHint: 'Cuộn xuống',
  },
  trust: {
    label: 'Vì sao chọn LearnAP',
    items: [
      { id: 'phd', title: 'PhD US', text: 'Trực tiếp giảng dạy bởi Tiến sĩ tốt nghiệp tại Mỹ' },
      { id: 'rmit', title: 'RMIT Lecturer', text: 'Giảng viên Đại học RMIT – chuẩn học thuật quốc tế' },
      { id: 'years', title: '8+ Năm', text: 'Kinh nghiệm thực chiến luyện thi AP & SAT' },
      { id: 'roadmap', title: 'Lộ trình cá nhân hóa', text: 'Bám sát format đề thi quốc tế, nhiều học viên đạt điểm cao' },
      { id: 'bilingual', title: 'Song ngữ Việt – Anh', text: 'Nền tảng học tập hiện đại, hỗ trợ hai ngôn ngữ' },
      { id: 'lms', title: 'LMS & Live Chat', text: 'Hệ thống học bảo mật, học linh hoạt kèm chat hỗ trợ trực tiếp' },
    ],
  },
  expert: {
    eyebrow: '',
    title: 'Học cùng chuyên gia – Chuẩn hóa tư duy học thuật',
    intro:
      'Mỗi lộ trình được dẫn dắt trực tiếp bởi Tiến sĩ tốt nghiệp tại Mỹ, hiện là giảng viên Đại học RMIT, với hơn 8 năm kinh nghiệm luyện thi thực chiến.',
    points: [
      {
        title: 'Học vị Tiến sĩ Mỹ',
        text: 'Nền tảng học thuật chuẩn quốc tế, giảng giải bản chất kinh tế học thay vì học thuộc công thức.',
      },
      {
        title: 'Cá nhân hóa, bám sát format đề thi',
        text: 'Lộ trình riêng cho từng học viên, luyện đúng cấu trúc câu hỏi của đề thi quốc tế.',
      },
      {
        title: 'Đồng hành cùng học sinh & phụ huynh',
        text: 'Theo dõi tiến độ sát sao, phản hồi thường xuyên để phụ huynh luôn nắm rõ kết quả học tập của con.',
      },
    ],
    experienceValue: '8+',
    experienceLabel: 'năm kinh nghiệm luyện thi',
    credentialTitle: 'PhD US',
    credentialText: 'Giảng viên Đại học RMIT',
    cta: 'Trao đổi cùng chuyên gia',
    imageAlt: 'Học viên theo dõi giảng viên giảng bài trực tuyến qua màn hình máy tính',
  },
  programs: {
    eyebrow: '',
    title: '5 chương trình đào tạo trọng tâm',
    description:
      'Từ AP Kinh tế, SAT đến kèm 1:1 — mỗi chương trình bám sát chuẩn quốc tế và mục tiêu riêng của từng học viên.',
    detailCta: 'Xem chi tiết',
    carousel: {
      label: 'Danh sách khóa học',
      prev: 'Khóa học trước',
      next: 'Khóa học tiếp theo',
    },
    courseSite: {
      label: 'Website khóa học',
      title: 'Học trọn lộ trình trên website khóa học trực tuyến',
      text: 'Xem danh mục khóa học, học bài giảng video và ôn tập với tài liệu song ngữ trên hệ thống LMS bảo mật — linh hoạt mọi lúc, mọi nơi.',
      cta: 'Truy cập website khóa học',
      newTab: '(mở trong tab mới)',
    },
    modal: {
      overviewLabel: 'Tổng quan khóa học',
      tuitionLabel: 'Học phí',
      tuitionValue: 'Liên hệ để được tư vấn',
      consultCta: 'Nhận tư vấn khóa này',
      close: 'Đóng',
    },
  },
  platform: {
    eyebrow: 'Nền Tảng LMS',
    title: 'Trải nghiệm học tập hiện đại, linh hoạt mọi lúc',
    description:
      'Hệ thống quản lý khóa học (LMS) bảo mật giúp học viên chủ động thời gian, ôn luyện bài bản và luôn có người đồng hành khi cần.',
    features: [
      {
        id: 'anytime',
        title: 'Học linh hoạt 24/7',
        text: 'Truy cập bài giảng video mọi lúc, mọi nơi trên hệ thống LMS bảo mật.',
      },
      {
        id: 'bilingual',
        title: 'Tài liệu & đề thi song ngữ',
        text: 'Ôn tập với tài liệu Anh – Việt và làm bài test online tương tác trực tiếp.',
      },
      {
        id: 'chat',
        title: 'Chat hỗ trợ trực tiếp',
        text: 'Đặt câu hỏi ngay trong lúc học, được giải đáp nhanh chóng và tận tình.',
      },
    ],
    mockup: {
      course: 'AP Macroeconomics',
      lesson: 'Unit 3 · Tổng cầu & Tổng cung',
      progressLabel: 'Tiến độ',
      chatMessage: 'Thầy ơi, em chưa hiểu đường AD dịch chuyển ạ?',
    },
    imageAlt: 'Học viên đeo tai nghe tập trung học bài trên laptop',
  },
  journey: {
    eyebrow: '',
    title: 'Lộ trình 4 bước chinh phục điểm cao',
    description: 'Một quy trình rõ ràng, đo lường được ở từng giai đoạn — từ buổi test đầu tiên đến ngày thi.',
    steps: [
      {
        title: 'Đánh giá năng lực',
        text: 'Làm bài test đầu vào để xác định điểm mạnh, lỗ hổng kiến thức và mục tiêu điểm số.',
      },
      {
        title: 'Thiết kế lộ trình cá nhân hóa',
        text: 'Xây dựng kế hoạch học riêng theo trình độ, lịch học và mốc thi của từng học viên.',
      },
      {
        title: 'Luyện đề thực chiến',
        text: 'Rèn kỹ năng giải đề theo đúng format quốc tế, sửa bài chi tiết sau mỗi buổi.',
      },
      {
        title: 'Chinh phục mục tiêu',
        text: 'Hướng tới điểm 4–5/5 và tối ưu tín chỉ đại học sớm cho hồ sơ du học.',
      },
    ],
    stepLabel: 'Bước',
  },
  testimonials: {
    eyebrow: 'Cảm Nhận Học Viên & Phụ Huynh',
    title: 'Những hành trình bứt phá điểm số',
    description:
      'Học sinh, phụ huynh và sinh viên chia sẻ về sự tận tâm của giảng viên trong suốt quá trình ôn luyện.',
    sampleNotice: 'Nội dung minh họa — sẽ được thay bằng phản hồi thật của học viên',
    communityAlt: 'Nhóm học sinh trường quốc tế học tập cùng laptop và máy tính bảng',
    prev: 'Cảm nhận trước',
    next: 'Cảm nhận tiếp theo',
    items: [
      {
        name: 'Học viên A.',
        role: 'Học sinh lớp 12 · Trường quốc tế',
        score: 'AP Macroeconomics 5/5',
        quote:
          'Trước đây em rất sợ phần tự luận của AP Macro. Thầy giảng bản chất từng mô hình rất dễ hiểu, sửa bài chi tiết sau mỗi buổi nên em tự tin hẳn khi vào phòng thi.',
      },
      {
        name: 'Phụ huynh B.',
        role: 'Phụ huynh học sinh lớp 11 · Trường chuyên',
        score: 'AP Microeconomics 5/5',
        quote:
          'Điều tôi yên tâm nhất là thầy luôn cập nhật tiến độ của con sau từng giai đoạn. Lộ trình rõ ràng, con học chủ động hơn và gia đình nắm được con cần cải thiện ở đâu.',
      },
      {
        name: 'Học viên C.',
        role: 'Sinh viên năm nhất · Đại học quốc tế',
        score: 'Micro/Macro Economics · High Distinction',
        quote:
          'Môn kinh tế đại cương bằng tiếng Anh từng là nỗi lo lớn của mình. Tài liệu song ngữ và các buổi kèm 1:1 giúp mình nắm chắc kiến thức và qua môn với kết quả cao.',
      },
    ],
  },
  consult: {
    eyebrow: '',
    title: 'Bắt đầu lộ trình chinh phục AP & SAT cùng chuyên gia ngay hôm nay',
    message:
      'Để lại thông tin, đội ngũ LearnAP sẽ liên hệ tư vấn lộ trình phù hợp với mục tiêu của bạn — hoàn toàn miễn phí.',
    benefits: ['Tư vấn 1:1 cùng chuyên gia', 'Gợi ý lộ trình theo mục tiêu điểm số', 'Hỗ trợ song ngữ Việt – Anh'],
    form: {
      title: 'Đăng ký nhận tư vấn',
      nameLabel: 'Họ và tên',
      namePlaceholder: 'Nguyễn Văn A',
      nameRequired: 'Vui lòng nhập họ và tên',
      phoneLabel: 'Số điện thoại / Zalo',
      phonePlaceholder: 'VD: 0901 234 567',
      phoneRequired: 'Vui lòng nhập số điện thoại hoặc Zalo',
      phoneInvalid: 'Số điện thoại chưa đúng định dạng',
      roleLabel: 'Bạn là',
      roleRequired: 'Vui lòng chọn vai trò của bạn',
      roles: [
        { value: 'parent', label: 'Phụ huynh' },
        { value: 'highschool', label: 'Học sinh cấp 3' },
        { value: 'university', label: 'Sinh viên đại học' },
      ],
      courseLabel: 'Khóa học quan tâm',
      coursePlaceholder: 'Chọn khóa học',
      courseRequired: 'Vui lòng chọn khóa học quan tâm',
      submit: 'Nhận tư vấn lộ trình miễn phí',
      successTitle: 'Đăng ký thành công!',
      successText: 'Cảm ơn bạn. Chuyên gia LearnAP sẽ liên hệ trong thời gian sớm nhất.',
      demoNote: 'Bản demo: thông tin chưa được gửi đi.',
      again: 'Gửi đăng ký khác',
    },
    backgroundAlt: 'Thư viện rộng lớn ngập ánh sáng',
  },
  footer: {
    about:
      'Luyện thi AP Kinh tế Vi mô, Vĩ mô và SAT cùng Tiến sĩ tốt nghiệp tại Mỹ — giảng viên Đại học RMIT.',
    coursesHeading: 'Khóa học',
    exploreHeading: 'Khám phá',
    contactHeading: 'Liên hệ',
    hotlineLabel: 'Hotline / Zalo',
    facebookLabel: 'Facebook',
    terms: 'Điều khoản học vụ',
    privacy: 'Chính sách bảo mật',
    copyright: '© 2026 LearnAP Economics. Bảo lưu mọi quyền.',
  },
  floating: {
    open: 'Mở khung chat hỗ trợ',
    close: 'Đóng khung chat hỗ trợ',
    title: 'Bạn cần hỗ trợ?',
    text: 'Nhắn tin ngay, đội ngũ LearnAP sẽ phản hồi bạn sớm nhất.',
    messenger: 'Nhắn qua Messenger',
    zalo: 'Chat qua Zalo',
    call: 'Gọi hotline',
    backToTop: 'Lên đầu trang',
  },
}

export default vi
