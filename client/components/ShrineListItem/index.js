import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash/fp'
import ListItem from '../ListItem'
import { ShrineQuestIcon } from '../icons/botw'

const createTitleRenderer = ({ name, shrineQuests, id }) => () => (
  <div>
    {name || startCase(id)}
    {shrineQuests.length
      ? (
        <span className="quests">{shrineQuests.join(', ')}</span>
      )
      : null
    }
    <style jsx>{`
      .quests {
        font-size: 0.8em;
        margin-left: 0.8em;
        opacity: 0.8;
      }
    `}</style>
  </div>
)

const createDescriptionRenderer = ({ type, region, location }) => () => (
  <div>
    {region
      ? <div className="region">{region}</div>
      : null
    }
    {type
      ? <div className="type">{startCase(type)}</div>
      : null
    }
    {location}
    <style jsx>{`
      .region,
      .type {
        display: block;
        font-weight: 600;
      }
    `}</style>
  </div>
)

export default function ShrineListItem({
  id,
  name,
  location,
  type,
  region,
  complete,
  onClick,
  shrineQuests,
  style,
}) {
  const titleRenderer = createTitleRenderer({ name, shrineQuests, id })
  const descriptionRenderer =
    createDescriptionRenderer({ type, region, location })

  return (
    <ListItem
      icon={ShrineQuestIcon}
      title={titleRenderer}
      description={descriptionRenderer}
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
  region: PropTypes.string,
  shrineQuests: PropTypes.arrayOf(PropTypes.string),
  complete: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.shape({ margin: PropTypes.string }),
}

ShrineListItem.defaultProps = {
  id: '',
  name: '',
  type: '',
  location: '',
  region: '',
  shrineQuests: [],
  complete: false,
  onClick: () => {},
  style: {},
}
