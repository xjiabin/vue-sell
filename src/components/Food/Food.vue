<template>
    <transition name="move">
        <div class="food" v-show="showFlag" ref="foodWrapper">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <!-- 返回按钮 -->
                    <div class="back" @click="hide">
                        <i class="icon icon-arrow_lift"></i>
                    </div>
                </div>
                <!-- 商品内容 -->
                <div class="content">
                    <h1 class="title">{{ food.name }}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{ food.sellCount }}</span>
                        <span class="rating">好评率{{ food.rating }}</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{ food.price }}</span>
                        <span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                    </div>
                    <!-- 购物车控件 -->
                    <div class="cartcontrol-wrapper">
                        <cart-control :food="food" @add="addCart" />
                    </div>
                    <!-- 加入购物车 -->
                    <transition name="fade">
                        <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst($event)">
                            加入购物车
                        </div>
                    </transition>
                </div>
                <!-- 分割线 -->
                <split v-show="food.info" />
                <!-- 商品信息 -->
                <div class="info" v-show="food.info">
                    <h1 class="title">商品介绍</h1>
                    <p class="text">{{ food.info }}</p>
                </div>
                <!-- 分割线 -->
                <split v-show="food.info" />
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <rating-select
                        :select-type="selectType"
                        :only-content="onlyContent"
                        :desc="desc"
                        :ratings="ratings"
                        @selected="onSelect"
                        @switch="onToggle" />
                </div>
                <!-- 评价列表 -->
                <div class="rating-wrapper">
                    <!-- 有评价 -->
                    <ul v-if="computedRatings && computedRatings.length">
                        <li v-for="(rating, index) in computedRatings" :key="index" class="rating-item">
                            <!-- 用户 -->
                            <div class="user">
                                <span class="name">{{ rating.username }}</span>
                                <img :src="rating.avatar" class="avatar" width="12" height="12">
                            </div>
                            <!-- 时间 -->
                            <div class="time">{{ rating.rateTime | formatDate }}</div>
                            <!-- 内容 -->
                            <p class="text">
                                <i class="icon" :class="rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down'"></i>
                                {{ rating.text }}
                            </p>
                        </li>
                    </ul>
                    <!-- 无评价 -->
                    <div class="no-rating" v-else>暂无评价</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import RatingSelect from '@/components/RatingSelect/RatingSelect.vue';
    import CartControl from '@/components/CartControl/CartControl.vue';
    import Split from '@/components/Split/Split.vue';

    import ballAnim from '@/common/mixin/ballAnim';
    import rating from '@/common/mixin/rating';
    import format from '@/common/mixin/format';
    import BScroll from 'better-scroll';
    import { mapActions } from 'vuex';

    const POSITIVE = 0; // 正向
    const NEGATIVE = 1; // 负向
    const ALL = 2; // 全部

    export default {
        mixins: [ballAnim, rating, format],
        props: {
            food: {
                type: Object
            },
        },
        data() {
            return {
                showFlag: false,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        computed: {
            ratings() {
                return this.food.ratings; 
            }
        },
        methods: {
            ...mapActions({ 'addToCart': 'addCart' }),
            addFirst(event) {
                // 阻止快速点击, 防止动画出现问题
                if (this.food.count > 0) return;

                this.addToCart(this.food);
                this.addCart(event.target);
            },
            show() {
                this.showFlag = true;

                // 每次显示都保持初始化状态
                this.selectType = ALL;
                this.onlyContent = true;

                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.foodWrapper, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                })
            },
            hide() {
                this.showFlag = false;
            }
        },
        components: {
            CartControl, Split,
            RatingSelect
        },
    }
</script>

<style lang="stylus" scoped>
    @import '../../common/stylus/mixin';

    .food
        position fixed
        left 0
        top 0
        bottom 48px
        z-index 150
        width 100%
        background #fff
        &.move-enter, &.move-leave-active
            transform translate3d(100%, 0, 0)
        &.move-enter-active, &.move-leave-active
            transition all .4s linear
        .image-header
            position relative
            width 100%
            height 0
            padding-top 100%
            img
                position absolute
                top 0
                left 0
                width 100%
                height 100%
            .back
                position absolute
                top 10px
                left 0px
                .icon
                    display block
                    padding 10px
                    font-size 20px
                    color #fff
        .content
            padding 18px
            position relative
            .title
                line-height 14px
                margin-bottom 8px
                font-size 14px
                font-weight 700
                color rgb(7, 17, 27)
            .detail
                height 10px
                line-height 20px
                margin-bottom 18px
                .sell-count, .rating
                    font-size 10px
                    color rgb(147, 153, 159)
                .sell-count
                    margin-right 12px
            .price
                font-weight 700
                line-height 24px
                .now
                    margin-right 8px
                    font-size 14px
                    color rgb(240, 20, 20)
                .old
                    font-size 10px
                    color rgb(147, 153, 159)
                    text-decoration-line line-through
            .cartcontrol-wrapper
                z-index 1
                position absolute
                right 12px
                bottom 12px
            .buy
                &.fade-enter, &.fade-leave-active
                    opacity 0
                &.fade-enter-active, &.fade-leave-active
                    transition all .2s linear
                z-index 2
                position absolute
                right 18px
                bottom 18px
                line-height 24px
                padding 2px 12px
                box-sizing border-box
                border-radius 12px
                background rgb(0, 160, 220)
                font-size 10px
                color #fff
        .info
            padding 18px
            .title
                line-height 14px
                margin-bottom 6px
                font-size 14px
                color rgb(7, 17, 27)
            .text
                line-height 24px
                padding 0 8px
                font-size 12px
                color rgb(77, 85, 93)
        .rating
            padding-top 18px
            .title
                line-height 14px
                margin-left 18px
                font-size 14px
                color rgb(7, 17, 27)
        .rating-wrapper
            padding 0 18px
            .rating-item
                position relative
                padding 16px 0
                border-1px(rgba(7, 17, 27, .1))
                .user
                    position absolute
                    right 0
                    top 16px
                    line-height 12px
                    .name
                        display inline-block
                        vertical-align top
                        font-size 10px
                        color rgb(147, 153, 159)
                        margin-right 6px
                    .avatar
                        display inline-block
                        vertical-align top
                        border-radius 50%
                .time
                    line-height 16px
                    margin-bottom 6px
                    font-size 10px
                    color rgb(147, 153, 159)
                .text
                    line-height 16px
                    font-size 12px
                    color rgb(7, 17, 27)
                    .icon
                        margin-right 4px
                        font-size 12px
                        line-height 16px
                        &.icon-thumb_down
                            color rgb(147, 153, 159)
                        &.icon-thumb_up
                            color rgb(0, 160, 220)
            .no-rating
                padding 16px 0
                font-size 12px
                color rgb(147, 153, 159)
                text-align center
</style>
