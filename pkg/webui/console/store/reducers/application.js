// Copyright © 2019 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  GET_APP,
  GET_APP_SUCCESS,
  GET_APP_FAILURE,
} from '../actions/application'
import {
  GET_APP_LINK,
  GET_APP_LINK_SUCCESS,
  GET_APP_LINK_FAILURE,
  UPDATE_APP_LINK_SUCCESS,
  DELETE_APP_LINK_SUCCESS,
} from '../actions/link'

const linkDefaultState = {
  fetching: false,
  linked: false,
  error: undefined,
  link: undefined,
  stats: undefined,
}

const link = function (state = linkDefaultState, action) {
  switch (action.type) {
  case GET_APP_LINK:
    return {
      ...state,
      fetching: true,
    }
  case GET_APP_LINK_SUCCESS:
    return {
      ...state,
      fetching: false,
      error: undefined,
      linked: action.linked,
      link: action.link || {},
      stats: action.stats,
    }
  case UPDATE_APP_LINK_SUCCESS:
    const { link, stats } = action
    return {
      ...state,
      linked: true,
      fetching: false,
      error: undefined,
      link: {
        ...state.link,
        ...link,
      },
      stats: {
        ...state.stats,
        ...stats,
      },
    }
  case DELETE_APP_LINK_SUCCESS:
    return {
      ...state,
      fetching: false,
      error: undefined,
      link: {},
      stats: undefined,
    }
  case GET_APP_LINK_FAILURE:
    return {
      ...state,
      fetching: false,
      error: action.error,
    }
  default:
    return state
  }
}

const defaultState = {
  fetching: false,
  error: undefined,
  application: undefined,
  link: {},
}

const application = function (state = defaultState, action) {
  switch (action.type) {
  case GET_APP:
    return {
      ...state,
      fetching: true,
      application: undefined,
      error: undefined,
    }
  case GET_APP_SUCCESS:
    return {
      ...state,
      fetching: false,
      application: action.application,
    }
  case GET_APP_FAILURE:
    return {
      ...state,
      fetching: false,
      error: action.error,
    }
  case GET_APP_LINK:
  case GET_APP_LINK_SUCCESS:
  case GET_APP_LINK_FAILURE:
  case UPDATE_APP_LINK_SUCCESS:
  case DELETE_APP_LINK_SUCCESS:
    return {
      ...state,
      link: link(state.link, action),
    }
  default:
    return state
  }
}

export default application
