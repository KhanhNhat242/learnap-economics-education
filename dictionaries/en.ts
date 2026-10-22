import type { Dictionary } from './index'

/** English UI strings. Must mirror vi.ts exactly (enforced by the Dictionary type). */
const en: Dictionary = {
  meta: {
    title: 'LearnAP Economics — AP Economics & SAT Prep with a U.S. PhD',
    description:
      'Prepare for AP Microeconomics, AP Macroeconomics and the SAT with a U.S.-trained PhD and RMIT University lecturer. Personalized study plans aimed at a 4–5 score.',
  },
  common: {
    brandName: 'LearnAP',
    brandSuffix: 'Economics',
    logoAlt: 'LearnAP Economics logo',
    languageLabel: 'Language',
    languages: { vi: 'Tiếng Việt', en: 'English' },
    skipToContent: 'Skip to main content',
  },
  nav: {
    items: [
      { id: 'expert', label: 'Our Expert' },
      { id: 'programs', label: 'Courses' },
      { id: 'journey', label: 'Roadmap' },
      { id: 'consult', label: 'Contact' },
    ],
    cta: 'Book a consultation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeLabel: 'Back to top',
  },
  hero: {
    tagline: 'World-class Economics & U.S. Study-Abroad Academy',
    headlineBefore: 'Score a',
    headlineHighlight: '4–5 on AP',
    headlineAfter: 'and ace the SAT with a U.S.-trained PhD',
    subheadline:
      'Earn college credit early, strengthen your study-abroad profile and master micro- and macroeconomics with an RMIT University lecturer.',
    primaryCta: 'Get a 1:1 study plan',
    secondaryCta: 'Explore 5 courses',
    highlights: ['Bilingual Vietnamese – English', 'Personalized study plans', 'Learn online 24/7'],
    badges: {
      phd: 'PhD US · RMIT Lecturer',
      target: 'Target 4–5/5 AP',
      standard: 'College Board Standard',
    },
    video: {
      label: 'Video lecture',
      title: 'AP Macroeconomics · Unit 1',
      playLabel: 'Watch a sample lecture',
    },
    imageAlt: 'Students studying in a classic library with green desk lamps',
    videoImageAlt: 'Instructor teaching economics in front of a formula chalkboard',
    scrollHint: 'Scroll down',
  },
  trust: {
    label: 'Why LearnAP',
    items: [
      { id: 'phd', title: 'PhD US', text: 'Taught directly by a U.S.-trained PhD' },
      { id: 'rmit', title: 'RMIT Lecturer', text: 'RMIT University lecturer with international academic standards' },
      { id: 'years', title: '8+ Years', text: 'Hands-on experience coaching AP & SAT students' },
      { id: 'roadmap', title: 'Personalized Roadmap', text: 'Built around real exam formats, with many high-scoring students' },
      { id: 'bilingual', title: 'Vietnamese – English', text: 'A modern learning platform in both languages' },
      { id: 'lms', title: 'LMS & Live Chat', text: 'A secure LMS to learn at your own pace, with live support chat' },
    ],
  },
  expert: {
    eyebrow: '',
    title: 'Learn from an expert – Think like an academic',
    intro:
      'Every study plan is led personally by a U.S.-trained PhD who currently lectures at RMIT University, bringing 8+ years of hands-on exam coaching.',
    points: [
      {
        title: 'U.S. doctoral credentials',
        text: 'A world-class academic foundation that explains the "why" of economics instead of rote formulas.',
      },
      {
        title: 'Personalized, exam-format focused',
        text: 'An individual plan for every student, practicing the exact question structures of international exams.',
      },
      {
        title: 'Supporting students & parents',
        text: 'Close progress tracking and regular feedback so parents always know how their child is doing.',
      },
    ],
    experienceValue: '8+',
    experienceLabel: 'years of exam coaching',
    credentialTitle: 'PhD US',
    credentialText: 'RMIT University Lecturer',
    cta: 'Talk to our expert',
    imageAlt: 'Student following an instructor teaching online on a computer screen',
  },
  programs: {
    eyebrow: '',
    title: '5 core training programs',
    description:
      'From AP Economics and the SAT to 1:1 mentoring — every program follows international standards and each student’s own goals.',
    detailCta: 'View details',
    carousel: {
      label: 'Course list',
      prev: 'Previous course',
      next: 'Next course',
    },
    courseSite: {
      label: 'Course Website',
      title: 'Your whole learning journey on one online course site',
      text: 'Browse the course catalog, watch video lessons and review with bilingual materials on a secure LMS — anytime, anywhere.',
      cta: 'Visit the course website',
      newTab: '(opens in a new tab)',
    },
    modal: {
      overviewLabel: 'Course overview',
      tuitionLabel: 'Tuition',
      tuitionValue: 'Contact us for pricing',
      consultCta: 'Get advice on this course',
      close: 'Close',
    },
  },
  platform: {
    eyebrow: 'LMS Platform',
    title: 'A modern learning experience, flexible anytime',
    description:
      'Our secure learning management system (LMS) lets students study on their own schedule, practice systematically and get support whenever they need it.',
    features: [
      {
        id: 'anytime',
        title: 'Flexible 24/7 learning',
        text: 'Access video lectures anytime, anywhere on our secure LMS.',
      },
      {
        id: 'bilingual',
        title: 'Bilingual materials & tests',
        text: 'Review with English–Vietnamese materials and take interactive online tests.',
      },
      {
        id: 'chat',
        title: 'Live study support chat',
        text: 'Ask questions while you learn and get quick, thoughtful answers.',
      },
    ],
    mockup: {
      course: 'AP Macroeconomics',
      lesson: 'Unit 3 · Aggregate Demand & Supply',
      progressLabel: 'Progress',
      chatMessage: 'Could you explain why the AD curve shifts?',
    },
    imageAlt: 'Student wearing headphones focused on studying with a laptop',
  },
  journey: {
    eyebrow: '',
    title: 'A 4-step roadmap to top scores',
    description: 'A clear, measurable process at every stage — from your first diagnostic test to exam day.',
    steps: [
      {
        title: 'Skills assessment',
        text: 'Take a diagnostic test to identify strengths, knowledge gaps and your target score.',
      },
      {
        title: 'Personalized study plan',
        text: 'Get a plan built around your level, schedule and exam dates.',
      },
      {
        title: 'Real exam practice',
        text: 'Build problem-solving skills in the exact international format, with detailed feedback every session.',
      },
      {
        title: 'Reach your goal',
        text: 'Aim for a 4–5 and earn early college credit to strengthen your application.',
      },
    ],
    stepLabel: 'Step',
  },
  testimonials: {
    eyebrow: 'Student & Parent Stories',
    title: 'Journeys to breakthrough scores',
    description:
      'Students, parents and undergraduates share how dedicated guidance shaped their exam preparation.',
    sampleNotice: 'Sample content — to be replaced with real student feedback',
    communityAlt: 'Group of international school students learning with laptops and tablets',
    prev: 'Previous story',
    next: 'Next story',
    items: [
      {
        name: 'Student A.',
        role: 'Grade 12 · International school',
        score: 'AP Macroeconomics 5/5',
        quote:
          'I used to dread the free-response section of AP Macro. Every model was explained down to its core, and detailed feedback after each session made me truly confident on exam day.',
      },
      {
        name: 'Parent B.',
        role: 'Parent of a Grade 11 student · Gifted high school',
        score: 'AP Microeconomics 5/5',
        quote:
          'What reassured me most was the regular progress update after every stage. The plan was clear, my child became a more independent learner, and we always knew what to improve.',
      },
      {
        name: 'Student C.',
        role: 'First-year undergraduate · International university',
        score: 'Micro/Macro Economics · High Distinction',
        quote:
          'Introductory economics in English was my biggest worry. The bilingual materials and 1:1 sessions helped me master the concepts and pass with a top grade.',
      },
    ],
  },
  consult: {
    eyebrow: '',
    title: 'Start your AP & SAT success plan with an expert today',
    message:
      'Leave your details and the LearnAP team will reach out with a study plan tailored to your goals — completely free.',
    benefits: ['1:1 advice from an expert', 'A plan built around your target score', 'Bilingual Vietnamese – English support'],
    form: {
      title: 'Request a consultation',
      nameLabel: 'Full name',
      namePlaceholder: 'Jane Nguyen',
      nameRequired: 'Please enter your full name',
      phoneLabel: 'Phone / Zalo',
      phonePlaceholder: 'e.g. +84 901 234 567',
      phoneRequired: 'Please enter your phone or Zalo number',
      phoneInvalid: 'Please enter a valid phone number',
      roleLabel: 'I am a',
      roleRequired: 'Please select your role',
      roles: [
        { value: 'parent', label: 'Parent' },
        { value: 'highschool', label: 'High school student' },
        { value: 'university', label: 'University student' },
      ],
      courseLabel: 'Course of interest',
      coursePlaceholder: 'Select a course',
      courseRequired: 'Please select a course',
      submit: 'Get my free study plan',
      successTitle: 'You’re all set!',
      successText: 'Thank you. A LearnAP expert will contact you shortly.',
      demoNote: 'Demo version: your details have not been sent.',
      again: 'Submit another request',
    },
    backgroundAlt: 'A spacious, light-filled library',
  },
  footer: {
    about:
      'AP Microeconomics, AP Macroeconomics and SAT preparation with a U.S.-trained PhD — RMIT University lecturer.',
    coursesHeading: 'Courses',
    exploreHeading: 'Explore',
    contactHeading: 'Contact',
    hotlineLabel: 'Hotline / Zalo',
    facebookLabel: 'Facebook',
    terms: 'Academic terms',
    privacy: 'Privacy policy',
    copyright: '© 2026 LearnAP Economics. All rights reserved.',
  },
  floating: {
    open: 'Open support chat',
    close: 'Close support chat',
    title: 'Need help?',
    text: 'Message us now and the LearnAP team will get back to you soon.',
    messenger: 'Message on Messenger',
    zalo: 'Chat on Zalo',
    call: 'Call hotline',
    backToTop: 'Back to top',
  },
}

export default en
