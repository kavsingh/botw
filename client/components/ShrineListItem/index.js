import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '../ListItem'
import { ShrineQuestIcon } from '../icons/botw'

export default function ShrineListItem({
  id,
  name,
  location,
  type,
  complete,
  onClick,
  style,
}) {
  return (
    <ListItem
      icon={ShrineQuestIcon}
      title={name || id}
      description={`${type} - ${location}`}
      active={!complete}
      onClick={onClick}
      style={style}
      activeHoverMessage="Click to complete"
      inactiveHoverMessage="Click to uncomplete"
    />
  )
}

ShrineListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  location: PropTypes.string,
  complete: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.shape({ margin: PropTypes.string }),
}

ShrineListItem.defaultProps = {
  id: '',
  name: '',
  type: '',
  location: '',
  complete: false,
  onClick: () => {},
  style: {},
}
