import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import React from 'react'
import { AiOutlineLink } from 'react-icons/ai'
import { Link } from 'react-router-dom'

type TimelineItem = {
  monogram: string
  color: string
  title: string
  role: string
  range: string
  link?: string
}

const items: TimelineItem[] = [
  {
    monogram: 'IN',
    color: 'rgba(158,107,184,0.996078)',
    title: 'INCIT',
    role: 'Fullstack Engineer',
    range: 'Dec 2024 - Present',
    link: 'https://incit.org/'
  },
  { monogram: 'SP', color: '#0091F8', title: 'PT. Sehati Prima Makmur', role: 'Senior Frontend Developer', range: 'Mar 2022 - Dec 2024' },
  { monogram: 'PG', color: '#F1592A', title: 'Panggilin', role: 'Frontend Developer', range: 'Jun 2021 - Mar 2022' }
]

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
}

function parseMonthYear(str: string): Date | null {
  const match = str.trim().match(/^(\w{3})\w*\s+(\d{4})$/)
  if (!match) return null
  const month = MONTHS[match[1].toLowerCase()]
  if (month === undefined) return null
  return new Date(Number(match[2]), month, 1)
}

function computeTenure(range: string): string {
  const [startStr, endStrRaw] = range.split(' - ').map((s) => s.trim())
  const start = parseMonthYear(startStr)
  const end = endStrRaw?.toLowerCase() === 'present' ? new Date() : parseMonthYear(endStrRaw)
  if (!start || !end) return ''

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  if (months < 1) months = 1
  const years = Math.floor(months / 12)
  const remMonths = months % 12

  if (years && remMonths) return `${years}yr ${remMonths}mo`
  if (years) return `${years}yr`
  return `${remMonths}mo`
}

export default function TimelineExperience() {
  return (
    <div className="relative pl-16">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: easeDefault as any }}
        style={{ transformOrigin: 'top' }}
        className="absolute bottom-0 left-[15px] top-2 w-[2px] bg-white/25"
      />
      {items.map((item, i) => (
        <div key={item.title} className="relative mb-12 last:mb-0">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.4, ease: easeDefault as any, delay: i * 0.15 }}
            style={{ backgroundColor: item.color }}
            className="absolute -left-16 top-0 flex h-8 w-8 items-center justify-center rounded-full font-pixel text-xs font-bold text-white"
          >
            {item.monogram}
          </motion.div>
          <div className="flex flex-wrap items-baseline gap-3">
            <p className="font-pixel text-xl text-white lg:text-3xl">
              {item.title}
              {item.link ? (
                <Link to={item.link} target="_blank" className="ml-3 inline hover:opacity-50 active:opacity-50">
                  <AiOutlineLink className="inline text-xl text-white" />
                </Link>
              ) : (
                <AiOutlineLink className="ml-3 inline cursor-not-allowed text-xl text-white" />
              )}
            </p>
            <span className="rounded-full border border-solid border-white/30 px-3 py-0.5 font-pixel text-xs text-white/70">
              {computeTenure(item.range)}
            </span>
          </div>
          <div className="mt-1 font-pixel text-base text-secondary opacity-70 lg:text-xl">
            {item.role}
            <span className="mx-4 inline-block h-2 w-2 rounded-full bg-white"></span>
            {item.range}
          </div>
        </div>
      ))}
    </div>
  )
}
