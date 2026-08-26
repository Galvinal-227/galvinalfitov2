export const PORTFOLIO_DATA = {
  name: 'Galvin',
  fullName: 'Galvin Alfito',
  role: 'Frontend Developer & UI/UX Designer',
  location: 'Indonesia',
  email: 'galvinalfito@gmail.com',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Framer Motion', 'Figma'],
  projects: [
    { name: 'Portfolio Website', description: 'Personal portfolio with React and Tailwind', tech: ['React', 'Tailwind'] },
    { name: 'Web Top-Up', description: 'Digital voucher top-up platform', tech: ['React', 'Node.js', 'MySQL'] },
  ],
  education: 'SMKN 2 Nganjuk, PPLG',
  interests: ['Frontend', 'UI/UX', 'Motion Design', 'Game Dev'],
};

export const AVAILABLE_MODELS = [
  { id: 'gpt-5.6-luna', name: 'GPT-5.6 Luna', description: 'Recommended' },
  { id: 'claude-3-haiku', name: 'Claude Haiku', description: 'Quick' },
  { id: 'gemini-3.1-flash-lite', name: 'Gemini Flash Lite', description: 'Fast' },
];

export const QUICK_PROMPTS = [
  'What does Galvin build?',
  'His projects',
  'Tech stack',
  'About Galvin',
];

export function getSystemPrompt(): string {
  return `Kamu adalah Alf AI, asisten yang ramah dan santai untuk website portfolio ${PORTFOLIO_DATA.name}.

Kamu bisa ngobrol tentang apa saja seperti teman, tapi juga punya informasi tentang ${PORTFOLIO_DATA.name} kalau ditanya.

ATURAN BAHASA:
- Selalu ikuti bahasa yang dipakai user.
- User pakai Bahasa Indonesia → jawab Bahasa Indonesia.
- User pakai English → jawab English.

ATURAN SIKAP:
- Santai, natural, tidak kaku.
- Jawab pertanyaan umum dengan normal (makan, cuaca, film, musik, dll).
- Kalau user tanya tentang ${PORTFOLIO_DATA.name}, baru ceritakan datanya.
- Jangan memaksakan topik ${PORTFOLIO_DATA.name} di setiap jawaban.

DATA ${PORTFOLIO_DATA.name.toUpperCase()} (hanya dipakai kalau relevan):
Nama: ${PORTFOLIO_DATA.fullName}
Role: ${PORTFOLIO_DATA.role}
Lokasi: ${PORTFOLIO_DATA.location}
Email: ${PORTFOLIO_DATA.email}
Skill: ${PORTFOLIO_DATA.skills.join(', ')}
Proyek: ${PORTFOLIO_DATA.projects.map((p) => p.name).join(', ')}
Pendidikan: ${PORTFOLIO_DATA.education}
Minat: ${PORTFOLIO_DATA.interests.join(', ')}`;
}
