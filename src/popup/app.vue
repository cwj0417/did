<template>
    <div>
        <div class="app-header">
            <div class="select-module">
                <i class="fa fa-calendar" @mouseover="cur = 'Did'"></i>
            </div>
            <div class="public-input">
                <input @keyup.enter="add" v-model="input"
                       :placeholder="cur === 'Did' ? '今天做了什么?' : '准备做些什么?'">
            </div>
            <div class="select-module">
                <i class="fa fa-tasks" @mouseover="cur = 'Todos'"></i>
            </div>
        </div>
        <component :is="cur" ref="comp"></component>
    </div>
</template>
<script type='text/ecmascript-6'>
  import Did from './did'
  import Todos from './todo'

  export default {
    data () {
      return {
        cur: 'Did',
        input: ''
      }
    },
    components: {Did, Todos},
    methods: {
      add () {
        if (this.input) {
          this.$refs.comp.add(this.input)
          this.input = ''
        }
      }
    },
    mounted () {

    }
  }
</script>
<style lang='scss'>
    .app-header {
        display: flex;
        font-size: 30px;
        height: 30px;
        margin-bottom: 5px;
        .select-module {
            width: 30px;
            font-size: 20px;
            padding: 5px;
        }
        .public-input {
            margin: 0 10px;
            width: auto;
            input {
                font-size: 20px;
                height: 30px;
                text-align: center;
                border: 0;
                transition: width .5s;
                width: 190px;
                &:focus {
                    width: 510px;
                }
            }
        }
    }
</style>