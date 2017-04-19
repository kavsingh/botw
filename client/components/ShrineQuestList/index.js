import React from 'react'
import PropTypes from 'prop-types'
import { negate, filter } from 'lodash/fp'
import ScrollFadeList from '../ScrollFadeList'
import CompletionStats from '../CompletionStats'
import ShrineQuest from '../ShrineQuest'
import background from './oman-au.jpg'

const isComplete = quest => !!quest.complete
const getComplete = filter(isComplete)
const getIncomplete = filter(negate(isComplete))

const renderItem = (onClick, item) => (
  <ShrineQuest
    {...item}
    onClick={() => onClick(item)}
    key={item.id}
    style={{ margin: '0 0 0.6em 0' }}
  />
)

export default function ShrineQuestList({ shrineQuests, group, onItemClick }) {
  const itemRenderer = renderItem.bind(null, onItemClick)
  const completeQuests = getComplete(shrineQuests)
  const listItems = group
    ? getIncomplete(shrineQuests).concat(completeQuests)
    : shrineQuests

  return (
    <div className="root">
      <div className="content">
        <div className="statsContainer">
          <CompletionStats
            totalCount={shrineQuests.length}
            completedCount={completeQuests.length}
          />
        </div>
        <div className="listContainer">
          <ScrollFadeList
            listItems={listItems}
            itemRenderer={itemRenderer}
            listStyle={{ padding: '1em' }}
          />
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
        .statsContainer {
          flex: 0 0 auto;
        }
        .listContainer {
          flex: 1 0;
          overflow: hidden;
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

ShrineQuestList.propTypes = {
  shrineQuests: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onItemClick: PropTypes.func,
  group: PropTypes.bool,
}

ShrineQuestList.defaultProps = {
  onItemClick: () => Promise.resolve(),
  group: true,
}
