import {createStore, combineReducers} from 'redux';
// Note that using .push() in this way isn't the
// best approach. It's just the easiest to show
// for this example. We'll explain why in the next section.

// The Reducer Function
var userReducer = function(state = [], action) {
  if (action.type === 'ADD_USER') {
    var newState = state.concat([action.user]);
    return newState;
  }
  return state;
}

// The Widget Reducer
const widgetReducer = function(state = {}, action) {
  return state;
}

const queryReducer = function(state = '', action) {
	if (action.type === 'SET_QUERY') {
		return action.query;
	}
	return state;
}

// Combine Reducers
const reducers = combineReducers({
  userState: userReducer,
  widgetState: widgetReducer,
  query: queryReducer,
});

// Create a store by passing in the reducer
export var store = createStore(reducers);
