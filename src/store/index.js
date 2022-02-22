import Vue from "vue";
import Vuex from "vuex";
import tags from "./tags";
import auth from "./auth";
import products from "./products";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    tags,
    auth,
  },
});
