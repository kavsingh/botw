import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const calcFadePoints = (container, list) => {
  const { scrollTop, offsetHeight: containerHeight } = container
  const { offsetHeight: listHeight } = list
  const scrollMultTop = scrollTop / (containerHeight * 0.01)
  const scrollMultBottom = scrollTop / ((listHeight - containerHeight) * 0.01)

  return {
    top: `${Math.min(scrollMultTop, 14)}%`,
    bottom: `${Math.max(scrollMultBottom, 86)}%`,
  }
}

const generateGradientMask = ({ top, bottom }) => {
  const gradient = `linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) ${top},
    rgba(0, 0, 0, 1) ${bottom},
    rgba(0, 0, 0, 0)
  )`

  return { maskImage: gradient, WebkitMaskImage: gradient }
}

export default class ScrollFadeList extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = { scrollCSS: {} }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    if (!this.listContainerNode) return
    this.listContainerNode.addEventListener('scroll', this.handleScroll, false)
    requestAnimationFrame(this.handleScroll)
  }

  componentWillReceiveProps({ listItems }) {
    if (listItems !== this.props.listItems) {
      requestAnimationFrame(this.handleScroll)
    }
  }

  componentWillUnmount() {
    if (!this.listContainerNode) return
    this.listContainerNode.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    if (!(this.listContainerNode && this.listNode)) return

    this.setState(() => ({
      scrollCSS: generateGradientMask(
        this.props.calcFadePoints(this.listContainerNode, this.listNode)),
    }))
  }

  render() {
    const { listItems, itemRenderer, listStyle, listClassName } = this.props
    const { scrollCSS } = this.state

    return (
      <div
        className="root"
        style={scrollCSS}
        ref={c => { this.listContainerNode = c }}
      >
        <div
          className={`list ${listClassName}`}
          style={listStyle}
          ref={c => { this.listNode = c }}
        >
          {listItems.map((item, index) => itemRenderer(item, index))}
        </div>
        <style jsx>{`
          .root {
            width: 100%;
            height: 100%;
            overflow-x: visible;
            overflow-y: scroll;
          }
        `}</style>
      </div>
    )
  }
}

ScrollFadeList.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  itemRenderer: PropTypes.func.isRequired,
  listStyle: PropTypes.shape({}),
  listClassName: PropTypes.string,
  calcFadePoints: PropTypes.func,
}

ScrollFadeList.defaultProps = {
  calcFadePoints,
  listStyle: { padding: '1em' },
  listClassName: '',
}
