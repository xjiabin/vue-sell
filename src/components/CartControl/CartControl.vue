<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count > 0"  @click="decreaseCart">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
        <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

const EVENT_ADD = 'add';

export default {
    /**
     * 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行
     * 
     * 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，
     * 在子组件中改变这个对象或数组本身将会影响到父组件的状态。
     */
    props: {
        food: {
            type: Object
        },
    },
    methods: {
        ...mapActions({
            addToCart: 'addCart',
            'minunsCart': 'minunsCart'
        }),

        // 添加购物车
        addCart(e) {
            this.addToCart(this.food);

            this.$emit(EVENT_ADD, e.target)
        },
        // 减少购物车
        decreaseCart() {
            this.minunsCart(this.food);
        }
    },
}
</script>

<style lang="stylus" scoped>

.cartcontrol
    .cart-decrease
        display inline-block
        padding 6px
        .inner
            // transform: rotate(0), 必须要 display:inline-block / block
            display inline-block
            line-height 24px
            font-size 24px
            color rgb(0, 160, 220)
            transition: all 0.4s linear
            transform: rotate(0)
        &.move-enter, &.move-leave-to
            transform translate3d(24px, 0, 0)
            opacity 0
            .inner
                transform rotate(180deg)
        &.move-enter-active, &.move-leave-active
            transition all .4s linear

    .cart-count
        display inline-block
        vertical-align top
        width 12px
        padding-top 6px
        line-height 24px
        text-align center
        font-size 10px
        color rgb(147, 153, 159)
    .cart-add
        display inline-block
        padding 6px
        line-height 24px
        font-size 24px
        color rgb(0, 160, 220)
</style>
