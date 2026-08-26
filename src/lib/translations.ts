import { useLanguage } from 'context/language'

const translations = {
  intro_i_am: { en: 'I Am', id: 'Saya' },
  nav_home: { en: 'HOME', id: 'BERANDA' },
  nav_about: { en: 'ABOUT', id: 'TENTANG' },
  nav_summary: { en: 'SUMMARY', id: 'RINGKASAN' },
  menu_read_more: { en: 'Read more here', id: 'Baca lebih lanjut di sini' },
  menu_close: { en: 'CLOSE', id: 'TUTUP' },
  menu_take_a_look: { en: 'take a look!', id: 'lihat yuk!' },

  footer_made_with: { en: 'Made by galvin alfito', id: 'Dibuat oleh galvin alfito' },
  footer_title_home: { en: "What's next?", id: 'Selanjutnya apa?' },
  footer_title_about: { en: 'Still curious?', id: 'Masih penasaran?' },
  footer_title_summary: { en: 'Want to read again?', id: 'Mau baca lagi?' },

  home_functionality: { en: 'IQ', id: 'IQ' },
  home_aesthetics: { en: 'Calmness', id: 'Ketenangan' },
  home_satisfaction: { en: 'Victory', id: 'Kemenangan' },
  home_scroll: { en: 'scroll', id: 'gulir' },
  home_down: { en: 'down', id: 'ke bawah' },
  home_creative_dev_lead: { en: 'Creative Developer Based In', id: 'Pengembang Kreatif Berbasis Di' },
  home_lets_introduce: { en: 'Let Me Introduce', id: 'Izinkan Saya Memperkenalkan' },
  home_my_self: { en: 'My self', id: 'Diri Saya' },
  home_as_developer: { en: 'As Developer.', id: 'Sebagai Developer.' },
  home_specializing_lead: { en: 'Specializing In Web ', id: 'Spesialisasi Dalam Pengembangan Web ' },
  home_specializing_trail: { en: 'Development', id: 'Development' },
  home_mobile_intro_1: { en: 'The Work Speaks For Itself', id: 'Karya Berbicara Dengan Sendirinya' },
  home_mobile_intro_2: { en: 'Creative Developer Based In Indonesia', id: 'Pengembang Kreatif Berbasis Di Indonesia' },
  home_mobile_intro_3: { en: 'Specializing In Web Fullstack Development', id: 'Spesialisasi Dalam Pengembangan Web Fullstack' },
  home_welcome_interactive: { en: 'Welcome To My Interactive Portfolio', id: 'Selamat Datang Di Portofolio Interaktif Saya' },
  home_building_app_art: { en: 'BUILDING APP IS AN ART', id: 'MEMBANGUN APLIKASI ADALAH SENI' },
  home_everything_canvas: { en: 'EVERY THING IS CANVAS', id: 'SEGALANYA ADALAH KANVAS' },
  home_selected_expertise: { en: 'Selected Expertise', id: 'Keahlian Pilihan' },
  home_lets_collaborate: { en: "Let's Collaborate", id: 'Ayo Berkolaborasi' },
  keep_learning: { en: 'Keep Learning', id: 'Terus Belajar' },

  home_stat_years: { en: 'Years Experience', id: 'Tahun Pengalaman' },
  home_stat_projects: { en: 'Projects Delivered', id: 'Proyek Terkirim' },
  home_stat_users: { en: 'Concurrent Users Served', id: 'Pengguna Bersamaan Dilayani' },
  home_stat_mentored: { en: 'Students Mentored', id: 'Siswa Dibimbing' },

  home_selected_work: { en: 'Selected Work', id: 'Karya Pilihan' },
  home_selected_work_lead: {
    en: 'A few products I designed, built, and shipped end-to-end.',
    id: 'Beberapa produk yang saya rancang, bangun, dan luncurkan dari awal sampai akhir.'
  },
  home_selected_work_more: { en: '13+ other projects completed', id: '13+ proyek lain telah selesai' },

  home_tech_stack_title: { en: 'Tech I Work With', id: 'Teknologi Yang Saya Pakai' },

  home_contact_say_hi: { en: 'Say Hi', id: 'Sapa Saya' },
  home_contact_lets_talk: { en: "Let's Talk", id: 'Ayo Bicara' },

  home_waste_your_time: { en: 'The Work', id: 'Karya' },
home_and_the_world: { en: 'Speaks', id: 'Berbicara' },
home_will_waste_you: { en: 'For Itself', id: 'Dengan Sendirinya' },

  about_me_marquee: { en: 'ABOUT ME - ', id: 'TENTANG SAYA - ' },
  about_dont_be_shy: { en: 'Dont Be Shy,', id: 'Jangan Malu-Malu,' },
  about_make_first_move: { en: 'Make The First Move.', id: 'Buat Langkah Pertama.' },
  about_experiences: { en: 'Experiences', id: 'Pengalaman' },
  about_projects: { en: 'My Projects', id: 'Proyek Saya' },
  about_selected_projects: { en: 'Selected Projects', id: 'Proyek Pilihan' },
  about_selected_activities: { en: 'Selected Activities', id: 'Aktivitas Pilihan' },
  about_story_title: { en: 'How I Work', id: 'Cara Saya Bekerja' },

  summary_status_available: { en: 'Open to full-time & freelance work', id: 'Terbuka untuk kerja full-time & freelance' },
  summary_languages: { en: 'English (Fluent) . Indonesian (Native)', id: 'Inggris (Fasih) . Indonesia (Native)' },

  summary_title: { en: 'Summary', id: 'Ringkasan' },
  summary_role_line: {
    en: '- Full-Stack Developer At INCIT (Singapore) | Code Reviewer At Dicoding Indonesia -',
    id: '- Full-Stack Developer di INCIT (Singapura) | Code Reviewer di Dicoding Indonesia -'
  },
  summary_download_cv: { en: 'Download CV', id: 'Unduh CV' },
  summary_download_cv_title: { en: 'download cv', id: 'unduh cv' },
  summary_education: { en: 'Education', id: 'Pendidikan' },
  summary_experiences: { en: 'Experiences', id: 'Pengalaman' },
  summary_selected_projects: { en: 'Selected Projects', id: 'Proyek Pilihan' },
  summary_selected_activities: { en: 'Selected Activities', id: 'Aktivitas Pilihan' },
  summary_selected_certificate: { en: 'Selected Certificate', id: 'Sertifikat Pilihan' },
  summary_tech: { en: 'Tech', id: 'Teknologi' },
  summary_contact: { en: 'Contact', id: 'Kontak' },
  summary_degree: { en: 'Informatics Engineering (Bachelor)', id: 'Teknik Informatika (Sarjana)' },
  summary_keep_learning: { en: 'And Keep Learning...', id: 'Dan Terus Belajar...' },
  summary_know_me: { en: 'damn you realy want to know me', id: 'wah, niat banget ya mau kenal aku' },

  alert_try_new_project: { en: 'Try my new project 📝', id: 'Coba proyek baru saya 📝' }
} as const

export type TranslationKey = keyof typeof translations

export function useTranslation() {
  const { lang, setLang } = useLanguage()
  const t = (key: TranslationKey): string => translations[key][lang] ?? translations[key].en
  return { t, lang, setLang }
}
