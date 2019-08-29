<template>
    <div class="shopcart">
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

        <!-- 购物车小球动画控件 -->
        <div class="ball-container">
            <div v-for="(ball, index) in balls" :key="index">
                <transition
                    @before-enter="beforeDrop"
                    @enter="dropping"
                    @after-enter="afterDrop"
                >
                    <div v-show="ball.show" class="ball">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>

const BALL_LEN = 5;
const INNER_CLS = 'inner-hook'

function createBalls() {
    let balls = [];
    for(let i = 0; i < BALL_LEN; i++) {
        balls.push({ show: false })
    }
    return balls;
}

export default {
    props: {
        selectFoods: {
            type: Array,
            default() { // type为Array或者Object时，default应该是一个函数，返回默认值
                return [{
                    count: 1,
                    price: 12
                }]
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 20
        }
    },
    data() {
        return {
            balls: createBalls(), // 创建小球
            dropBalls: [], // 保留所有在做动画的小球
        }
    },
    computed: {
        // 商品总价
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach(food => {
                total += food.price * food.count;
            });

            return total;
        },
        // 商品总数
        totalCount() {
            let count = 0;
            this.selectFoods.forEach(food => {
                count += food.count;
            });

            return count;
        },
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
        // 小球下落方法
        drop(el) {
            // console.log(el);
            // 获取所有小球中，第一个show=false的小球
            for(let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    // 显示小球，触发动画的关键
                    ball.show = true;
                    // 保存元素
                    ball.el = el;
                    // 保留该小球
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        // 动画开始前
        beforeDrop(el) {
            // 把所有show=true的小球拿出来做动画
            let count = this.balls.length;
            while(count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    // 获取动画起始位置与终点位置的(x/y)的差值
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 24);

                    // 手动控制显隐
                    el.style.display = 'block';
                    // 设置动画起始 y轴位置
                    el.style.transform = el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
                    // 设置动画起始 x轴位置
                    let inner = el.getElementsByClassName(INNER_CLS)[0];
                    inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
                }
            }
        },
        // 动画中
        dropping(el, done) {
            // 手动触发浏览器重绘
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;

            // 设置动画终点 y轴位置
            el.style.transform = el.style.webkitTransform = 'translate3d(0, 0, 0)';
            // 设置动画终点 x轴位置
            let inner = el.getElementsByClassName(INNER_CLS)[0];
            inner.style.transform = inner.style.webkitTransform = 'translate3d(0, 0, 0)';

            el.addEventListener('transitionend', done);
        },
        // 动画完成后
        afterDrop(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        }
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
    .ball-container
        .ball
            position: fixed
            left: 32px
            bottom: 22px
            z-index: 200
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
            .inner
                width: 16px
                height: 16px
                border-radius: 50%
                background: rgb(0, 120, 220)
                transition: all 0.4s linear
</style>
