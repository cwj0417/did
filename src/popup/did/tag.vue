<template>
    <span class="did-tag-item" :style="{background: tagInfo[tag] ? tagInfo[tag].bg : '#333'}">
        {{tag}}
    </span>
</template>
<script type='text/ecmascript-6'>
    export default {
        data () {
            return {
                tag: this.$slots.default[0].text
            }
        },
        computed: {
            tagInfo () {
                return this.$store.state.tags
            }
        },
        mounted () {
            this.$store.dispatch('getTag', this.tag)
        }
    }
</script>
<style lang='scss'>
    .did-tag-item {
        color: #fff;
        border-radius: 3px;
        padding: 3px;
        cursor: pointer;
    }
</style>
