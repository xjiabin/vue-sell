<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <!-- 概括 -->
            <div class="overview">
                <!-- 综合评分 -->
                <div class="overview-left">
                    <h1 class="score">{{ seller.score }}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
                </div>
                <!-- 评分... -->
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{ seller.serviceScore }}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{ seller.foodScore }}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{ seller.deliveryTime }}分钟</span>
                    </div>
                </div>
            </div>
            <!-- 分割线 -->
            <split />
            <!-- 评价选择 -->
            <rating-select
                :select-type="selectType"
                :only-content="onlyContent"
                :ratings="ratings"
                @selected="onSelect"
                @switch="onToggle" />

            <!-- 评价列表 -->
            <div class="rating-wrapper">
                <ul v-if="computedRatings && computedRatings.length">
                    <li v-for="(rating, index) in computedRatings" :key="index" class="rating-item">
                        <!-- 左边 头像 -->
                        <div class="avatar">
                            <img :src="rating.avatar" width="28" height="28" />
                        </div>
                        <!-- 右边 内容 -->
                        <div class="content">
                            <!-- 用户名 -->
                            <h1 class="name">{{ rating.username }}</h1>
                            <!-- 星星 -->
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score" />
                                <!-- 送达时间 -->
                                <span class="delivery" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
                            </div>
                            <!-- 评价文本 -->
                            <p class="text">{{ rating.text }}</p>
                            <!-- 推荐 -->
                            <div class="recommend" v-if="rating.recommend">
                                <i class="icon icon-thumb_up"></i>
                                <span v-for="(item, n) in rating.recommend" :key="n" class="item">{{ item }}</span>
                            </div>
                            <!-- 评论时间 -->
                            <div class="time">{{ rating.rateTime | formatDate }}</div>
                        </div>
                    </li>
                </ul>
                <!-- 无数据 -->
                <div class="no-rating" v-else>暂无评价</div>
            </div>
        </div>

    </div>
</template>

<script>
    import { getRatings } from '@/api/index'
    import Star from '@/components/Star/Star.vue';
    import RatingSelect from '@/components/RatingSelect/RatingSelect.vue';
    import Split from '@/components/Split/Split.vue';

    import ratingMixin from '@/common/mixin/rating';
    import format from '@/common/mixin/format';

    import BScroll from 'better-scroll';

    export default {
        mixins: [ratingMixin, format],
        props: {
            seller: {
                type: Object
            },
        },
        data() {
            return {
                ratings: [], // 评价
            }
        },
        async created () {
            this.ratings = await getRatings();
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.ratings, {
                    click: true
                })
            })
        },
        watch: {
            selectType(newValue) {
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            }
        },
        components: {
            Star, RatingSelect,
            Split
        },
    }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'

.ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
        display flex
        padding 18px 0
        .overview-left
            flex 0 0 137px
            width 137px
            border-right 1px solid rgba(7, 17, 27, 0.1)
            text-align center
            padding 6px 0
            @media only screen and (max-width: 320px)
                flex 0 0 120px
                width 120px
            .score
                line-height 28px
                margin-bottom 6px
                font-size 24px
                color rgb(255, 153, 0)
            .title
                line-height 12px
                margin-bottom 6px
                font-size 12px
                color rgb(7, 17, 27)
            .rank
                line-height 10px
                font-size 10px
                color rgb(147, 153, 159)
        .overview-right
            flex 1
            padding 6px 24px
            @media only screen and (max-width: 320px)
                padding-left 6px
                padding-right 0
            .score-wrapper
                margin-bottom 8px
                .title
                    display inline-block
                    vertical-align top
                    line-height 18px
                    font-size 12px
                    color rgb(7, 17, 27)
                .star
                    display inline-block
                    vertical-align top
                    margin 0 12px
                .score
                    display inline-block
                    vertical-align top
                    line-height 18px
                    font-size 12px
                    color rgb(255, 153, 0)
            .delivery-wrapper
                font-size 12px
                .title
                    line-height 18px
                    color rgb(7, 17, 27)
                .delivery
                    color rgb(147, 153, 159)
                    margin-left 12px
    .rating-wrapper
        padding 0 18px
        .rating-item
            display flex
            padding 18px
            border-1px(rgba(7, 17, 27, .1))
            .avatar
                flex 0 0 28px
                width 28px
                margin-right 12px
                img
                    border-radius 50%
            .content
                position relative
                flex 1
                .name
                    margin-bottom 4px
                    line-height 12px
                    font-size 10px
                    color rgb(7, 17, 27)
                .star-wrapper
                    margin-bottom 6px
                    .star
                        display inline-block
                        vertical-align top
                        margin-right 6px
                    .delivery
                        display inline-block
                        vertical-align top
                        line-height 12px
                        font-size 10px
                        color rgb(147, 153, 159)
                .text
                    line-height 18px
                    font-size 12px
                    color rgb(7, 17, 27)
                    margin-bottom 8px
                .recommend
                    line-height 16px
                    .icon, .item
                        display inline-block
                        margin 0 8px 4px 0
                        font-size 9px
                    .icon
                        font-size 12px
                        color rgb(0, 160, 220)
                    .item
                        padding 0 6px
                        border 1px solid rgba(7, 17, 27, .1)
                        border-radius 1px
                        background #fff
                .time
                    position absolute
                    top 0
                    right 0
                    line-height 12px
                    font-size 10px
                    color rgb(147, 153, 159)
        .no-rating
            padding 16px 0
            font-size 12px
            color rgb(147, 153, 159)
            text-align center
</style>
