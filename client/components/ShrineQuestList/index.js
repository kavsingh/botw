import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { negate, filter } from 'lodash/fp'
import ShrineQuest from '../ShrineQuest'
import background from './oman-au.jpg'

const isComplete = quest => !!quest.complete
const getComplete = filter(isComplete)
const getIncomplete = filter(negate(isComplete))

const generateGradientMask = (container, list) => {
  const { scrollTop, offsetHeight: containerHeight } = container
  const { offsetHeight: listHeight } = list
  const scrollMultTop = scrollTop / (containerHeight * 0.01)
  const scrollMultBottom = scrollTop / ((listHeight - containerHeight) * 0.01)

  const gradient = `linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) ${Math.min(scrollMultTop, 14)}%,
    rgba(0, 0, 0, 1) ${Math.max(scrollMultBottom, 86)}%,
    rgba(0, 0, 0, 0)
  )`

  return {
    maskImage: gradient,
    WebkitMaskImage: gradient,
  }
}

export default class ShrineQuestList extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = { scrollCSS: {} }
    this.renderItem = this.renderItem.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    if (!this.listContainer) return
    this.listContainer.addEventListener('scroll', this.handleScroll, false)
    setTimeout(this.handleScroll, 0)
  }

  componentWillReceiveProps({ shrineQuests }) {
    if (shrineQuests !== this.props.shrineQuests) this.handleScroll()
  }

  componentWillUnmount() {
    if (!this.listContainer) return
    this.listContainer.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    if (!(this.listContainer && this.list)) return

    this.setState(() => ({
      scrollCSS: generateGradientMask(this.listContainer, this.list),
    }))
  }

  renderItem(props) {
    return (
      <ShrineQuest
        {...props}
        onClick={() => this.props.onItemClick(props)}
        key={props.id}
        style={{ margin: '0 0 0.6em 0' }}
      />
    )
  }

  render() {
    const { shrineQuests, group } = this.props
    const { scrollCSS } = this.state
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
          <div
            className="listContainer"
            style={scrollCSS}
            ref={c => { this.listContainer = c }}
          >
            <div className="list" ref={c => { this.list = c }}>
              {list.map(this.renderItem)}
            </div>
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
            overflow-x: visible;
            overflow-y: scroll;
          }
          .list {
            padding: 1em;
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
