import Vue from 'vue'

import Vuex from 'vuex'

import {tags} from '../did/api'

Vue.use(Vuex)

const state = {
  tags: {}
}

const mutations = {
  setTag (state, {tag, res}) {
    Vue.set(state.tags, tag, res)
  }
}

const actions = {
  getTag ({state, commit}, tag) {
    if (!state.tags[tag]) {
      tags.get(tag)
        .then(res => {
          commit('setTag', {tag, res})
        })
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})