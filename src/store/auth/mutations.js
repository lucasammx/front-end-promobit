/*
 *  As mutations abaixo são a única maneira de realmente mudar de estado em um store
 *  Ex.state e data(actions)
 */

const SET_TOKEN = (state, data) => {
  state.isLoggedIn = true;
  localStorage.setItem("token", data);
};

const SET_LOGOUT_USER = (state) => {
  state.isLoggedIn = false;
  localStorage.removeItem("token");
};

export { SET_TOKEN, SET_LOGOUT_USER };
