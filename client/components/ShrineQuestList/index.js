import React from 'react'
import PropTypes from 'prop-types'
import ScrollFadeList from '../ScrollFadeList'
import ShrineQuest from '../ShrineQuest'

const renderItem = (onClick, item) => (
  <ShrineQuest
    {...item}
    onClick={() => onClick(item)}
    key={item.id}
    style={{ margin: '0 0 0.6em 0' }}
  />
)

export default function ShrineQuestList({ shrineQuests, onItemClick }) {
  const itemRenderer = renderItem.bind(null, onItemClick)

  return (
    <ScrollFadeList
      listItems={shrineQuests}
      itemRenderer={itemRenderer}
    />
  )
}

ShrineQuestList.propTypes = {
  shrineQuests: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onItemClick: PropTypes.func,
}

ShrineQuestList.defaultProps = {
  onItemClick: () => Promise.resolve(),
}
