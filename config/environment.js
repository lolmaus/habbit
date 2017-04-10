/* eslint-env node */
const _ = require('lodash')

const envVars = _.pick(process.env, [
  'HB_DEPLOY_TARGET',
  'HB_GITHUB_CLIENT_ID',
  'HB_GATEKEEPER_URL',
])



module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'habbit',
    podModulePrefix: 'habbit/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    envVars,

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    torii: {
      providers: {
        'github-oauth2': {
          apiKey:      envVars.HB_GITHUB_CLIENT_ID,
          // redirectUri: overridden in provider's `redirectUri` method
          scope:       'public_repo',
        }
      }
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
