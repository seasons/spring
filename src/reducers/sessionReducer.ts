import * as actionTypes from "../actions"

const userSession = JSON.parse(localStorage.getItem("userSession") || "{}")
const initialState = {
  ...userSession,
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...action.userSession,
        ...state,
      }
    }

    case actionTypes.SESSION_LOGOUT: {
      localStorage.removeItem("userSession")
      return {
        ...state,
        session: {},
      }
    }

    default: {
      return state
    }
  }
}

export default sessionReducer
