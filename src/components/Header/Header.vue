<template>
    <div class="header">
        <!-- 内容 -->
        <div class="content-wrapper">
            <!-- 头像 -->
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <!-- 内容 -->
            <div class="content">
                <!-- 标题 -->
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <!-- 描述/送达时间 -->
                <div class="description">
                    {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
                </div>
                <!-- 活动（满减） -->
                <div class="supports" v-if="seller.supports">
                    <!-- <span class="icon" :class="classMap[seller.supports[0].type]"></span> -->
                    <supports-ico :size="1" :type="seller.supports[0].type" />
                    <span class="text">{{ seller.supports[0].description }}</span>
                </div>
            </div>
            <!-- 活动入口按钮 -->
            <div class="support-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{ seller.supports.length }}个</span>
                <i class="icon icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <!-- 公告 -->
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{ seller.bulletin }}</span>
            <i class="icon icon-keyboard_arrow_right"></i>
        </div>
        <!-- 背景 -->
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <!-- 弹窗 -->
        <header-detail ref="headerDetail" :seller="seller" />
    </div>
</template>

<script>
import HeaderDetail from '@/components/HeaderDetail/HeaderDetail.vue';
import SupportsIco from '@/components/Supports-ico/Supports-ico.vue';
import { getSeller } from 'api/index.js';

export default {
    data() {
        return {
            seller: {}, // 
            detailShow: false,
        }
    },
    async created () {
        this.seller = await getSeller();
    },
    methods: {
        showDetail() {
            this.$refs.headerDetail.open();
        }
    },
    components: {
        HeaderDetail, SupportsIco
    },
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin";

.header
    position relative
    color #fff
    background-color rgba(7, 17, 27, .5)
    overflow hidden
    .content-wrapper
        position relative
        padding 24px 12px 18px 24px
        .avatar
            display inline-block
            vertical-align top
            img
                border-radius 2px
        .content
            display inline-block
            margin-left 16px
            .title
                margin 2px 0 8px 0
                .brand
                    display inline-block
                    vertical-align top
                    width 30px
                    height 18px
                    bg-image('brand')
                    background-size 30px 18px
                    background-repeat no-repeat
                .name
                    line-height 18px
                    margin-left 6px
                    font-size 16px
                    font-weight bold
            .description
                margin-bottom 8px
                font-size 12px
                line-height 12px
            .supports
                display flex
                align-items center
                .text
                    margin-left 4px
                    line-height 12px
                    font-size 10px
        .support-count
            position absolute
            right 12px
            bottom 14px
            padding 0 8px
            height 24px
            line-height 24px
            border-radius 14px
            text-align center
            background-color rgba(0, 0, 0, .2)
            .count
                vertical-align top
                font-size 10px
            .icon
                margin-left 2px
                line-height 24px
                font-size 10px
    .bulletin-wrapper
        position relative
        height 28px
        line-height 28px
        padding 0 22px 0 12px
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        background-color rgba(7, 17, 27, .2)
        .bulletin-title
            display inline-block
            vertical-align middle
            width 22px
            height 12px
            bg-image('bulletin')
            background-size 22px 12px
            background-repeat no-repeat
        .bulletin-text
            vertical-align middle
            margin 0 4px
            font-size 10px
        .icon
            position absolute
            font-size 10px
            top 8px
            right 12px
    .background
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        z-index -1
        filter blur(10px)

</style>
