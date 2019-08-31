<template>
    <transition name="fade">
        <popup
            v-show="visible"
            position="bottom"
            z-index="-1"
            @mask-click="hide"
            type="shopcart-list"
        >
            <template>
                <transition
                    name="fold"
                    @after-leave="afterLeave"
                >
                    <!-- 购物车列表 -->
                    <div v-show="visible">
                        <!-- 标题 -->
                        <div class="list-header">
                            <h1 class="title">购物车</h1>
                            <span class="empty" @click="empty">清空</span>
                        </div>
                        <!-- 列表 -->
                        <div class="list-content" ref="listContent">
                            <ul>
                                <li v-for="(food, index) in shopcart" :key="index" class="food">
                                    <!-- 名称 -->
                                    <span class="name">{{ food.name }}</span>
                                    <!-- 价格 -->
                                    <div class="price">
                                        <span>￥{{ food.price * food.count }}</span>
                                    </div>
                                    <!-- 购物车控件 -->
                                    <div class="cartcontrol-wrapper">
                                        <cart-control :food="food" @add="addCart" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </template>
        </popup>
    </transition>
</template>

<script>
import CartControl from '@/components/CartControl/CartControl.vue';
import Popup from '@/components/Popup/Popup.vue';
import VDialog from '@/components/Dialog/Dialog.vue';
import popupMixin from '@/common/mixin/popup';
import ballMixin from '@/common/mixin/ballAnim';
import { mapState, mapGetters, mapActions } from 'vuex';

import create from '@/services/create';
import Toast from '@/components/Toast/Toast';

import BScroll from 'better-scroll';

const EVENT_SHOW = 'show';
const EVENT_HIDE = 'hide';
const EVENT_LEAVE = 'leave';

export default {
    mixins: [popupMixin, ballMixin],
    computed: {
        ...mapState(['shopcart']),
        ...mapGetters(['totalCount']),
    },
    created () {
        this.$on(EVENT_SHOW, () => {
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.listContent, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            });
        });
    },
    methods: {
        ...mapActions(['emptyCart']),
        afterLeave() {
            this.$emit(EVENT_LEAVE)
        },
        clickMask() {
            this.$emit(EVENT_HIDE)
            this.hide()
        },
        empty() {

            const dialog = create(VDialog, {
                props: {
                    msg: '是否清空购物车'
                }
            });
            dialog.show();

            dialog.$on('confirm', () => {
                this.emptyCart();

                const toast = create(Toast, {
                    props: {
                        msg: '操作成功'
                    }
                });
                toast.show();

                dialog.hide();
            });
            dialog.$on('cancel', () => {
                dialog.hide();
            });
        }
    },
    components: {
        CartControl, Popup
    },
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin";

.shopcart-list
    bottom 48px
    &.fade-enter, &.fade-leave-active
        opacity: 0
    &.fade-enter-active, &.fade-leave-active
        transition: all .3s ease-in-out
    .fold-enter, .fold-leave-active
        transform translate3d(0, 100%, 0)
    .fold-enter-active, .fold-leave-active
        transition all .3s ease-in-out
    .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, .1)
        font-size 14px
        .title
            float left
            color rgb(7, 17, 27)
        .empty
            color rgb(0, 160, 220)
            float right
    .list-content
        padding 0 18px
        max-height 300px
        overflow hidden
        background #fff
        .food
            position relative
            padding 24px 0
            box-sizing border-box
            border-1px(rgba(7, 17, 27, .1))
            .name
                line-height 24px
                font-size 14px
                color rgb(7, 17, 27)
            .price
                position absolute
                right 90px
                bottom 12px
                line-height 24px
                font-size 14px
                font-weight 700
                color rgb(240, 20, 20)
            .cartcontrol-wrapper
                position absolute
                right 0
                bottom 6px
</style>