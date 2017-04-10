export function initialize (appInstance) {
  appInstance.inject('controller', 'redux', 'service:redux');
  appInstance.inject('route',      'redux', 'service:redux');
}

export default {
  name: 'redux',
  initialize
};
