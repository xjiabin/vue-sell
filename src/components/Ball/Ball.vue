<template>
    <!-- 购物车小球动画控件 -->
    <div class="ball-container">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
            </div>
        </transition>
    </div>
</template>

<script>
const INNER_CLS = 'inner-hook';

export default {
    name: 'ball',
    props: ['el'], // 将点击的加购按钮传递进来
    data() {
        return {
            ball: {
                // 购物车小球
                show: false, // 控制小球显示
                el: this.el // 点击的元素（商品中的“加号”元素）
            }
        };
    },
    methods: {
        // 小球下落方法
        start() {
            this.ball.show = true;
        },
        // 动画开始前
        beforeEnter(el) {
            let dom = this.ball.el;

            // 获取动画起始位置与终点位置的(x/y)的差值
            let rect = dom.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 24);

            // 手动控制显隐
            el.style.display = 'block';
            // 设置动画起始 y轴位置
            el.style.transform = el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            // 设置动画起始 x轴位置
            let inner = el.getElementsByClassName(INNER_CLS)[0];
            inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
        },
        // 动画中
        enter(el, done) {
            // 手动触发浏览器重绘
            /* eslint-disable no-unused-vars */
            this.rf = el.offsetHeight;

            // 设置动画终点 y轴位置
            el.style.transform = el.style.webkitTransform = 'translate3d(0, 0, 0)';
            // 设置动画终点 x轴位置
            let inner = el.getElementsByClassName(INNER_CLS)[0];
            inner.style.transform = inner.style.webkitTransform = 'translate3d(0, 0, 0)';

            el.addEventListener('transitionend', done);
        },
        // 动画完成后
        afterEnter(el) {
            this.ball.show = false;
            el.style.display = 'none';

            // 派发动画结束事件
            this.$emit('transitionend');
        }
    },
}
</script>

<style lang="stylus" scoped>
.ball-container
    .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 20000
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 120, 220)
            transition: all 0.4s linear
</style>