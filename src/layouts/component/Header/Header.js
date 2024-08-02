import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import images from '~/assets/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
  faEarthAsia,
  faKeyboard,
  faCircleQuestion,
  faUser,
  faCoins,
  faGear,
  faSignOut
} from '@fortawesome/free-solid-svg-icons'

import Tippy from '@tippyjs/react'

import 'tippy.js/dist/tippy.css'
import config from '~/config'
import Button from '~/components/Button'
import Menu from '~/components/Popper/Menu'
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/icons'
import Image from '~/components/Images'
import Search from '../Search'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        { type: 'language', code: 'en', title: 'English' },
        { type: 'language', code: 'vi', title: 'Tiếng Việt' }
      ]
    }
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and Help',
    to: '/feedback'
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts'
  }
]
function Header () {
  const currenUser = true

  const handleMenuChange = menuItem => {
    switch (menuItem.type) {
      case 'language':
        break
      default:
    }
  }

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@hoa'
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin'
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings'
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: '/logout',
      separate: true
    }
  ]

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <Link to={config.routes.home} className={cx('logo-link')}>
            <img src={images.logo} alt='' />
          </Link>
        </div>
        <Search />
        <div className={cx('actions')}>
          {currenUser ? (
            <>
              <Tippy delay={200} content='Upload video' placement='bottom'>
                <button className={cx('action-btn')}>
                  <UploadIcon />
                </button>
              </Tippy>
              <Tippy delay={200} content='Message' placement='bottom'>
                <button className={cx('action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy delay={200} content='Inbox' placement='bottom'>
                <button className={cx('action-btn')}>
                  <InboxIcon />
                  <span className={cx('badge')}>12</span>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              {/* <Button rounded className={cx('custom-login')}>
            Log in
          </Button> */}
              <Button primary>Log in</Button>
            </>
          )}
          <Menu
            items={currenUser ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currenUser ? (
              <Image
                src='https://gcs.tripi.vn/public-tripi/tripi-feed/img/474014bom/anh-gai-xinh-cute-de-thuong-hot-girl-2.jpg'
                className={cx('user-avatar')}
                alt='Nguyen Van A'
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  )
}
export default Header
