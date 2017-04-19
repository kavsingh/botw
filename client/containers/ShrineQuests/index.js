import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getComplete, getIncomplete } from '../../util/quest'
import { selectors } from '../../state/shrineQuest'
import { actions as statsActions } from '../../state/stats'
import { initFetch } from '../../state/actions'
import CompletionStats from '../../components/CompletionStats'
import ShrineQuestList from '../../components/ShrineQuestList'
import ContentPage from '../../layouts/ContentPage'
import background from './oman-au.jpg'

export class ShrineQuests extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = { group: false }
    this.handleShrineQuestClick = this.handleShrineQuestClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchData()
  }

  handleShrineQuestClick({ id, complete }) {
    this.props.saveShrineQuestCompletion(id, !complete)
  }

  render() {
    const { shrineQuests } = this.props
    const { group } = this.state
    const completeQuests = getComplete(shrineQuests)
    const quests = group
      ? getIncomplete(shrineQuests).concat(completeQuests)
      : shrineQuests

    return (
      <ContentPage
        backgroundStyle={{
          backgroundImage: `url('${background}')`,
          backgroundPosition: '60% center',
        }}
      >
        <div className="content">
          <div className="statsContainer">
            <CompletionStats
              totalCount={shrineQuests.length}
              completedCount={completeQuests.length}
            />
          </div>
          <div className="listContainer">
            <ShrineQuestList
              shrineQuests={quests}
              group={group}
              onItemClick={this.handleShrineQuestClick}
            />
          </div>
        </div>
        <style jsx>{`
          .content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .statsContainer {
            flex: 0 0 auto;
          }
          .listContainer {
            flex: 1 0;
            overflow: hidden;
          }
        `}</style>
      </ContentPage>
    )
  }
}

ShrineQuests.propTypes = {
  fetchData: PropTypes.func.isRequired,
  saveShrineQuestCompletion: PropTypes.func.isRequired,
  shrineQuests: PropTypes.arrayOf(PropTypes.shape({})),
}

ShrineQuests.defaultProps = {
  shrineQuests: [],
}

const mapStateToProps = state => ({
  shrineQuests: selectors.getShrineQuestsWithCompletions(state),
})

const mapActionsToProps = {
  fetchData: initFetch,
  saveShrineQuestCompletion: statsActions.saveShrineQuestCompletion,
}

export default connect(mapStateToProps, mapActionsToProps)(ShrineQuests)
