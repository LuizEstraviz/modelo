import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';


// Handlers for reducers
const handlers = {
  'SET_QUERY': (state, { query }) => Object.assign({}, state, { query }),

  'REC_DATA': (state, { data }) => Object.assign({}, 
        state,
        {
          [typeof(data) === 'string' ? 'error' : 'table']: {data}
        },
        {
          [state.transition ? 'tempdata' : 'data']: data,
          isError: state.transition ? state.isError : typeof(data) === 'string'
        }
        ),

  'REQ_DATA': (state, action) => {
    var newState = Object.assign({}, 
      state, 
      {
        tempdata: '',
        transition: !state.transition,
      });
    console.log(newState);
    return newState},

  'AS_CSV': (state, { ascsv }) => Object.assign({}, state, { ascsv }),

  'TRANS_END': (state, action) => {
    return Object.assign({}, state, 
      { transition: false,
        data: state.tempdata ? state.tempdata : state.data,
        isError: typeof(state.tempdata ? state.tempdata : state.data) === 'string'
    })}
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
});
