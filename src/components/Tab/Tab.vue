<template>
    <div class="tab">
        <div class="tab-item">
            <router-link :to='{name: "goods"}'>商品</router-link>
        </div>
        <div class="tab-item">
            <router-link :to='{name: "ratings"}'>评论</router-link>
        </div>
        <div class="tab-item">
            <router-link :to='{name: "seller"}'>商家</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';

.tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
        flex 1
        text-align center
        & > a
            display block
            font-size 14px
            color rgb(77, 85, 93)
            &.active
                color rgb(240, 20, 20)
</style>
