<template>
  <v-container grid-list-md fluid fill-height>
    <v-slide-y-transition mode="out-in">
        <v-layout row wrap>
          <v-flex xs12 sm2 order-xs2>
             <v-card>
              <v-toolbar color="secondary">
                <v-toolbar-title>Recent</v-toolbar-title>
                <v-spacer/>
                <v-toolbar-items>
                  <v-btn flat @click="purgeRecentLookups" v-if="recentLookups.length">
                    CLEAR
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-list two-line v-if="recentLookups.length">
                  <v-list-tile v-ripple v-for="(item) in recentLookups" :key="item.symbol" @click="lookupQuote(item.symbol)">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.symbol"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.companyName"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12 sm8 order-xs1>
            <v-slide-y-transition>
              <stock-display v-if="currentQuote != null"></stock-display>
              <div v-if="lookupFailure">
                <h1> FAIL </h1>
              </div>
            </v-slide-y-transition>
            
          </v-flex>
          <v-flex xs12 sm2 order-xs3>
            <v-card>
              <v-toolbar color="secondary">
                <v-toolbar-title>Trending</v-toolbar-title>
              </v-toolbar>
              <v-list two-line>
                  <v-list-tile v-ripple v-for="(item) in trendingSymbols" :key="item.symbol" @click="lookupQuote(item.symbol)">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.symbol"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>

<script>
import StockDisplay from '@/components/StockDisplay'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      trendingSymbols: []
    }
  },
  components: {
    StockDisplay
  },
  methods: {
    ...mapActions([
      'lookupQuote',
      'purgeRecentLookups'
    ]),
    getTrendingSymbols () {
      this.$http.jsonp('https://api.stocktwits.com/api/2/trending/symbols/equities.json').then(response => {
        this.trendingSymbols = response.body.symbols
      }, response => {
      })
    }
  },
  mounted () {
    this.getTrendingSymbols()
  },
  computed: {
    ...mapGetters([
      'recentLookups',
      'currentQuote',
      'lookupFailure'
    ])
  }
}
</script>

