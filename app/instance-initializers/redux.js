export function initialize (appInstance) {
  appInstance.inject('controller', 'redux', 'service:redux');
}

export default {
  name: 'redux',
  initialize
};
