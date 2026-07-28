import WithCursorElement from 'components/common/with-cursor-element'
import Close from 'components/cursor-hover/close'
import Magnet from 'components/effect/magnet'
import { StateContext } from 'context/state'
import { useTranslation } from 'lib/translations'
import { useContext } from 'react'
import { BLUR_HOVER_LINK } from '.'
import CursorProvider from 'context/cursor'
import Cursor from 'components/common/cursor'

const menuCursor = {
  in: {
    key: Close.key,
    type: Close.type,
    element: <Close />
  },
  out: null
}

export default function MenuClose() {
  const { setState } = useContext(StateContext)
  const { t } = useTranslation()

  const onClose = () => {
    if (setState) {
      setState((prev) => ({ ...prev, menuShow: false }))
    }
  }
  return (
    <CursorProvider>
      <Cursor />
      <WithCursorElement state={{ element: menuCursor.in as any }} fallbackState={{ element: menuCursor.out }}>
        <Magnet className={`absolute right-4 top-5 md:right-10 lg:right-14 ${BLUR_HOVER_LINK}`}>
          <button tabIndex={0} onClick={onClose}>
            {t('menu_close')}
          </button>
        </Magnet>
      </WithCursorElement>
    </CursorProvider>
  )
}
