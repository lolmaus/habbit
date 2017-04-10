const {combineReducers} = window.Redux;

import _route_gist from 'habbit/redux/_route_gist/reducer';

import gist    from 'habbit/redux/gist/reducer';
import session from 'habbit/redux/session/reducer';
import tasks   from 'habbit/redux/tasks/reducer';



export default combineReducers({
  _route_gist,
  gist,
  session,
  tasks,
});
