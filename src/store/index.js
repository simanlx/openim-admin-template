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
    newUsers: "",
    activeUser: "",
    cumulativeUsers: "",
    singleChat: ""
  },
  mutations: {
    /* setToken(state, data) {
      state.token = data.token

    } */
    //用户数据统计
    setUserStatisticalData(state, data) {
      state.newUsers = data.add
      state.activeUser = data.active
      state.cumulativeUsers = data.all

    },
    //消息数据统计
    setInfoStatisticalData(state, data) {
      state.singleChat = data.singleAll
    }



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
