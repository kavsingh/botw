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
import Panels from '../../layouts/Panels'
import Panel from '../../layouts/Panel'
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
        <Panels orientation="portrait">
          <Panel type="fit">
            <CompletionStats
              totalCount={shrineQuests.length}
              completedCount={completeQuests.length}
            />
          </Panel>
          <Panel type="stretch">
            <ShrineQuestList
              shrineQuests={quests}
              group={group}
              onItemClick={this.handleShrineQuestClick}
            />
          </Panel>
        </Panels>
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
