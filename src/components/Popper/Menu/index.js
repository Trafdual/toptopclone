import propTypes from 'prop-types'
import { useState } from 'react'
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import { Wrapper as ProperWrapper } from '~/components/Popper'

import MenuItems from './MenuItems'
import Header from './Header'

const cx = classNames.bind(styles)

const defaultFn = () => {}
function Menu ({
  children,
  items = [],
  hideOnClick = false,
  onChange = defaultFn
}) {
  const [history, setHistory] = useState([{ data: items }])
  const current = history[history.length - 1]
  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children
      return (
        <MenuItems
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory(prev => [...prev, item.children])
            } else {
              onChange(item)
            }
          }}
        />
      )
    })
  }

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      offset={[12, 8]}
      hideOnClick={hideOnClick}
      placement='bottom-end'
      render={attrs => (
        <div className={cx('menu-list')} tabIndex='-1' {...attrs}>
          <ProperWrapper className={cx('menu-poper')}>
            {history.length > 1 && (
              <Header
                title='Languages'
                onBack={() =>
                  setHistory(prev => prev.slice(0, prev.length - 1))
                }
              />
            )}
            <div className={cx('menu-body')}>{renderItems()}</div>
          </ProperWrapper>
        </div>
      )}
      onHide={() => setHistory(prev => prev.slice(0, 1))}
    >
      {children}
    </Tippy>
  )
}

Menu.propTypes = {
  children: propTypes.node.isRequired,
  items: propTypes.array,
  hideOnClick: propTypes.bool,
  onChange: propTypes.func
}

export default Menu
