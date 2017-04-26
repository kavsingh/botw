import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getComplete, getIncomplete } from '../../util/stats'
import { selectors } from '../../state/shrine'
import { actions as statsActions } from '../../state/stats'
import CompletionStats from '../../components/CompletionStats'
import ShrineList from '../../components/ShrineList'
import Panels from '../../layouts/Panels'
import Panel from '../../layouts/Panel'

export class Shrines extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = { groupBy: 'complete' }
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
      <Panels orientation="portrait">
        <Panel type="fit">
          <CompletionStats
            totalCount={shrines.length}
            completedCount={completeShrines.length}
          />
        </Panel>
        <Panel type="stretch">
          <ShrineList
            shrines={listShrines}
            onItemClick={this.handleShrineClick}
          />
        </Panel>
      </Panels>
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
