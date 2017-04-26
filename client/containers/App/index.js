import React, { PureComponent } from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { initFetch } from '../../state/actions'
import { calamity, calamityBold } from '../../fonts'
import ContentPage from '../../layouts/ContentPage'
import Nav from '../../components/Nav'
import Panels from '../../layouts/Panels'
import Panel from '../../layouts/Panel'
import ConnectedShrines from '../Shrines'
import ConnectedShrineQuests from '../ShrineQuests'
import background from './oman-au.jpg'

export class App extends PureComponent {
  componentDidMount() {
    this.props.fetchData()
  }

  /* eslint-disable class-methods-use-this */
  render() {
    return (
      <div className="root">
        <ContentPage
          backgroundStyle={{
            backgroundImage: `url('${background}')`,
            backgroundPosition: '60% center',
          }}
        >
          <Panels>
            <Panel type="fit">
              <Nav
                location={this.props.location}
                links={[
                  { href: '/shrines', label: 'Shrines' },
                  { href: '/shrinequests', label: 'Shrine Quests' },
                ]}
              />
            </Panel>
            <Panel type="stretch">
              <Route exact path="/" component={ConnectedShrineQuests} />
              <Route path="/shrines" component={ConnectedShrines} />
              <Route path="/shrinequests" component={ConnectedShrineQuests} />
            </Panel>
          </Panels>
        </ContentPage>
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

          :global(html) {
            box-sizing: border-box;
          }

          :global(html) :global(*),
          :global(html) :global(*::before),
          :global(html) :global(*::after) {
            box-sizing: inherit;
          }

          :global(html),
          :global(body) {
            margin: 0;
            padding: 0;
          }

          :global(#app-mount) {
            width: 100vw;
            height: 100vh;
          }

          .root {
            width: 100%;
            height: 100%;
            font-family: 'Calamity', sans-serif;
            font-size: 14px;
            line-height: 1.3;
            color: rgb(209, 212, 192);
            background-color: black;
            position: relative;
          }

          .nav {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            display: flex;
            z-index: 2;
          }
        `}</style>
      </div>
    )
  }
  /* eslint-enable class-methods-use-this */
}

App.propTypes = {
  fetchData: PropTypes.func,
  location: PropTypes.shape({}),
}

App.defaultProps = {
  fetchData: () => {},
  location: {},
}

export default connect(
  // Ensure ui updates by passing in location prop.
  ({ router: { location } }) => ({ location }),
  { fetchData: initFetch },
)(App)
