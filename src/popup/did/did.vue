<template>
    <div class="did-wrap" @dblclick="edit">
        <i class="fa fa-close" @click="$emit('delete')" v-if="editable"></i>
        <template v-for="(chip, index) of matches">
            <tag v-if="tagRE.test(chip) && editing === false" :key="index" :tag="chip.replace(tagRE, '$1')"></tag>
            <span v-else-if="editing === false" :key="index" >{{chip}}</span>
        </template>
        <input ref="input" v-if="editing === true" :value="value" @blur="editing = false" @keyup.esc="editing = false"
               @keydown="keydown">
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
      },
      keydown (event) {
        if (event.keyCode === 13 && !event.isComposing) {
          this.$emit('modify', event.target.value);
          this.editing = false;
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
        flex-grow: 1;
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
            width: calc(100% - 30px);
            padding: 0 6px;
            font-size: 16px;
            border: 1px solid #aaa;
        }
    }
</style>
