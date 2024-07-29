import classNames from 'classnames/bind'
import styles from './AccountItem.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles)

function AccountItem () {
  return (
    <div className={cx('wrapper')}>
      <img className={cx('avatar')} src='https://gcs.tripi.vn/public-tripi/tripi-feed/img/474014bom/anh-gai-xinh-cute-de-thuong-hot-girl-2.jpg' alt='' />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
            <span>Nguyễn Văn A</span>
            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle}/>
            </h4>
        <span className={cx('username')}>nguyenvana</span>

      </div>
    </div>
  )
}

export default AccountItem
