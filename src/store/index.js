import { createStore } from 'vuex'

export default createStore({
  state: {
    score: 0,
    bestScore: 0,
    isStarted: false
  },
  mutations: {
    ADD_SCORE(state) {
      state.score++
    },
    RESET_SCORE(state) {
      state.bestScore = Math.max(state.bestScore, state.score)
      state.score = 0
    },
    SET_IS_STARTED(state, type) {
      state.isStarted = type
    }
  },
  getters: {
    allScore(state) {
      return {
        score: state.score,
        bestScore: state.bestScore
      }
    },
    isStarted(state) {
      return state.isStarted
    }
  },
  actions: {
    addScore({ commit }) {
      commit('ADD_SCORE');
    },
    resetScore({ commit }) {
      commit('RESET_SCORE');
    },
    start({ commit, state }) {
      if (state.isStarted) return

      commit('SET_IS_STARTED', true)
    },
    reset({ commit, state }) {
      if (!state.isStarted) return

      commit('SET_IS_STARTED', false)
    },
  }
})
