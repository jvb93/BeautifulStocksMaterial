<template>
<div>
    <v-toolbar :class="contextualColor">
        <v-toolbar-title class="white--text">{{currentQuote.quote.companyName}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="white--text">{{currentQuote.quote.symbol}}</v-toolbar-title>

        
    </v-toolbar>
    <v-card> 
        <v-container fluid>
            <v-layout row>
                <v-flex xs-12>
                    <h1 class="headline text-lighten">{{currentQuote.quote.latestPrice | currency}}</h1>
                    <h3 :class="contextualTextColor">{{(currentQuote.quote.changePercent*100).toFixed(2)}}%</h3>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs-3>
                    <h3>CEO</h3>
                    <p>{{currentQuote.company.CEO}}</p>
                </v-flex>
                <v-flex xs-3>
                    <h3>Sector</h3>
                    <p>{{currentQuote.company.sector}}</p>
                </v-flex>
                <v-flex xs-3>
                    <h3>Industry</h3>
                    <p>{{currentQuote.company.industry}}</p>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs-3>
                    <h3>Market Cap</h3>
                    <p>{{currentQuote.quote.marketCap}}</p>
                </v-flex>
                <v-flex xs-3>
                    <h3>P/E</h3>
                    <p>{{currentQuote.quote.peRatio}}</p>
                </v-flex>
                <v-flex xs-3>
                    <h3>Volume</h3>
                    <p>{{currentQuote.quote.latestVolume}}</p>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs-3>
                    <h3>Day High</h3>
                    <p>{{currentQuote.quote.high}}</p>
                </v-flex>
                <v-flex xs-3>
                    <h3>Day Low</h3>
                    <p>{{currentQuote.quote.low}}</p>
                </v-flex>
                <v-flex xs-3>
                    <h3>Open</h3>
                    <p>{{currentQuote.quote.open}}</p>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs-3>
                    <h3>52 Week High</h3>
                    <p>{{currentQuote.quote.week52High}}</p>
                </v-flex>
                <v-flex xs-3>
                    <h3>52 Week Low</h3>
                    <p>{{currentQuote.quote.week52Low}}</p>
                </v-flex>
                <v-flex xs-3>
                   
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs-12>
                    <v-tabs centered slot="extension" v-model="currentTab">
                        <v-tab :href="`#tab-1`">
                            Options
                        </v-tab>
                        <v-tab :href="`#tab-2`">
                            News
                        </v-tab>
                        <v-tab :href="`#tab-3`">
                            StockTwits
                        </v-tab>
                    </v-tabs>
 
                    <v-tabs-items v-model="currentTab">
                        <v-tab-item :id="`tab-1`">
                            <v-card flat>
                                 <v-data-table
                                    v-if="currentOptions && currentOptions.option && currentOptions.option.length"
                                    :headers="optionsHeaders"
                                    :items="currentOptions.option"
                                    :pagination.sync="pagination"
                                    hide-actions
                                    class="elevation-1">
                                    <template slot="items" slot-scope="props">
                                    <td>{{ props.item.option_type }}</td>
                                    <td>{{ props.item.strike | currency}}</td>
                                    <td>{{ props.item.expiration_date }}</td>
                                    <td>{{ props.item.open_interest }}</td>
                                    <td>{{ props.item.bid | currency}}</td>
                                    <td>{{ props.item.ask | currency}}</td>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item :id="`tab-2`">
                            <v-card flat v-for="news in currentQuote.news" :key="news.url">
                                <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0" v-html="news.headline"></h3>
                                    <div class="text--darken-3">{{news.datetime | moment("LLL")}}, {{news.source}}</div>
                                </div>
                                </v-card-title>
                                <v-card-text v-html="news.summary">
                                </v-card-text>
                                <v-card-actions>
                                <v-btn flat color="primary" target="_blank" :href="news.url">Read More</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item :id="`tab-3`">
                            <v-card flat>
                                <v-card flat v-for="twit in stockTwits" :key="twit.id">
                                <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">@{{twit.user.username}}</h3>
                                    <div class="text--darken-3">{{twit.created_at | moment("LLL")}}</div>
                                </div>
                                </v-card-title>
                                <v-card-text v-html="twit.body">
                                </v-card-text>
                            </v-card>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</div>

</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      currentTab: 'tab-1',
      text: 'test text',
       pagination: {
          sortBy: 'open_interest',
          descending: true
        },
      optionsHeaders: [
        { text: 'Type', value: 'option_type' },
        { text: 'Strike', value: 'strike' },
        { text: 'Expiration', value: 'expiration_date' },
        { text: 'Open Interest', value: 'open_interest' },
        { text: 'Bid', value: 'bid' },
        { text: 'Ask', value: 'ask' },
      ]
    }
  },
  computed: {
    contextualColor: function() {
      if (this.$store.getters.currentQuote.quote.change >= 0) {
        return 'green'
      }
      return 'red'
    },
    contextualTextColor : function()
    {
        return this.contextualColor + '--text'
    },
    ...mapGetters({
      currentQuote: 'currentQuote',
      currentOptions: 'currentOptions',
      stockTwits: 'stockTwits'
    })
  }
}
</script>
