import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '../ListItem'
import { ShrineQuestIcon } from '../icons/botw'

export default function ShrineQuestListItem({
  name,
  location,
  complete,
  onClick,
  style,
}) {
  return (
    <ListItem
      icon={ShrineQuestIcon}
      title={name}
      description={location}
      active={!complete}
      onClick={onClick}
      style={style}
      activeHoverMessage="Click to complete"
      inactiveHoverMessage="Click to uncomplete"
    />
  )
}

ShrineQuestListItem.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  complete: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.shape({ margin: PropTypes.string }),
}

ShrineQuestListItem.defaultProps = {
  name: '',
  location: '',
  complete: false,
  onClick: () => {},
  style: {},
}
