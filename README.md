# vue-sell

## 1px边框
> 给需要添加边框的元素添加一个伪类`after`，把`after`设置成一条线，然后在不同 dpr 的设备中通过`media query`给这个线进行缩放

```stylus
border-1px($color = #ccc, $radius = 2PX, $style = solid)
    position: relative
    &::after
        content: ""
        pointer-events: none
        display: block
        position: absolute
        left: 0
        top: 0
        transform-origin: 0 0
        border-bottom: 1PX $style $color
        border-radius: $radius
        box-sizing border-box
        width 100%
        height 100%
        @media (min-resolution: 2dppx)
            width: 200%
            height: 200%
            border-radius: $radius * 2
            transform: scale(.5)
        @media (min-resolution: 3dppx)
            width: 300%
            height: 300%
            border-radius: $radius * 3
            transform: scale(.333)
```

## @2x和@3x背景图

```styl
bg-image($url, $ext = ".png")
    background-image: url($url + "@2x" + $ext)
    @media (min-resolution: 3dppx)
        background-image: url($url + "@3x" + $ext)

```

## 星星评分组件
> 星星的显示与评分，星星的尺寸有关

为了组件的可扩展性，根据传入的评分，尺寸来动态显示星星评分

```js
props: {
    size: {
        type: Number
    },
    score: {
        type: Number
    }
},
```

通过`score`与`size`获取样式`starType`
```js
computed: {
    starType() {
        return 'star-' + this.size
    }
},
```

通过`score`获取星星对象`itemClasses`
```js
itemClasses() {
    let result = [];
    // 向下取0.5的倍数
    let score = Math.floor(this.score * 2) / 2;
    // 判断是否有半星
    let hasDecimal = score % 1 !== 0;
    // 获取全星的个数
    let integer = Math.floor(score);

    // 添加全星
    for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
    }
    // 如果有半星，添加半星（半星只会有一个）
    if (hasDecimal) {
        result.push(CLS_HALF);
    }
    // 补齐星星个数（若星星个数不足5个）
    while(result.length < LENGTH) {
        result.push(CLS_OFF);
    }

    return result;
}
```

完整代码
```html
<template>
    <div class="star" :class="starType">
        <span v-for="(item,index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
const LENGTH = 5; // 星星个数
const CLS_ON = 'on'; // 全星
const CLS_HALF = 'half'; // 半星
const CLS_OFF = 'off'; // 无星

export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType() {
            return 'star-' + this.size
        },
        itemClasses() {
            let result = [];
            // 向下取0.5的倍数
            let score = Math.floor(this.score * 2) / 2;
            // 判断是否有半星
            let hasDecimal = score % 1 !== 0;
            // 获取全星的个数
            let integer = Math.floor(score);

            // 添加全星
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }
            // 如果有半星，添加半星（半星只会有一个）
            if (hasDecimal) {
                result.push(CLS_HALF);
            }
            // 补齐星星个数（若星星个数不足5个）
            while(result.length < LENGTH) {
                result.push(CLS_OFF);
            }

            return result;
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin';

.star
    font-size 0
    .star-item
        display inline-block
        background-repeat no-repeat
    &.star-48
        .star-item
            width 20px
            height 20px
            margin-right 22px
            background-size 20px 20px
            &:last-child
                margin-right 0
            &.on
                bg-image('star-48_on')
            &.half
                bg-image('star-48_half')
            &.off
                bg-image('star-48_off')
    &.star-36
        .star-item
            width 15px
            height 15px
            margin-right 6px
            background-size 15px 15px
            &:last-child
                margin-right 0
            &.on
                bg-image('star-36_on')
            &.half
                bg-image('star-36_half')
            &.off
                bg-image('star-36_off')
    &.star-24
        .star-item
            width 10px
            height 10px
            margin-right 3px
            background-size 10px 10px
            &:last-child
                margin-right 0
            &.on
                bg-image('star-24_on')
            &.half
                bg-image('star-24_half')
            &.off
                bg-image('star-24_off')
</style>
```

## 使用 better-scroll 滚动页面
[better-scroll官网](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/)

html结构
```html
<div class="wrapper">
    <ul class="content">
        <li>...</li>
        <li>...</li>
        ...
    </ul>
    <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
</div>
```
上面的代码中 better-scroll 是作用在外层 wrapper 容器上的，滚动的部分是 content 元素。这里要注意的是，better-scroll 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。

最简单的初始化代码如下：

```js
import BScroll from 'better-scroll'
let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper)
```

### 注意

1. better-scroll 滚动原理: 一个**固定高度的容器**作为视口`wrapper`, 里面嵌套一个**由内容撑开高度**的容器`list`, 如果需要滚动, 则里面`list`容器的高度必须要超出视口`wrapper`高度; ( 宽度亦然 ). 否则无法被滚动

2. better-scroll 强依赖于 DOM 结构, 必须在页面 DOM 结构没有被加载完成(后端数据加载完成)之后才能去初始化 better-scroll, 否则无法被滚动.

所以初始化 better-scroll 的时机有以下几个: 


- 1. 可以在**成功获取数据之后**, 在 `$nextTick` 中初始化

如: 
 ```js
async create() {
    // 获取数据
    let data = await getGoods();

    this.$nextTick(() => {
        // 在此处初始化better-scroll
        this._initScroll();
    })
}
 ```

- 2. 如果数据通过 `props` 接收, 可以在`mounted`中初始化

如: 
```js
props: {
    'seller': {
        type: Object
    }
},
mounted() {
    this.$nextTick(() => {
        // 在此处初始化
        this._initScroll();
    })
},

```

但是, 如果是通过props接收的数据, 并不能保证在组件mounted 的时候, 数据就已经接收到了.

所以需要通过watcher来监听数据的变化, 从而进行初始化better-scroll的操作

```js
watch() {
    seller(newV) {
        this.$nextTick(() => {
            this._initScroll();
        })
    }
}
```

### better-scroll 滚动嵌套使用

有时候我们使用 `better-scroll` 在某个方向模拟滚动的时候，希望在另一个方向保留原生的滚动（比如轮播图，我们希望横向模拟横向滚动，而纵向的滚动还是保留原生滚动

这时候就可以设置 `eventPassthrough` 为 `vertical`；
相应的，如果我们希望保留横向的原生滚动，可以设置 `eventPassthrough` 为 `horizontal`）。

如: 在纵向滚动的页面中嵌套一个横向滚动的区域

> 但是在这里  内容的宽度必须大于视口的宽度, 否则无法滚动

```js
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
```

### 初始化

```html
<!-- 左侧列表 -->
<div class="menu-wrapper" ref="menuWrapper">
    <ul>
        ...
    </ul>
</div>

<!-- 右侧内容 -->
<div class="foods-wrapper" ref="foodsWrapper">
    <ul>
        ...
    </ul>
</div>
```
```js
mounted () {
    this.$nextTick(() => {
        this._initScroll();
    });
},
methods: {
    _initScroll() {
        // 初始化menu的滚动
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {});
        // 初始化food的滚动
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {});

        console.log(this.menuScroll);
    }
},
```

### 左右联动效果
> 1. 点击左边菜单，右边内容滚动到对应的区域
> 2. 滚动右边区域，高亮左边对应按钮

依赖`BScroll`的滚动事件，判断当前`Y`值是在哪个区间，左侧菜单就对应显示在哪个区间

- 记录每个区间的高度
```js
// 计算区间高度
_calculateHeight() {
    // 获取区间元素（该区间包括了区间标题以及该区间下所有的食品：热销榜、单人精彩套餐...）
    let foodList = this.$refs.foodsList;

    let height = 0;
    this.listHeight.push(height);
    for(let i = 0; i < foodList.length; i++) {
        // 获取每个foodList
        let item = foodList[i];
        // 获取高度并累加
        height += item.clientHeihgt;
        this.listHeight.push(height);
    }
}
```

这里有个问题，就是要在什么时候去调用这个计算区间高度的方法

如果在生命周期函数`mounted`中调用的话，是无法获取到这些个元素的，原因是因为数据获取是异步操作，如果要计算这些根据数据动态生成的元素，需要在获取数据之后的回调函数中进行

```js
async created () {
    this.goods = await getGoods();

    // 在此处初始化BScroll，并且计算高度
    this.$nextTick(() => {
        // 初始化Bscroll
        this._initScroll();
        // 计算区间高度
        this._calculateHeight();
    });
},
mounted () {
    // 不能在mounted中调用计算高度的方法，无法获取foodList.length
    // 原因：因为数据是异步渲染的，需要在获取数据之后的回调函数中进行操作
    // this.$nextTick(() => {
    //     this._calculateHeight();
    // });
},
```

- 记录右侧内容滚动的Y值

通过`better-scroll`的api接口实时监听滚动的Y值

```js
this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
    probeType: 3 // 实时派发 scroll 事件
});

// 监听滚动，获取y值
this.foodsScroll.on('scroll', pos => {
    this.scrollY = Math.abs(Math.round(pos.y));
})
```

- 左侧高亮

根据`listHeight`中的区间索引来判断，左侧哪个菜单需要高亮

```js
computed: {
    currentIndex() {
        // 遍历每个区间高度
        for (let i = 0; i < this.listHeight.length; i++) {
            // 获取区间的上限和下限
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];

            // 1. 如果遍历到最后一个（i==this.listHeight.length），说明当前是最后一个区间的上限。
            // 2. 或者当前滚动的y值落在这个区间之内（height1 < y < height2）时，当前区间索引则为左侧菜单高亮的索引
            if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
                // 返回当前索引
                return i
            }
        }
    }
}
```

当`currentIndex`等于左侧当前菜单时，高亮该菜单按钮

```html
<li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{ 'current': currentIndex == index }">
...
</li>
```

## 购物车小球动画

### 定义动画小球

定义多几个小球，以供频繁点击

```js
balls: [ // 小球数组
    {
        show: false // 控制该小球的显隐状态
    },
    {
        show: false // 控制该小球的显隐状态
    },
    {
        show: false // 控制该小球的显隐状态
    },
    {
        show: false // 控制该小球的显隐状态
    },
    {
        show: false // 控制该小球的显隐状态
    }
]
```

### 获取点击的购物车控件的位置，并通过goods组件派发给shopcart组件

`cartcontrol.vue` 派发`add`事件
```js
// 添加购物车
addCart(e) {
    if (!this.food.count) {
        // this.food.count = 1
        // 动态添加属性
        this.$set(this.food, 'count', 1)
    } else {
        this.food.count += 1
    }

    // 派发事件
    this.$emit('add', e.target)
},
```

`goods.vue` 接收`add`事件
```html
<cart-control :food="food" @add="addCart" />

<script>
// ...
addCart(target) {
    // 传递给shopcart组件
    this.$refs.shopcart.drop(target);
},
// ...
</script>
```

`shopcart.vue` 接收`target`
```js
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
            this.dropBall.push(ball);
            return;
        }
    }
}

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

```


### 将购物车小球抽取成一个组件，然后使用全局组件的方式调用（类似于cube-ui的createAPI）

- 创建create方法

```js
import Vue from 'vue';

/**
 * 创建全局(js调用)组件的方法
 * @param {*} Component 组件对象
 * @param {*} props 需要传递给组件的参数
 */
function create(Component, context) {

    // 创建新的Vue实例
    // 在文档之外渲染并且随后挂载
    const instance = new Vue({
        // render 函数的使用：https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6
        render: h => h(Component, context)
    }).$mount(); // $mount() 如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。

    // 使用原生 DOM API 把它插入文档中
    document.body.appendChild(instance.$el);

    // 获取当前实例的直接子组件
    const component = instance.$children[0];
    
    // 挂载销毁实例的方法
    component.remove = function() {
        instance.$destroy();
        document.body.removeChild(instance.$el);
    }

    // 返回该组件
    return component;
}

export default create;

```

- 创建ball组件

```html
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

```

- 使用create方法动态创建ball组件

`goods.vue`

```html

<!-- ... -->
    <!-- 购物车控件 -->
    <div class="carcontrol-wrapper">
        <cart-control :food="food" @add="addCart" />
    </div>
<!-- ... -->

<script>

    import Ball from '@/components/Ball/Ball';
    import create from '@/services/create';
    // ...
    addCart(el) {
        const props = { el }
        // 创建动画
        const anim = create(Ball, { props });
        // 开始动画
        anim.start();

        // 动画结束销毁实例
        anim.$on('transitionend', () => {
            anim.remove();
        });
    },
    // ...
</script>

```

## 由于图片加载完成, 高度变化发生的内容抖动问题

图片宽高相等

```html
<div class="image-header">
    <img :src="food.image">
</div>
```

先将包裹层 `image-header`高度设置为0
```css
.image-header {
    position: relative;
    width: 100%; /* 图片宽度与屏幕宽度一致 */
    height: 0;
    padding-top: 100%; /* 如果设置padding-top:100% 是根据容器的宽度进行计算的 所以看起来就像是宽高一致的容器了 */
}
/* 然后将容器下的img标签设置绝对定位,宽高都等于容器 */
.image-height img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```
