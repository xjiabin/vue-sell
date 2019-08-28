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

