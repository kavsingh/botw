import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getComplete, getIncomplete } from '../../util/stats'
import { selectors } from '../../state/shrine'
import { actions as statsActions } from '../../state/stats'
import CompletionStats from '../../components/CompletionStats'
import ShrineList from '../../components/ShrineList'
import Anim from '../../layouts/Anim'
import Panels from '../../layouts/Panels'
import Panel from '../../layouts/Panel'

const sort = fn => arr => arr.sort(fn)

const sortRegion = ({ region: a }, { region: b }) => {
  if (a < b) return 1
  if (a > b) return -1
  return 0
}

const innerSort = sort(sortRegion)

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
      ? innerSort(getIncomplete(shrines))
        .concat(innerSort(completeShrines))
      : innerSort(shrines)

    return (
      <Anim>
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
      </Anim>
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
