import Vue from "vue";
import Vuex from "vuex";
import tags from "./tags";
import auth from "./auth";
import products from "./products";
import dashboard from "./dashboard";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dashboard,
    products,
    tags,
    auth,
  },
});
