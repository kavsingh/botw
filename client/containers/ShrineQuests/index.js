import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getComplete, getIncomplete } from '../../util/stats'
import { selectors } from '../../state/shrineQuest'
import { actions as statsActions } from '../../state/stats'
import CompletionStats from '../../components/CompletionStats'
import ShrineQuestList from '../../components/ShrineQuestList'
import Anim from '../../layouts/Anim'
import Panels from '../../layouts/Panels'
import Panel from '../../layouts/Panel'

export class ShrineQuests extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = { groupBy: 'complete' }
    this.handleShrineQuestClick = this.handleShrineQuestClick.bind(this)
  }

  handleShrineQuestClick({ id, complete }) {
    this.props.saveShrineQuestCompletion(id, !complete)
  }

  render() {
    const { shrineQuests } = this.props
    const { groupBy } = this.state
    const completeQuests = getComplete(shrineQuests)
    const quests = groupBy === 'complete'
      ? getIncomplete(shrineQuests).concat(completeQuests)
      : shrineQuests

    return (
      <Anim>
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
              onItemClick={this.handleShrineQuestClick}
            />
          </Panel>
        </Panels>
      </Anim>
    )
  }
}

ShrineQuests.propTypes = {
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
  saveShrineQuestCompletion: statsActions.saveShrineQuestCompletion,
}

export default connect(mapStateToProps, mapActionsToProps)(ShrineQuests)
