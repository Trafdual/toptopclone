import propTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Popper.module.scss'

const cx = classNames.bind(styles)

function wrapper ({ children, className }) {
  return <div className={cx('wrapper', className)}>{children}</div>
}

wrapper.propTypes = {
  children: propTypes.node.isRequired,
  className: propTypes.string
}

export default wrapper
