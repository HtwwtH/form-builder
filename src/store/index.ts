import Vue from 'vue'
import Vuex from 'vuex'
import Auth from "./modules/auth.module";
import Form from "./modules/form.module";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    Form
  }
})
