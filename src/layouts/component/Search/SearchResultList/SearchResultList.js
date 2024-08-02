import React from 'react'
import PropTypes from 'prop-types'
import AccountItem from '~/components/AccountItem' // Đảm bảo đường dẫn chính xác

const SearchResultList = React.memo(({ searchResult }) => (
  <div>
    {searchResult.map(value => (
      <AccountItem key={value.id} data={value} />
    ))}
  </div>
))

SearchResultList.propTypes = {
  searchResult: PropTypes.array.isRequired
}

export default SearchResultList
