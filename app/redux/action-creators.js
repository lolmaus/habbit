import _route_gist from 'habbit/redux/_route_gist/action-creators';

import gist    from 'habbit/redux/gist/action-creators';
import session from 'habbit/redux/session/action-creators';
import tasks   from 'habbit/redux/tasks/action-creators';



export default {
  ..._route_gist,
  ...gist,
  ...session,
  ...tasks,
}
