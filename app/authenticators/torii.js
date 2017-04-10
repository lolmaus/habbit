// ----- Ember modules -----
import service from 'ember-service/inject'

// ----- Ember addons -----
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii'
import fetch              from 'ember-network/fetch'

// ----- Third-party modules -----
import RSVP from 'rsvp'

// ----- Own modules -----
import {fetchGithubAuthJson} from 'habbit/utils/fetch-github'



export default ToriiAuthenticator.extend({

  // ----- Services -----
  config: service(),
  redux:  service(),
  torii:  service(),



  // ----- Overridden methods -----
  authenticate (provider, options) {
    this._assertToriiIsPresent()

    const gatekeeperUrl = this.get('config.gatekeeperUrl')
    const redux         = this.get('redux')

    redux.dispatch('RDX_SESSION_START_AUTHENTICATION')

    return this
      .get('torii')

      .open(provider, options || {})

      .then(response => {
        const url = `${gatekeeperUrl}/authenticate/${response.authorizationCode}`
        return fetch(url).then(result => result.json())
      })

      .then(data => {
        return data.error
          ? RSVP.reject(data)
          : data
      })

      .then(data => this._fetchUser(data))

      .then(data => {
        this._authenticateWithProvider(provider, data)
        redux.dispatch('RDX_SESSION_AUTHENTICATE', data)
        return data
      })

      .catch(data => this._reportErrorAndInvalidate(data))
  },



  invalidate (...args) {
    return this
      ._super(...args)

      .then(data => {
        this.get('redux').dispatch('RDX_SESSION_INVALIDATE')
        return data
      })
  },



  restore (...args) {
    return this
      ._super(...args)

      .then(data => this._fetchUser(data))

      .then(data => {
        this.get('redux').dispatch('RDX_SESSION_AUTHENTICATE', data)
        return data
      })

      .catch(data => this._reportErrorAndInvalidate(data))
  },



  // ----- Custom methods -----
  _fetchUser (data) {
      return fetchGithubAuthJson('user', data.token)
        .then(user => ({
          ...data,
          user
        }))
  },

  _reportErrorAndInvalidate (data) {
    console.error('GitHub authentication failed:', data)
    redux.dispatch('RDX_SESSION_INVALIDATE', data)
  }
})
