import React from 'react'
import PropTypes from 'prop-types'
import ScrollFadeList from '../ScrollFadeList'
import ShrineListItem from '../ShrineListItem'

const renderItem = (onClick, item) => (
  <ShrineListItem
    {...item}
    onClick={() => onClick(item)}
    key={item.id}
    style={{ margin: '0 0 0.6em 0' }}
  />
)

export default function ShrineList({ shrines, onItemClick }) {
  const itemRenderer = renderItem.bind(null, onItemClick)

  return (
    <ScrollFadeList
      listItems={shrines}
      itemRenderer={itemRenderer}
    />
  )
}

ShrineList.propTypes = {
  shrines: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onItemClick: PropTypes.func,
}

ShrineList.defaultProps = {
  onItemClick: () => Promise.resolve(),
}
