import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    recentLookups: [],
    stockTwits: [],
    currentLookup: '',
    options: null,
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
    },
    stockTwits: (state) => {
      return state.stockTwits
    },
    lookupFailure: (state) => {
      return state.lookupFailure
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
    setLookupFailure: (state, payload) => {
      state.lookupFailure = payload
    },
    setCurrentQuote: (state, payload) => {
      state.currentQuote = payload
    },
    setStockTwits: (state, payload) => {
      state.stockTwits = payload
    },
    setOptions: (state, payload) => {
      state.options = payload
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
      var symbol = payload.quote.symbol.toUpperCase()
      var companyName = payload.quote.companyName
      if (!context.getters.recentLookups.some(e => e.symbol.toUpperCase() === symbol)) {
        // only add if the lookup doesn't exist
        context.commit('pushLookup', {symbol: symbol, companyName: companyName, dateAdded: Date.now()})
        localStorage.setItem('recentLookups', JSON.stringify(context.getters.recentLookups))
      }
    },
    purgeRecentLookups: (context, payload) => {
      localStorage.recentLookups = '[]'
      context.dispatch('fetchLookupsFromLocalStorage')
    },
    lookupQuote: (context, payload) => {
      context.commit('setCurrentLookup', payload)
      context.commit('setCurrentQuote', null)
      context.commit('setLookupFailure', false)
      context.commit('toggleIsLookingUp')

      Vue.http.get('https://api.iextrading.com/1.0/stock/' + payload + '/batch?types=quote,news&range=1d&last=10')
                .then(response => {
                  context.commit('setCurrentQuote', response.data)
                  context.commit('setCurrentLookup', '')
                  context.commit('toggleIsLookingUp')
                  context.dispatch('getStockTwits', payload)
                  context.dispatch('getOptions', {symbol: payload, date: '06-04-2018'})
                  context.dispatch('addLookup', response.data)
                }, response => {
                  context.commit('setLookupFailure', true)
                  context.commit('setCurrentLookup', '')
                })
    },
    getStockTwits: (context, payload) => {
      Vue.http.jsonp('https://api.stocktwits.com/api/2/streams/symbol/' + payload + '.json').then(response => {
        context.commit('setStockTwits', response.body.messages)
      }, response => {
        context.commit('setStockTwits', [])
      })
    },
    getOptions: (context, payload) => {
      Vue.http.get('/tradier/markets/options/chains?symbol=' + payload.symbol + '&expiration=' + payload.date).then(response => {
        context.commit('setOptions', response.data.options)
      }, response => {
        context.commit('setOptions', [])
      })
    }
  }
})
