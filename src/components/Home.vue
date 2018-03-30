<template>
  <v-container grid-list-md fluid fill-height>
    <v-slide-y-transition mode="out-in">
        <v-layout row>
          <v-flex xs12 sm2>
             <v-card>
              <v-toolbar color="secondary">
                <v-toolbar-title>Recent</v-toolbar-title>
              </v-toolbar>
              <v-list two-line>
                  <v-list-tile v-ripple v-for="(item) in trendingSymbols" :key="item.symbol">
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.symbol"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12 sm8>
            <stock-display></stock-display>
          </v-flex>
          <v-flex xs12 sm2>
            <v-card>
              <v-toolbar color="secondary">
                <v-toolbar-title>Trending</v-toolbar-title>
              </v-toolbar>
              <v-list two-line>
                  <v-list-tile v-ripple v-for="(item) in trendingSymbols" :key="item.symbol">
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
    getTrendingSymbols () {
      this.$http.jsonp('https://api.stocktwits.com/api/2/trending/symbols/equities.json').then(response => {
        this.trendingSymbols = response.body.symbols
      }, response => {
      })
    }
  },
  mounted () {
    this.getTrendingSymbols()
  }
}
</script>

