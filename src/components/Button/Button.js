import propTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Button ({
  to,
  href,
  primary = false,
  outline = false,
  small = false,
  large = false,
  text = false,
  disabled = false,
  rounded = false,
  children,
  onClick,
  className,
  leftIcon,
  rightIcon,
  ...passProps
}) {
  let Comp = 'button'
  const props = { onClick, ...passProps }
  //Remove event listeners when button is disabled
  if (disabled) {
    Object.keys(props).forEach(key => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key]
      }
    })
  }
  if (to) {
    props.to = to
    Comp = Link
  } else if (href) {
    props.href = href
    Comp = 'a'
  }

  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    text,
    disabled,
    rounded,
    [className]: className
  })

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
    </Comp>
  )
}
Button.propTypes = {
  to: propTypes.string,
  href: propTypes.string,
  primary: propTypes.bool,
  outline: propTypes.bool,
  small: propTypes.bool,
  large: propTypes.bool,
  text: propTypes.bool,
  disabled: propTypes.bool,
  rounded: propTypes.bool,
  children: propTypes.node.isRequired,
  onClick: propTypes.func,
  className: propTypes.string,
  leftIcon: propTypes.node,
  rightIcon: propTypes.node
}

export default Button
