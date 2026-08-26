export const PORTFOLIO_DATA = {
  name: 'Galvin',
  fullName: 'Galvin Alfito',
  role: 'Frontend Developer & UI/UX Designer',
  location: 'Indonesia',
  email: 'galvin@example.com',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Framer Motion', 'Figma'],
  projects: [
    { name: 'Portfolio Website', description: 'Personal portfolio with React and Tailwind', tech: ['React', 'Tailwind'] },
    { name: 'Game Shooter', description: 'Web-based 3D shooter game', tech: ['Three.js', 'JavaScript'] },
    { name: 'Web Top-Up', description: 'Digital voucher top-up platform', tech: ['React', 'Node.js', 'MySQL'] },
  ],
  education: 'SMKN 2 Nganjuk, PPLG',
  interests: ['Frontend', 'UI/UX', 'Motion Design', 'Game Dev'],
};

export const AVAILABLE_MODELS = [
  { id: 'gpt-4', name: 'GPT-4', description: 'Most capable' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5', description: 'Fast & balanced' },
  { id: 'claude-3-haiku', name: 'Claude Haiku', description: 'Quick & lightweight' },
  { id: 'claude-3-sonnet', name: 'Claude Sonnet', description: 'Intelligent & thorough' },
];

export const QUICK_PROMPTS = [
  'What does Galvin build?',
  'His projects',
  'Tech stack',
  'About Galvin',
];

export function getSystemPrompt(): string {
  return `You are Alf AI, a friendly and knowledgeable assistant integrated into ${PORTFOLIO_DATA.name}'s portfolio website.

Your primary purpose is to help visitors learn about ${PORTFOLIO_DATA.name}, his skills, projects, experience, and background. Use the provided data below to answer those questions accurately.

However, you are also a capable AI assistant. If the visitor asks about something unrelated to the portfolio (like general knowledge, time, coding help, etc.), answer naturally and helpfully, just like ChatGPT or Claude would.

Important:
- Never invent information about ${PORTFOLIO_DATA.name}. If you don't know something specific about him, say so.
- Be concise, warm, and adjust length to the question.
- You can respond in Indonesian or English, following the visitor's language.

Here is the portfolio data:
Name: ${PORTFOLIO_DATA.fullName}
Role: ${PORTFOLIO_DATA.role}
Location: ${PORTFOLIO_DATA.location}
Email: ${PORTFOLIO_DATA.email}

Skills:
${PORTFOLIO_DATA.skills.map((s) => `- ${s}`).join('\n')}

Projects:
${PORTFOLIO_DATA.projects.map((p) => `- ${p.name}: ${p.description} (${p.tech.join(', ')})`).join('\n')}

Education: ${PORTFOLIO_DATA.education}

Interests:
${PORTFOLIO_DATA.interests.map((i) => `- ${i}`).join('\n')}`;
}