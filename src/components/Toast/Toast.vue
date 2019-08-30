<template>
    <transition
        name="fade"
        @after-leave="leave"
    >
        <div class="toast" v-show="showToast">
            <div class="toast-mask" v-show="mask"></div>
            <div class="toast-container">
                <div class="toast-icon" v-show="icon">
                    <i></i>
                </div>
                <div class="toast-content">
                    <p>{{ msg }}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            icon: {
                type: String,
                default: ''
            },
            msg: {
                type: String,
                default: 'toast'
            },
        },
        data() {
            return {
                showToast: false
            }
        },
        methods: {
            show() {
                this.showToast = true;
            },
            leave() {
                this.$emit('transitionend');
            }
        },
    }
</script>

<style lang="stylus" scoped>
.toast
    &.fade-enter, &.fade-leave-active
        opacity 0
    &.fade-enter-active, &.fade-leave-active
        transition all .4s linear
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    width 100%
    height 100%
    .toast-mask
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background rgba(7, 17, 27, .1)
    .toast-container
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        background rgb(7, 17, 27)
        padding 20px 30px
        & > p
            display table
            width 100%
            height 100%
            text-align center
</style>
