export const LOCALES = ['bg', 'en'] as const
export type Locale = (typeof LOCALES)[number]

const BG_TO_EN_EXACT: Record<string, string> = {
  '/': '/en/',
  '/za-nas': '/en/about',
  '/deynosti': '/en/activities',
  '/galeriya': '/en/gallery',
  '/novini': '/en/news',
  '/kontakti': '/en/contact',
  '/za-pacienta': '/en/patient-info',
}

const EN_TO_BG_EXACT: Record<string, string> = Object.fromEntries(
  Object.entries(BG_TO_EN_EXACT).map(([bg, en]) => [en, bg])
)

export function getAlternateUrl(pathname: string, targetLocale: Locale): string {
  if (targetLocale === 'en') {
    if (BG_TO_EN_EXACT[pathname]) return BG_TO_EN_EXACT[pathname]
    if (pathname.startsWith('/novini/')) return '/en/news/' + pathname.slice('/novini/'.length)
    if (pathname.startsWith('/za-pacienta/')) return '/en/patient-info/' + pathname.slice('/za-pacienta/'.length)
    return '/en/'
  } else {
    if (EN_TO_BG_EXACT[pathname]) return EN_TO_BG_EXACT[pathname]
    if (pathname.startsWith('/en/news/')) return '/novini/' + pathname.slice('/en/news/'.length)
    if (pathname.startsWith('/en/patient-info/')) return '/za-pacienta/' + pathname.slice('/en/patient-info/'.length)
    return '/'
  }
}

export function getCurrentLocale(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'bg'
}

type NavItem = { label: string; url: string; subItems?: { label: string; url: string }[] }

export function getNavItems(lang: Locale): NavItem[] {
  if (lang === 'en') {
    return [
      { label: 'Home', url: '/en/' },
      { label: 'About Us', url: '/en/about' },
      {
        label: 'Patient Info',
        url: '/en/patient-info',
        subItems: [
          { label: 'General Information', url: '/en/patient-info/obshta-informatsiya' },
          { label: 'Clinical Pathways', url: '/en/patient-info/klinichni-pateki' },
          { label: 'Social Insurance (NOI)', url: '/en/patient-info/noi' },
          { label: 'Private Admission', url: '/en/patient-info/platen-priem' },
          { label: 'Military Personnel', url: '/en/patient-info/voenen-kontingent' },
        ],
      },
      { label: 'Services', url: '/en/activities' },
      { label: 'Gallery', url: '/en/gallery' },
      { label: 'News', url: '/en/news' },
      { label: 'Contact', url: '/en/contact' },
    ]
  }
  return [
    { label: 'Начало', url: '/' },
    { label: 'За нас', url: '/za-nas' },
    {
      label: 'За пациента',
      url: '/za-pacienta',
      subItems: [
        { label: 'Обща информация', url: '/za-pacienta/obshta-informatsiya' },
        { label: 'Клинични пътеки', url: '/za-pacienta/klinichni-pateki' },
        { label: 'НОИ', url: '/za-pacienta/noi' },
        { label: 'Платен прием', url: '/za-pacienta/platen-priem' },
        { label: 'Военен контингент', url: '/za-pacienta/voenen-kontingent' },
      ],
    },
    { label: 'Дейности', url: '/deynosti' },
    { label: 'Галерия', url: '/galeriya' },
    { label: 'Новини', url: '/novini' },
    { label: 'Контакти', url: '/kontakti' },
  ]
}

export const ui = {
  bg: {
    ctaButton: 'Свържете се с нас',
    allNews: 'Всички новини',
    learnMore: 'Научете повече за нас',
    ourSpecialties: 'Нашите специалности',
    ourSpecialtiesSub: 'Комплексно лечение и рехабилитация в шест основни направления.',
    latestNews: 'Последни новини',
    footerNav: 'Навигация',
    footerPatient: 'За пациента',
    footerContact: 'Контакти',
    footerRights: 'Всички права запазени.',
    footerTagline: 'Болница за продължително лечение и рехабилитация',
    footerContactUs: 'Свържете се с нас →',
    openMenu: 'Отвори меню',
    closeMenu: 'Затвори меню',
    close: 'Затвори',
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Имейл',
    workingHours: 'Работно време',
    sendInquiry: 'Изпратете запитване',
    sendInquiryDesc: 'Попълнете формата и ще се свържем с вас в рамките на работния ден.',
    information: 'Информация',
    openInMaps: 'Отвори в Google Maps',
    backToNews: 'Всички новини',
    patientInfoTitle: 'Начини на прием',
    patientInfoCTAHeading: 'Не намерихте отговора?',
    patientInfoCTABody: 'Свържете се с нас директно — ще се радваме да ви помогнем с избора на правилния начин на прием.',
    sendRequest: 'Изпратете запитване',
    patientInfoNav: 'За пациента',
  },
  en: {
    ctaButton: 'Contact Us',
    allNews: 'All News',
    learnMore: 'Learn More About Us',
    ourSpecialties: 'Our Services',
    ourSpecialtiesSub: 'Comprehensive treatment and rehabilitation across six main areas.',
    latestNews: 'Latest News',
    footerNav: 'Navigation',
    footerPatient: 'Patient Info',
    footerContact: 'Contact',
    footerRights: 'All rights reserved.',
    footerTagline: 'Hospital for Long-term Treatment and Rehabilitation',
    footerContactUs: 'Contact Us →',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    close: 'Close',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    workingHours: 'Working Hours',
    sendInquiry: 'Send an Enquiry',
    sendInquiryDesc: 'Fill in the form and we will get back to you within the working day.',
    information: 'Information',
    openInMaps: 'Open in Google Maps',
    backToNews: 'All News',
    patientInfoTitle: 'Admission Types',
    patientInfoCTAHeading: "Didn't find your answer?",
    patientInfoCTABody: 'Contact us directly — we will be happy to help you choose the right admission type.',
    sendRequest: 'Send Enquiry',
    patientInfoNav: 'Patient Info',
  },
} as const
