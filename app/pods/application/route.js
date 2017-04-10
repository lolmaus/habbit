// ----- Ember modules -----
import Route from 'ember-route'
import service from 'ember-service/inject'

// ----- Ember addons -----
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'



export default Route.extend(ApplicationRouteMixin, {

  // ----- Services -----
  session: service(),

  // ----- Actions -----
  actions: {
    authenticateSession () {
      this.get('session').authenticate('authenticator:torii', 'github-oauth2')
    },

    invalidateSession () {
      this.get('session').invalidate()
    },
  }
})
