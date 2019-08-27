<template>
    <div id="app">
        <v-header></v-header>
        <tab></tab>

        <router-view></router-view>
    </div>
</template>

<script>
import VHeader from '@/components/Header/Header.vue';
import Tab from '@/components/Tab/Tab.vue';

export default {
    components: {
        VHeader,
        Tab
    },
}
</script>

<style lang="stylus">
</style>
