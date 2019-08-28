<template>
    <div id="app">
        <v-header :seller="seller" />
        <tab />

        <router-view :seller="seller" />
    </div>
</template>

<script>
import VHeader from '@/components/Header/Header.vue';
import Tab from '@/components/Tab/Tab.vue';
import { getSeller } from 'api/index.js';

export default {
    data() {
        return {
            seller: {},
        }
    },
    async created () {
        this.seller = await getSeller();
    },
    components: {
        VHeader,
        Tab
    },
}
</script>

<style lang="stylus">
</style>
