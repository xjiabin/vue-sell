<template>
    <transition
        name="fade"
        @after-leave="afterLeave"
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
            mask: {
                type: Boolean,
                default: true
            },
            duration: {
                type: Number,
                default: 2000
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
                setTimeout(() => {
                    this.showToast = false;
                }, this.duration);
            },
            afterLeave() {
                this.remove();
                this.$emit('transitionend')
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
    z-index 999
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
        background rgba(7, 17, 27, 0)
    .toast-container
        position absolute
        top 50%
        left 50%
        max-width 200px
        transform translate(-50%, -50%)
        background rgba(31, 35, 39, 0.9);
        padding 8px 15px
        border-radius 10px
        p
            display: table;
            width: 100%;
            height: 100%;
            text-align: center;
            color: #fff;
            font-size 12px
            word-break: break-word;
</style>
