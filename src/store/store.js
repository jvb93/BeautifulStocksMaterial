import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    recentLookups: [],
    currentLookup: '',
    currentQuote: null,
    isLookingUp: false,
    lookupFailure: false

  },
  getters: {
    recentLookups: (state) => {
      return state.recentLookups
    },
    currentLookup: (state) => {
      return state.currentLookup
    },
    currentQuote: (state) => {
      return state.currentQuote
    }
  },
  mutations: {
    setLookups: (state, payload) => {
      state.recentLookups = payload
    },
    clearLookups: (state, payload) => {
      state.recentLookups = []
    },
    pushLookup: (state, payload) => {
      state.recentLookups.unshift(payload)
    },
    setCurrentLookup: (state, payload) => {
      state.currentLookup = payload.toUpperCase()
    },
    toggleIsLookingUp: (state, payload) => {
      state.isLookingUp = !state.isLookingUp
    },
    setCurrentQuote: (state, payload) => {
      state.currentQuote = payload
    }
  },
  actions: {
    fetchLookupsFromLocalStorage: (context, payload) => {
      if (localStorage.recentLookups) {
        context.commit('setLookups', JSON.parse(localStorage.recentLookups))
      } else {
        context.commit('clearLookups')
      }
    },
    addLookup: (context, payload) => {
      if (!context.getters.recentLookups.some(e => e.symbol.toUpperCase() === payload.toUpperCase())) {
        // only add if the lookup doesn't exist
        context.commit('pushLookup', {symbol: payload.toUpperCase(), dateAdded: Date.now()})
        localStorage.setItem('recentLookups', JSON.stringify(context.getters.recentLookups))
      }
    },
    lookupQuote: (context, payload) => {
      context.commit('setCurrentLookup', payload)
      context.commit('setCurrentQuote', null)
      context.commit('toggleIsLookingUp')
      setTimeout(() => {
        context.commit('setCurrentQuote', {symbol: context.getters.currentLookup, title: 'Apple, Inc'})
        context.commit('toggleIsLookingUp')
        context.dispatch('addLookup', payload)
      }, 2000)
    }

  }
})
