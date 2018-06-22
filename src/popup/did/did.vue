<template>
    <div class="did-wrap">
        <template v-for="chip of matches">
            <tag v-if="tagRE.test(chip)">{{chip.replace(tagRE, '$1')}}</tag>
            <span v-else>{{chip}}</span>
        </template>
        <button @click="$emit('delete')" v-if="editable"><i class="fa fa-close"></i></button>
    </div>
</template>
<script type='text/ecmascript-6'>
    import {tagRE} from './api'
    import tag from './tag.vue'

    const splitRE = /(:?{{([^}}]*?)}}|.)/g
    export default {
        props: ['value', 'editable'],
        components: {tag},
        data () {
            return {
                parsed: '',
                tagRE
            }
        },
        computed: {
            matches () {
                return this.value.trim().match(splitRE)
            }
        },
        mounted () {
            //
        }
    }
</script>
<style lang='scss'>
    .did-wrap {
        display: flex;
        span {
            padding: 3px 0;
        }
    }
</style>
