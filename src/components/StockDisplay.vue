<template>
<div>
    <v-toolbar color="success">
        <v-toolbar-title class="white--text">{{currentQuote.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="white--text">{{currentQuote.symbol}}</v-toolbar-title>

        
    </v-toolbar>
    <v-card>
        <v-container fluid>
            <v-layout row>
                <v-flex xs-12>
                    <h1 class="headline text-lighten">$168.17</h1>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</div>

</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'currentQuote'
        ])
    }
}
</script>
