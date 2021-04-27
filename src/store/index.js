import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import { get_token } from "../api/manageApi"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /* token: "" */

  },
  mutations: {
    /* setToken(state, data) {
      state.token = data.token

    } */


  },
  actions: {
    /* getMyToken(store, data) {
      get_token(data).then(res => {
        console.log(res, "获取token")
        store.commit("setToken", res.data)
        sessionStorage.setItem("token", res.data.token);

      })
    }, */

  },
  //vue-admin模板自带
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
