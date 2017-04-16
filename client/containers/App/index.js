import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ShrineQuestList from '../../components/ShrineQuestList'
import { calamity, calamityBold } from '../../fonts'

export default class App extends PureComponent {
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

    return (
      <div className="root">
        <ShrineQuestList
          shrineQuests={shrineQuests}
          group={group}
          onItemClick={this.handleShrineQuestClick}
        />
        <style jsx>{`
          @font-face {
            font-family: 'Calamity';
            src: url('${calamity}') format('woff2');
            font-weight: 400;
            font-style: normal;
          }
          @font-face {
            font-family: 'Calamity';
            src: url('${calamityBold}') format('woff2');
            font-weight: 600;
            font-style: normal;
          }
          .root {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            font-family: 'Calamity', sans-serif;
            line-height: 1.3;
            color: rgb(209, 212, 192);
            background-color: black;
          }
        `}</style>
      </div>
    )
  }
}

App.propTypes = {
  fetchData: PropTypes.func.isRequired,
  saveShrineQuestComplete: PropTypes.func.isRequired,
}
