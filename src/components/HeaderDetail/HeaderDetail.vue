<template>
    <transition name="fade">
        <div class="detail" v-show="detailShow">
            <!-- sctiky-footer 布局 -->
            <!-- 内容 容器 -->
            <div class="detail-wrapper clear-fix">
                <!-- 内容主体 -->
                <div class="detail-main">
                    <!-- 店铺名称 -->
                    <h1 class="name">{{ seller.name }}</h1>
                    <!-- 星星评分 -->
                    <div class="star-wrapper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <!-- 带线的标题：优惠信息 -->
                    <line-title title="优惠信息" />
                    <!-- 优惠信息列表 -->
                    <ul v-if="seller.supports" class="supports">
                        <li v-for="(item, index) in seller.supports" class="supports-item" :key="index">
                            <supports-ico :size="2" :type="seller.supports[index].type" />
                            <span class="text">{{ seller.supports[index].description }}</span>
                        </li>
                    </ul>
                    <!-- 带线的标题：商家公告 -->
                    <line-title title="商家公告" />
                    <div class="bulletin">
                        <p class="content">{{ seller.bulletin }}</p>
                    </div>
                </div>
            </div>
            <!-- 底部：（内容不足一屏时固定在底部；超过一屏则滚动） -->
            <div class="detail-close">
                <i class="icon-close" @click="close"></i>
            </div>
        </div>
    </transition>
</template>

<script>
import Star from '@/components/Star/Star.vue';
import LineTitle from '@/components/LineTitle/LineTitle.vue';
import SupportsIco from '@/components/Supports-ico/Supports-ico.vue';

export default {
    props: {
        seller: {
            type: Object
        },
    },
    data() {
        return {
            detailShow: false
        }
    },
    methods: {
        open() {
            this.detailShow = true
        },
        close() {
            this.detailShow = false
        }
    },
    components: {
        Star, LineTitle, SupportsIco
    },
}
</script>

<style lang="stylus" scoped>
.fade-enter,
.fade-leave-to
    opacity 0
.fade-enter-active,
.fade-leave-active
    transition all .3s

.detail
    position fixed
    z-index 300
    top 0
    left 0
    width 100%
    height 100%
    overflow auto
    background rgba(7, 17, 27, .8)
    .detail-wrapper
        width 100%
        min-height 100%
        padding-top 64px
        box-sizing border-box
        .detail-main
            padding-bottom 64px
            .name
                line-height 16px
                text-align center
                font-size 16px
                font-weight 700
            .star-wrapper
                margin-top 18px
                padding 2px 0
                text-align center
            .supports
                width 80%
                margin 0 auto
                .supports-item
                    display flex
                    align-items center
                    padding 0 12px
                    margin-bottom 12px
                    &:last-child
                        margin-bottom 0
                    .text
                        margin-left 6px
                        line-height 16px
                        font-size 12px
            .bulletin
                width 80%
                margin 0 auto
                .content
                    padding 0 12px
                    line-height 24px
                    font-size 12px

    .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>
