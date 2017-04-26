import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function Nav({ location, links, defaultPath }) {
  const { pathname } = location

  return (
    <div className="root">
      {links.map(({ href, label }) => {
        const isCurrent = href === pathname
          || (pathname.length <= 1 && href === defaultPath)

        return (
          <div className={`link ${isCurrent ? 'current' : ''}`} key={href}>
            <Link to={href}>{label}</Link>
          </div>
        )
      })}
      <style jsx>{`
        .root {
          display: flex;
          align-items: center;
          height: 3em;
          padding: 0 1.6em;
        }

        .link {
          margin-right: 0.8em;
        }

        .link :global(a) {
          color: inherit;
          font-size: 1.2em;
          font-weight: inherit;
          text-decoration: none;
        }

        .current {
          color: white;
        }
      `}</style>
    </div>
  )
}

Nav.propTypes = {
  location: PropTypes.shape(),
  defaultPath: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    label: PropTypes.string,
  })),
}

Nav.defaultProps = {
  location: {},
  defaultPath: '',
  links: [],
}
