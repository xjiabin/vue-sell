const ALL = 2;

export default {
    data() {
        return {
            selectType: ALL,
            onlyContent: true,
        }
    },
    computed: {
        computedRatings() {
            let ret = [];
            this.ratings && this.ratings.forEach(rating => {
                // 如果是只看有内容的评价, 没有文本
                if (this.onlyContent && !rating.text) return;

                // 如果选择的评价类型是全部, 或者选择的评价类型 == 当前评价的类型
                if (this.selectType === ALL || rating.rateType === this.selectType) {
                    ret.push(rating)
                }
            });

            return ret;
        }
    },
    methods: {
        // 切换评价选项
        onSelect(_type) {
            this.selectType = _type;
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        },
        // 切换只看有内容的评价
        onToggle() {
            this.onlyContent = !this.onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        },
    },
}
