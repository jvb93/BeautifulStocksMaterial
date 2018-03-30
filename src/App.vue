<template>
  <v-app dark>
    <!--<v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      disable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>-->
    <v-toolbar
      app
      :clipped-left="clipped"
    >
     <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      
      <v-spacer></v-spacer>
       <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        @keyup.enter="lookupQuote(symbol)"
        v-model="symbol"
      ></v-text-field>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Beautiful',
      symbol:''
    }
  },
  name: 'App',
  mounted () {
    this.fetchLookupsFromLocalStorage()
  },
  methods:{ 
    ...mapActions([
      'lookupQuote',
      'fetchLookupsFromLocalStorage'
    ]),
    lookupSymbol: () => {
      this.addLookup(this.symbol)
    }
  }
}
</script>
