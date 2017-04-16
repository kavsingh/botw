import React from 'react'
import PropTypes from 'prop-types'
import ShrineQuest from '../ShrineQuest'
import background from './oman-au.jpg'

const negate = fn => x => !fn(x)
const isComplete = quest => !!quest.complete

const renderQuest = (onClick, props) => (
  <ShrineQuest
    {...props}
    onClick={() => onClick(props)}
    key={props.id}
    style={{ margin: '0 0 0.6em 0' }}
  />
)

export default function ShrineQuestList({
  shrineQuests,
  onItemClick,
  group,
}) {
  const renderer = renderQuest.bind(null, onItemClick)
  const list = group
    ? shrineQuests.filter(isComplete)
      .concat(shrineQuests.filter(negate(isComplete)))
    : shrineQuests

  return (
    <div className="root">
      <div className="listContainer">
        {list.map(renderer)}
      </div>
      <div className="background" />
      <style jsx>{`
        .root {
          width: 100%;
          height: 100%;
        }
        .listContainer,
        .background {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .listContainer {
          padding: 1em;
          overflow-y: scroll;
          z-index: 2;
        }
        .background {
          background: url('${background}') no-repeat 60% center;
          background-size: cover;
          filter: blur(3px);
        }
      `}</style>
    </div>
  )
}

renderQuest.propTypes = {
  id: PropTypes.string.isRequired,
}

ShrineQuestList.propTypes = {
  shrineQuests: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onItemClick: PropTypes.func,
  group: PropTypes.bool,
}

ShrineQuestList.defaultProps = {
  onItemClick: () => Promise.resolve(),
  group: false,
}
