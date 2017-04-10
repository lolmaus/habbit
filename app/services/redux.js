// ----- Ember modules -----
import Service from 'ember-service';
import on from 'ember-evented/on';
import {assert} from 'ember-metal/utils';

// ----- Ember addons -----
import computed from 'ember-macro-helpers/computed';

// ----- Third-party modules -----
const {createStore} = window.Redux;

// ----- Own modules -----
import reducers       from 'habbit/redux/reducers';
import actionCreators from 'habbit/redux/action-creators';




export default Service.extend({

  // ----- Required properties -----
  actionCreators,
  reducers,



  // ----- Computed properties -----
  store: computed(function () {
    const reducers = this.get('reducers');
    assert(
      'reducers not provided. You must extend the `redux` service with a `reducers` property, typically a result of `Redux.combineReducers({...})`.',
      reducers
    );

    return createStore(
      reducers,

      // https://github.com/zalmoxisus/redux-devtools-extension
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }),

  state: computed('store', function (store) {
    return store.getState();
  }),



  // ----- Methods -----
  dispatch (type, ...args) {
    const actionCreators = this.get('actionCreators');
    assert(
      'actionCreators not provided. You must extend the `redux` service with an `actionCreators` property — a hash of your action creators.',
      actionCreators
    );

    const actionCreator = actionCreators[type];

    const action =
      actionCreator
      ? actionCreator(type, ...args)
      : {type}

    this
      .get('store')
      .dispatch(action)
  },



  // ----- Events and observers -----
  subscribeToReduxStore: on('init', function () {
    this
      .get('store')
      .subscribe(() => {
        this.notifyPropertyChange('state')
      });
  }),

  bindDispatchMethod: on('init', function () {
    this.dispatch = this.dispatch.bind(this)
  }),
});
