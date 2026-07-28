import { TranslationKey } from 'lib/translations'

export type Stat = { target: number; suffix: string; labelKey: TranslationKey }

export const stats: Stat[] = [
  { target: 2, suffix: '+', labelKey: 'home_stat_years' },
  { target: 7, suffix: '+', labelKey: 'home_stat_projects' },
  { target: 5, suffix: '+', labelKey: 'home_stat_users' },
  { target: 2, suffix: '+', labelKey: 'home_stat_mentored' }
]
