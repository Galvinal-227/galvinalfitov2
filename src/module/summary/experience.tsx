import { AiOutlineLink } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import React from 'react'

type Props = React.HTMLProps<HTMLLIElement> & { title: string; link: string; sentences?: any[]; notAllowed?: boolean }

export default function Experience({ title, link, sentences, className, notAllowed, ...props }: Props) {
  return (
    <li className={`text-3xl ${className}`} {...props}>
      <div>
        <p className="font-poppins text-xl text-white lg:text-3xl">
          {title}

          {!notAllowed && link && (
            <Link to={link} target="_blank" className="mx-3 hover:opacity-50 active:opacity-50">
              <AiOutlineLink className="inline text-xl text-white" />
            </Link>
          )}

        </p>

        <div className="font-poppins text-base text-secondary opacity-70 lg:text-xl">
          {sentences?.map((word, i) => (
            <React.Fragment key={i}>
              {word}
              {i === sentences.length - 1 ? null : (
                <span className="mx-4 inline-block h-2 w-2 rounded-full bg-white"></span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </li>
  )
}
