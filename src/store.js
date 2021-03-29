import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const actions = {
  setAge ({ commit }, gender) {
    commit('isAuthenticated', isAuthenticated)
  },
  setRace ({ commit }, user) {
    commit('setUser', user)
  },
  setGender ({ commit }, user) {
    commit('setUser', user)
  },
}

const mutations = {
   setAge(state, age) {
       state.age = age
   },
   setRace(state, race) {
       state.race = race
   },
   setGender(state, gender){
       state.gender = gender
   }
}

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {},
    isSidebarActive: false
  },
  actions,
  mutations
})

export default store