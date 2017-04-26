import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Anim extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = { show: false }
  }

  componentDidMount() {
    setTimeout(() => this.setState(() => ({ show: true })), 10)
  }

  render() {
    const { show } = this.state
    const { children } = this.props

    return (
      <div className={`anim ${show ? 'show' : 'hide'}`}>
        {children}
        <style jsx>{`
          .anim {
            width: 100%;
            height: 100%;
            transition:
              transform 0.4s ease-out,
              opacity 0.4s ease-out;
          }

          .show {
            transform: translateY(0);
            opacity: 1;
          }

          .hide {
            transform: translateY(10%);
            opacity: 0;
          }
        `}</style>
      </div>
    )
  }
}

Anim.propTypes = {
  children: PropTypes.node.isRequired,
}
