import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getComplete, getIncomplete } from '../../util/quest'
import CompletionStats from '../../components/CompletionStats'
import ShrineQuestList from '../../components/ShrineQuestList'
import ContentPage from '../../layouts/ContentPage'
import background from './oman-au.jpg'

export default class ShrineQuests extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      shrineQuests: [],
      group: true,
    }
    this.handleShrineQuestClick = this.handleShrineQuestClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchData()
      .then(({ shrineQuests }) => this.setState(() => ({ shrineQuests })))
  }

  handleShrineQuestClick({ id, complete }) {
    this.props.saveShrineQuestComplete({ id, complete: !complete })
      .then(({ shrineQuests }) => this.setState(() => ({ shrineQuests })))
  }

  render() {
    const { shrineQuests, group } = this.state
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
  saveShrineQuestComplete: PropTypes.func.isRequired,
}
