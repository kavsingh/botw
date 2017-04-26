import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getComplete, getIncomplete } from '../../util/stats'
import { selectors } from '../../state/shrine'
import { actions as statsActions } from '../../state/stats'
import CompletionStats from '../../components/CompletionStats'
import ShrineQuestList from '../../components/ShrineQuestList'
import ContentPage from '../../layouts/ContentPage'
import Panels from '../../layouts/Panels'
import Panel from '../../layouts/Panel'
import background from './oman-au.jpg'

export class Shrines extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = { groupBy: null }
    this.handleShrineClick = this.handleShrineClick.bind(this)
  }

  handleShrineClick({ id, complete }) {
    this.props.saveShrineCompletion(id, !complete)
  }

  render() {
    const { shrines } = this.props
    const { groupBy } = this.state
    const completeShrines = getComplete(shrines)
    const listShrines = groupBy === 'complete'
      ? getIncomplete(shrines).concat(completeShrines)
      : shrines

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
              totalCount={shrines.length}
              completedCount={completeShrines.length}
            />
          </Panel>
          <Panel type="stretch">
            <ShrineQuestList
              shrines={listShrines}
              onItemClick={this.handleShrineClick}
            />
          </Panel>
        </Panels>
      </ContentPage>
    )
  }
}

Shrines.propTypes = {
  saveShrineCompletion: PropTypes.func.isRequired,
  shrines: PropTypes.arrayOf(PropTypes.shape({})),
}

Shrines.defaultProps = {
  shrines: [],
}

const mapStateToProps = state => ({
  shrines: selectors.getShrinesWithCompletions(state),
})

const mapActionsToProps = {
  saveShrineCompletion: statsActions.saveShrineCompletion,
}

export default connect(mapStateToProps, mapActionsToProps)(Shrines)
