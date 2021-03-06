<template>
    <div class="seller" ref="sellerWrapper">
        <div class="seller-content">
            <!-- 概况 -->
            <div class="overview">
                <h1 class="title">{{ seller.name }}</h1>
                <!-- 详情 -->
                <div class="desc">
                    <!-- 星星评分 -->
                    <star :size="36" :score="seller.score" />
                    <!-- 评价数量 -->
                    <span class="text">({{ seller.ratingCount }})</span>
                    <!-- 月销售 -->
                    <span class="text">月售{{ seller.sellCount }}单</span>
                </div>
                <!-- 起送价/商家配送/送达时间 -->
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{ seller.minPrice }}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{ seller.deliveryPrice }}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{ seller.deliveryTime }}</span>元
                        </div>
                    </li>
                </ul>
                <!-- 收藏 -->
                <div class="favorite" @click="toggleFavorite">
                    <i class="icon icon-favorite" :class="{'active': favorite}"></i>
                    <span class="text">{{ favoriteText }}</span>
                </div>
            </div>
            <!-- 分割线 -->
            <split />
            <!-- 公告与活动 -->
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{ seller.bulletin }}</p>
                </div>
                <!-- 活动列表 -->
                <ul v-if="seller.supports" class="supports">
                    <li v-for="(item, index) in seller.supports" class="supports-item" :key="index">
                        <supports-ico :size="4" :type="seller.supports[index].type" />
                        <span class="text">{{ seller.supports[index].description }}</span>
                    </li>
                </ul>
            </div>
            <!-- 分割线 -->
            <split />
            <!-- 商家实景 -->
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref=picList>
                        <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 分割线 -->
            <split />
            <!-- 商家信息 -->
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="(info, index) in seller.infos" :key="index">
                        {{ info }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Star from '@/components/Star/Star.vue';
    import Split from '@/components/Split/Split.vue';
    import SupportsIco from '@/components/Supports-ico/Supports-ico.vue';
    import BScroll from 'better-scroll';
    import { saveToLocal, loadFromLocal } from '@/common/js/storage';

    export default {
        props: {
            seller: {
                type: Object
            },
        },
        data() {
            return {
                favorite: (() => {
                    return loadFromLocal(this.seller.id, 'favorite', false)
                })()
            }
        },
        computed: {
            favoriteText() {
                return this.favorite ? '已收藏' : '收藏';
            }
        },
        mounted() {
            this._initScroll();
            this._initPics();
        },
        watch: {
            seller(newValue) {
                this.$nextTick(() => {
                    this._initScroll();
                    this._initPics();
                });
            }
        },
        methods: {
            toggleFavorite() {
                this.favorite = !this.favorite;
                saveToLocal(this.seller.id, 'favorite', this.favorite);
            },
            _initPics() {
                if (this.seller && this.seller.pics) {
                    // 根据图片宽度, 设置pic-list的宽度, 以便 better-scroll 滚动
                    // 如果样式中使用的是rem单位, 可以通过获取 .pic-item 元素的宽高进行设置
                    // this.$refs.picWrapper.querySelector('.pic-item').getBoundingClientRect().width (/height)
                    let picWidth = 120;
                    let margin = 6;
                    let width = (picWidth + margin) * this.seller.pics.length - margin;
                    this.$refs.picList.style.width = width + 'px';

                    this.$nextTick(() => {
                        if (!this.picScroll) {
                            this.picScroll = new BScroll(this.$refs.picWrapper, {
                                scrollX: true, // 希望要 横向滚动
                                eventPassthrough: 'vertical' // 保留 纵向的滚动
                            })
                        } else {
                            this.picScroll.refresh();
                        }
                    })
                }
            },
            _initScroll() {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.sellerWrapper, {
                        click: true
                    })
                } else {
                    this.scroll.refresh();
                }
            }
        },
        components: {
            Star, Split, SupportsIco
        },
    }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'

.seller
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .overview
        position relative
        padding 18px
        .title
            margin-bottom 8px
            line-height 14px
            color rgb(7, 17, 27)
            font-size 14px
        .desc
            padding-bottom 18px
            border-1px(rgba(7, 17, 27, .1))
            .star
                display inline-block
                vertical-align top
                margin-right 8px
            .text
                display inline-block
                vertical-align top
                line-height 18px
                margin-right 12px
                font-size 10px
                color rgb(77, 85, 93)
        .remark
            display flex
            padding-top 18px
            .block
                flex 1
                text-align center
                border-right 1px solid rgba(7, 17, 27, .1)
                &:last-child
                    border none
                h2
                    margin-bottom 4px
                    line-height 10px
                    font-size 10px
                    color rgb(147, 153, 159)
                .content
                    line-height 24px
                    font-size 10px
                    color rgb(7, 17, 27)
                    .stress
                        font-size 24px
        .favorite
            position absolute
            right 11px
            top 10px
            width 50px
            text-align center
            .icon
                display block
                margin-bottom 4px
                line-height 24px
                font-size 24px
                color #d4d6d9
                &.active
                    color rgb(240, 20, 20)
            .text
                line-height 10px
                font-size 10px
                color rgb(77, 85, 93)
    .bulletin
        padding 18px 18px 0 18px
        .title
            margin-bottom 8px
            line-height 14px
            color rgb(7, 17, 27)
            font-size 14px
        .content-wrapper
            padding 0 12px 16px 12px
            border-1px(rgba(7, 17, 27, .1))
            .content
                line-height 24px
                font-size 12px
                color rgb(240, 20, 20)
        .supports
            .supports-item
                padding 16px 12px
                border-1px(rgba(7, 17, 27, .1))
                &:last-child
                    border-none()
                .text
                    display inline-block
                    vertical-align top
                    margin-left 6px
                    line-height 16px
                    font-size 12px
                    color rgb(7, 17, 27)
    .pics
        padding 18px
        .title
            margin-bottom 12px
            line-height 14px
            color rgb(7, 17, 27)
            font-size 14px
        .pic-wrapper
            width 100%
            overflow hidden
            white-space nowrap
            .pic-item
                display inline-block
                margin-right 6px
                width 120px
                height 90px
                &:last-child
                    margin 0
    .info
        padding 18px 18px 0 18px
        .title
            padding-bottom 12px
            line-height 14px
            border-1px(rgba(7, 17, 27, .1))
            color rgb(7, 17, 27)
            font-size 14px
        .info-item
            padding 16px 12px
            line-height 12px
            border-1px(rgba(7, 17, 27, .1))
            font-size 12px
            color rgb(7, 17, 27)
            &:last-child
                border-none()

</style>