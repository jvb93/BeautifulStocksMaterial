<template>
<div>
    <v-toolbar :color="quoteColor">
        <v-toolbar-title class="white--text">{{currentQuote.quote.companyName}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="white--text">{{currentQuote.quote.symbol}}</v-toolbar-title>

        
    </v-toolbar>
    <v-card>
        <v-container fluid>
            <v-layout row>
                <v-flex xs-12>
                    <h1 class="headline text-lighten">{{currentQuote.quote.latestPrice | currency}}</h1>
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
    quoteColor: () => {
      // store is undefined
      console.log(this.$store)
      return 'success'
      /* if (this.currentQuote.quote.latestPrice >= this.currentQuote.quote.open) {
        return 'success'
      }
      return 'danger' */
    },
    ...mapGetters([
      'currentQuote',
      'currentOptions',
      'stockTwits'
    ])
  }
}
</script>
