/*
 *  As actions abaixo são requisições feitas para o servidor portal-backend-v2
 *  Ex.Login de usuario,informações do usuario e regras como reset de senha e authenticação com socialite.
 */
import Vue from "vue";

const authenticate = ({ commit }, payload) => {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("password", payload.password);

  return new Promise((resolve, reject) => {
    window.axios
      .post(`/auth`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((resp) => {
        commit("SET_TOKEN", resp.data.token);
        resolve(resp.data);
      })
      .catch((error) => {
        let objectError = error.response.data.errors;
        if (objectError) {
          Object.values(objectError).forEach((error, key) => {
            Vue.$toast.error(error[key]);
          });
        }
        reject(error.response);
      });
  });
};

const checkAuth = () => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/auth/check`)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        let objectError = error.response.data.errors;
        if (objectError) {
          Object.values(objectError).forEach((error, key) => {
            Vue.$toast.error(error[key]);
          });
        }
        reject(error.response);
      });
  });
};

const logout = (state) => {
  return state.commit("SET_LOGOUT_USER");
};

export { authenticate, logout, checkAuth };
