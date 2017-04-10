// ----- Ember modules -----
import Route from 'ember-route'



// ----- Constants -----
const lsKey = 'habbit:gist-id';



export default Route.extend({

  // ----- Overridden methods -----
  beforeModel () {
    this._ensureGist()
  },



  // ----- Custom methods -----
  _ensureGist () {
    // Looking for gist id in Redux store
    const redux = this.get('redux')
    let   gistId  = redux.get('state.gist.index')

    if (gistId) return

    // Looking for gist id in LS
    gistId = window.localStorage.getItem(lsKey)

    if (gistId) {
      redux.dispatch('RDX_GIST_RESTORE', gistId)
      return
    }

    // No gist found, redirecting to gist route
    this.transitionTo('gist')
  }
})
