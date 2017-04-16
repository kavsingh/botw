import React from 'react'
import PropTypes from 'prop-types'
import { negate, filter } from 'lodash/fp'
import ShrineQuest from '../ShrineQuest'
import background from './oman-au.jpg'

const isComplete = quest => !!quest.complete
const getComplete = filter(isComplete)
const getIncomplete = filter(negate(isComplete))

const renderQuest = (onClick, props) => (
  <ShrineQuest
    {...props}
    onClick={() => onClick(props)}
    key={props.id}
    style={{ margin: '0 0 0.6em 0' }}
  />
)

const gradientMaskBottom =
  `linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0)
  )`

const gradientMaskTop =
  `linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1)
  )`

const gradientMaskBoth =
  `linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0)
  )`

export default function ShrineQuestList({
  shrineQuests,
  onItemClick,
  group,
}) {
  const renderer = renderQuest.bind(null, onItemClick)
  const completeQuests = getComplete(shrineQuests)
  const list = group
    ? getIncomplete(shrineQuests).concat(completeQuests)
    : shrineQuests

  return (
    <div className="root">
      <div className="content">
        <div className="stats">
          <div className="remaining">
            {`${shrineQuests.length - completeQuests.length} remaining`}
          </div>
          <div className="counts">
            <span className="completed">{
              completeQuests.length
            }</span> / <span className="total">{
              shrineQuests.length
            }</span> complete
          </div>
        </div>
        <div className="listContainer scrollTop">
          {list.map(renderer)}
        </div>
      </div>
      <div className="background" />
      <style jsx>{`
        .root {
          width: 100%;
          height: 100%;
        }
        .content,
        .background {
          position: absolute;
        }
        .content {
          display: flex;
          flex-direction: column;
          padding: 1em;
          z-index: 2;
          top: 6vmin;
          right: 6vmin;
          bottom: 6vmin;
          left: 6vmin;
          background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.16);
        }
        .stats {
          display: flex;
          align-items: center;
          flex: 0 0 auto;
          padding: 1em 1.6em;
        }
        .remaining {
          color: white;
          font-weight: 600;
          font-size: 1.2em;
          margin-right: 0.8em;
        }
        .counts .completed {
          color: white;
        }
        .listContainer {
          flex: 1 0;
          padding: 1em;
          overflow-x: visible;
          overflow-y: scroll;
        }
        .listContainer.scrollTop {
          mask-image: ${gradientMaskBottom};
          -webkit-mask-image: ${gradientMaskBottom};
        }
        .listContainer.scrollMiddle {
          mask-image: ${gradientMaskBoth};
          -webkit-mask-image: ${gradientMaskBoth};
        }
        .listContainer.scrollBottom {
          mask-image: ${gradientMaskTop};
          -webkit-mask-image: ${gradientMaskTop};
        }
        .background {
          background: url('${background}') no-repeat 60% center;
          background-size: cover;
          filter: blur(3px);
          top: -3px;
          right: -3px;
          bottom: -3px;
          left: -3px;
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
  group: true,
}
