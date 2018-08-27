<template>
    <div class="did-wrap" @dblclick="edit">
        <i class="fa fa-close"  @click="$emit('delete')" v-if="editable"></i>
        <template v-for="chip of matches" v-if="editing === false">
            <tag v-if="tagRE.test(chip)">{{chip.replace(tagRE, '$1')}}</tag>
            <span v-else>{{chip}}</span>
        </template>
        <input ref="input" v-if="editing === true" :value="value" @blur="editing = false" @keyup.esc="editing = false" @keyup.enter="$emit('modify', $event.target.value) && (editing = false)" >
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
                editing: false,
                tagRE
            }
        },
        methods: {
            edit () {
                if (this.editable) {
                    this.editing = true
                    this.$nextTick(() => this.$refs.input.focus())
                }
            }
        },
        computed: {
            matches () {
                return this.value && this.value.trim().match(splitRE)
            }
        },
        mounted () {
            //
        }
    }
</script>
<style lang='scss'>
    .did-wrap {
        line-height: 26px;
        i {
            width: 26px;
            font-size: 18px;
            padding: 4px;
            vertical-align: top;
            text-align: center;
            cursor: pointer;
        }
        span {
            padding: 3px 0;
        }
        input {
            padding: 0 6px;
            font-size: 16px;
            border: 1px solid #aaa;
        }
    }
</style>
