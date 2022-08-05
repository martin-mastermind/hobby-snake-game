import { createStore } from 'vuex'

export default createStore({
  state: {
    score: 0,
    bestScore: 0,
    gameState: 0
  },
  mutations: {
    ADD_SCORE(state) {
      state.score++
    },
    RESET_SCORE(state) {
      state.bestScore = state.score
      state.score = 0
    },
    SET_GAME_STATE(state, type) {
      state.gameState = type
    }
  },
  getters: {
    allScore(state) {
      return {
        score: state.score,
        bestScore: state.bestScore
      }
    },
    gameState(state) {
      return state.gameState
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
      if (state.gameState === 1) return

      commit('SET_GAME_STATE', 1)
    },
    pause({ commit, state }) {
      if (state.gameState === 0) return

      commit('SET_GAME_STATE', 0)
    },
    reset({ commit, state }) {
      if (state.gameState === -1) return

      commit('SET_GAME_STATE', -1)
    },
  }
})
