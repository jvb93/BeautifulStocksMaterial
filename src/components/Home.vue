<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-toolbar color="blue" dark>
                <v-toolbar-title>Trending</v-toolbar-title>
              </v-toolbar>
              <v-list two-line>
                <template v-for="(item) in trendingSymbols">
                  <v-list-tile :key="item.symbol" >
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.symbol"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
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
export default {
  data () {
    return {
      trendingSymbols: []
    }
  },
  methods: {
    getTrendingSymbols () {
      this.$http.jsonp('https://api.stocktwits.com/api/2/trending/symbols.json').then(response => {
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

