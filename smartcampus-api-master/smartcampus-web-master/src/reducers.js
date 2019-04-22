import { combineReducers } from 'redux'
import { reducer as notifications } from 'react-notification-system-redux';
import {
  FETCH_EVENT,
  POST_EVENT,
  LIKE_EVENT,
  UNLIKE_EVENT,
  ATTEND_EVENT,
  UNATTEND_EVENT,
  COMMENT_EVENT,
  COMMENT_EVENT_UPDATE,
  DELETE_COMMENT,
  FETCH_EVENTS,
  LOGIN,
  REGISTER,
  FETCH_CURRENT_USER,
  LOGOUT,
  OPEN_MODAL,
  CLOSE_MODAL,
  FRIEND_REQUEST,
  FRIEND_LIST,
  ADD_FRIEND,
  DECLINE_FRIEND,
  REMOVE_FRIEND,
} from './actions'

/**
 * Refs
 * https://redux.js.org/basics/reducers
 * 
 * Reducers define how state is changed, given an action.
 * For ex. when user is logged in/out (action), we toggle currentUser (state)
 * When an action is dispatched in redux, these functions intercept.
 */
// Reducer 
function friends(state = {isFetchingFriends: false, friends: []}, action) {
  switch (action.type) {
    case `${FRIEND_LIST}_PENDING`:
      return {
        ...state,
        isFetchingFriends: true,
      };
    case `${FRIEND_LIST}_FULFILLED`:
      return {
        ...state,
        isFetchingFriends: false,
        friends: action.payload.body
      };
    case `${FRIEND_LIST}_REJECTED`:
      return {
        ...state,
        isFetchingFriends: false
      };
    case `${REMOVE_FRIEND}_FULFILLED`:
      return {
        ...state,
        friends: state.friends.filter((friend) => friend.id !== action.id)
      };
    default:
      return state
  }
}

function friendRequest(state = {isFetchingRequests: false, requests: []}, action) {
	switch(action.type){
    case `${FRIEND_REQUEST}_PENDING`:
    return {
      ...state,
      isFetchingRequests: true
    };
    case `${FRIEND_REQUEST}_FULFILLED`:
      return {
        ...state,
        isFetchingRequests: false,
        requests: action.payload.body
      };
    case `${FRIEND_REQUEST}_REJECTED`:
      return {
        ...state,
        isFetchingRequests: false
      };
    case `${ADD_FRIEND}_FULFILLED`:
    case `${DECLINE_FRIEND}_FULFILLED`:
      return {
        ...state,
        requests: state.requests.filter((request) => request.id !== action.id)
      };
		default:
		return state
	}
}

function eventFeed(state = {isFetching: false, events: []}, action) {
  switch (action.type) {
    case `${POST_EVENT}_FULFILLED`:
      return {
        ...state,
        events: [action.payload.body.event, ...state.events]
      };
      case `${LIKE_EVENT}_FULFILLED`:
      case `${UNLIKE_EVENT}_FULFILLED`:
      case `${ATTEND_EVENT}_FULFILLED`:
      case `${UNATTEND_EVENT}_FULFILLED`:
      // Replace the event with the updated event from server
      const receivedEvent = action.payload.body.event;
      return {
        ...state,
        events: state.events.map((event) => 
          event.id === receivedEvent.id ? receivedEvent : event
        )
      };
    case `${FETCH_EVENTS}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${FETCH_EVENTS}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        events: action.payload.body.events
      };
    case `${FETCH_EVENTS}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        errors: action.payload.body
      };
    default:
      return state
  }
}

function currentUser(state = null, action) {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`:
    case `${REGISTER}_FULFILLED`:
    case `${FETCH_CURRENT_USER}_FULFILLED`:
      return action.payload.body.user;
    case LOGOUT:
      return null; // no user
    default:
      return state
  }
}

// Sets the current event (used by EventPage)
function currentEvent(state = null, action) {
  switch (action.type) {
    case `${FETCH_EVENT}_PENDING`:
      return null; // Reset current event while fetching
    case `${FETCH_EVENT}_FULFILLED`:
    case `${LIKE_EVENT}_FULFILLED`:
    case `${UNLIKE_EVENT}_FULFILLED`:
    case `${ATTEND_EVENT}_FULFILLED`:
    case `${UNATTEND_EVENT}_FULFILLED`:
      return action.payload.body.event;
    case `${COMMENT_EVENT}_FULFILLED`:
      return { 
        ...state, // Add to start of event's comment list
        comments: [action.payload.body.comment, ...state.comments]
      }
    case `${DELETE_COMMENT}_FULFILLED`:
      return { 
        ...state, // Keep comments that arent the deleted one
        comments: state.comments.filter((comment) => comment.id !== action.id)
      }
    default:
      return state
  }
}

// Sets the current event's comment body (used by EventPage)
function currentEventComment(state = null, action) {
  switch (action.type) {
    case COMMENT_EVENT_UPDATE:
      return action.body; // update field with body
    case `${COMMENT_EVENT}_FULFILLED`:
      return ''; // reset comment field
    default:
      return state
  }
}

function modal(state = {type: null, show: false}, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        type: action.modalType,
        show: true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        show: false
      }
    default:
      return state
  }
}

export default combineReducers({
  currentUser, 
  currentEvent, 
  currentEventComment, 
  eventFeed, 
  modal, 
  notifications,
  friendRequest,
  friends
})