import { useEffect, useState, useRef } from 'react'
import HeadlessTippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'

import * as searchServices from '~/services/searchService'
import { SearchIcon } from '~/components/icons'
import { Wrapper as ProperWrapper } from '~/components/Popper'
import { useDebounce } from '~/hooks'
import styles from './Search.module.scss'
import SearchResultList from './SearchResultList'

const cx = classNames.bind(styles)

function Search () {
  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setsearchResult] = useState([])
  const [showResults, setshowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(searchValue, 500)
  const inputRef = useRef()

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setsearchResult([])
      return
    }
    setLoading(true)

    const fetchAPI = async () => {
      setLoading(true)
      const result = await searchServices.search(debouncedValue)
      setsearchResult(result)
      setLoading(false)
    }
    fetchAPI()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  const handelClear = () => {
    setSearchValue('')
    setsearchResult([])
    inputRef.current.focus()
  }

  const handelHideResults = () => {
    setshowResults(false)
  }
  const handelChange = e => {
    const searchValue = e.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResults && searchResult.length > 0}
        render={attrs => (
          <div className={cx('search-result')} tabIndex='-1' {...attrs}>
            <ProperWrapper>
              <h4 className={cx('search-title')}>Account</h4>
              <SearchResultList searchResult={searchResult} />
            </ProperWrapper>
          </div>
        )}
        onClickOutside={handelHideResults}
      >
        <div className={cx('search')}>
          <input
            type='text'
            ref={inputRef}
            value={searchValue}
            placeholder='Search account and video'
            spellCheck={false}
            onChange={handelChange}
            onFocus={() => setshowResults(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} onClick={handelClear} />
            </button>
          )}

          {loading && (
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
          )}

          <button className={cx('search-btn')} onMouseDown={handleSubmit}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  )
}

export default Search
