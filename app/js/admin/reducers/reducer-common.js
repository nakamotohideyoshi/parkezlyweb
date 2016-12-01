const initialState = {
  isLoading: true,
  data: [],
  error: false
};

import _ from 'lodash';

function handleAction(state, action, type) {
  switch(action.type) {
    case type.error:
      return _.assign({}, state, {isLoading: false, data: action.data, error: true});
    case type.success:
      return _.assign({}, state, {isLoading: false, data: action.data, error: false });
    case type.start:
      return _.assign({}, state, {isLoading: true, error: false });
    case types.RESET_LOADING:
      return _.assign({}, state, initialState);
    default:
      return state;
  }
}

export function WhateverFetched(state = initialState, action) {
  return handleAction(state, action, types.WHATEVER_GET);
};

export function WhateverEdited(state = initialState, action) {
  return handleAction(state, action, types.WHATEVER_PUT);
}

export function WhateverCreated(state = initialState, action) {
  return handleAction(state, action, types.WHATEVER_POST);
}