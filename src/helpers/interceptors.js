import store from "../store";
import router from "../router";

export function responseInterceptor() {
  const SESSION_EXPIRED_CODE = 401;

  window.axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === SESSION_EXPIRED_CODE) {
        store.dispatch("auth/logout").then(() => {
          router.push({ name: "auth@login" });
        });
      }

      return Promise.reject(error);
    }
  );
}

export function requestInterceptor() {
  window.axios.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem("token");

      if (token != undefined) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
