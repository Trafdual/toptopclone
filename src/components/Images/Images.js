import propTypes from 'prop-types'
import { useState, forwardRef } from 'react'
import images from '~/assets/images'
import styles from './Image.module.scss'
import classNames from 'classnames/bind'
const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallback: customFallback = images.noImage,
      ...props
    },
    ref
  ) => {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
      setFallback(customFallback)
    }
    // eslint-disable-next-line jsx-a11y/alt-text
    return (
      <img
        className={classNames(className, styles.wrapper)}
        ref={ref}
        src={fallback || src}
        alt={alt}
        {...props}
        onError={handleError}
      />
    )
  }
)

Image.propTypes = {
  src: propTypes.string,
  alt: propTypes.string,
  className: propTypes.string,
  fallback: propTypes.string
}

export default Image
