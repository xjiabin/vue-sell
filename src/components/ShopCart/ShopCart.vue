<template>
    <div class="shopcart" @click="toggleList">
        <div class="content">
            <!-- 左边 -->
            <div class="content-left">
                <!-- 购物车logo -->
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight': totalCount > 0}">
                        <i class="icon icon-shopping_cart"></i>
                    </div>
                    <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
                </div>
                <!-- 价格 -->
                <div class="price" :class="{'highlight': totalPrice > 0}">￥{{ totalPrice }}</div>
                <!-- 配送费描述 -->
                <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>

            </div>
            <!-- 右边 起送/下单按钮 -->
            <div class="content-right">
                <div class="pay" :class="payClass">{{ payDesc }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ShopCartList from '@/components/ShopCartList/ShopCartList';

export default {
    props: {
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 20
        }
    },
    computed: {
        // 购物车
        ...mapState(['shopcart']),
        // 商品总数   商品总价
        ...mapGetters(['totalCount', 'totalPrice']),

        // 结算按钮文字描述
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice
                return `还差￥${diff}起送`;
            } else {
                return '去结算'
            }
        },
        // 结算按钮
        payClass() {
            return (this.totalPrice >= this.minPrice) ? 'enough' : 'not-enough'
        }
    },
    methods: {
        toggleList() {
            console.log(1);
        }
    },
    components: {
        ShopCartList,
    },
}
</script>

<style lang="stylus" scoped>
.shopcart
    position fixed
    z-index 50
    left 0
    bottom 0
    width 100%
    height 48px
    .content
        display flex
        background #141d27
        color rgba(255, 255, 255, .4)
        .content-left
            flex 1
            .logo-wrapper
                display inline-block
                vertical-align top
                position relative
                top -10px
                margin 0 12px
                padding 6px
                width 56px
                height 56px
                box-sizing border-box
                border-radius 50%
                background #141d27
                .logo
                    width 100%
                    height 100%
                    border-radius 50%
                    text-align center
                    background #2b343c
                    &.highlight
                        background rgb(0, 160, 220)
                        .icon
                            color #fff
                    .icon
                        line-height 44px
                        font-size 24px
                        color #80858a
                .num
                    position absolute
                    top 0
                    right 0
                    width 24px
                    height 16px
                    line-height 16px
                    text-align center
                    border-radius 16px
                    font-size 9px
                    font-weight 700
                    color #fff
                    background rgb(240, 20, 20)
                    box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)
            .price
                display inline-block
                vertical-align top
                margin-top 12px
                line-height 24px
                box-sizing border-box
                padding-right 12px
                border-right 1px solid rgba(255, 255, 255, .1)
                font-size 16px
                font-weight 700
                &.highlight
                    color #fff
            .desc
                display inline-block
                vertical-align top
                margin 12px 0 0 12px
                line-height 24px
                box-sizing border-box
                font-size 10px
        .content-right
            flex 0 0 105px
            width 105px
            .pay
                height 48px
                line-height 48px
                text-align center
                font-size 12px
                font-weight 700
                &.not-enough
                    background #2b333b
                &.enough
                    background #00b43c
                    color #fff

</style>
