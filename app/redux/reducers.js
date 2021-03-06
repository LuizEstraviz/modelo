import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { scripts } from '../sqlscripts/scripts';

// Handlers for reducers
const handlers = {
  'SET_QUERY': (state, { query }) => Object.assign({}, state, { query }),

  'REC_DATA': (state, { data }) => Object.assign({}, 
        state,
        {
          loading: false,
          [state.transition === false || (data.geo && data.geo.length > 0) ? 'data' : 'tempdata']: data,
          isError: state.transition ? state.isError : typeof(data) === 'string',
          activeTab: (data.geo ? data.geo.features.length : 0) > 0 ? 2 : 1,
        }
        ),

  'REQ_DATA': (state, action) => {
    var newState = Object.assign({}, 
      state, 
      {
        loading: true,
        tempdata: '',
        transition: state.activeTab === 1 ? !state.transition : false,
      });
    return newState},

  'AS_CSV': (state, { ascsv }) => Object.assign({}, state, { ascsv }),

  'TRANS_END': (state, action) => 
    Object.assign({}, state, 
      { 
        transition: false,
        data: state.tempdata ? state.tempdata : state.data,
        isError: (state.tempdata ? state.tempdata : state.data) && typeof(state.tempdata ? state.tempdata : state.data) === 'string',
    }),

    'SEL_SCRIPT': (state, { selScript }) => Object.assign({}, state, { selScript, activeTab: 3, query: scripts[selScript].script.join('\n')}),

    'SEL_TAB': (state, { activeTab }) => Object.assign({}, state, { activeTab }),
};


// Reducer with handlers mapping
const reducers = function(state={}, action) {
  return handlers.hasOwnProperty(action.type) 
    ? handlers[action.type](state, action)
    : state
}

// Use thunkMiddleware in store to handle function return
var createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export var store = createStoreWithMiddleware(reducers, 
// initial state
{
  query: '',
  data: '',
  tempdata: '',
  isError: false,
  ascsv: false,
  transition: true,
  selScript: '',
  activeTab: 1,
  loading: false,
});
