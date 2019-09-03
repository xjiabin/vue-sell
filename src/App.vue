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
import { getSeller } from '@/api/index.js';
import { urlParse } from '@/common/js/urlParse';

export default {
    data() {
        return {
            seller: {
                id: (() => {
                    let queryParma = urlParse();
                    return queryParma.id
                })()
            },
        }
    },
    async created () {
        const seller = await getSeller({
            id: this.seller.id
        });
        this.seller = Object.assign({}, this.seller, seller);
    },
    components: {
        VHeader,
        Tab
    },
}
</script>

<style lang="stylus">
</style>
