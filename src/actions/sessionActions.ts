export const SESSION_LOGIN = "SESSION_LOGIN"
export const SESSION_LOGOUT = "SESSION_LOGOUT"

export const login = userSession => {
  return {
    type: SESSION_LOGIN,
    userSession,
  }
}

export const logout = () => {
  return {
    type: SESSION_LOGOUT,
  }
}
