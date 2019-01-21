<template>
    <div>
        <div class="today-dids">
            <did-item :value="did" :editable="true" @modify="v => modify(v, index)" @delete="del(index)"
                      v-for="(did, index) in dids" :key="index"></did-item>
        </div>
        <div class="show-history" v-for="item of historys">
            <div class="date">
                <Date :value="item.date"></Date>
            </div>
            <div class="his-dids">
                <did-item :value="did" v-for="(did, index) in item.dids" :key="index"></did-item>
            </div>
        </div>
    </div>
</template>
<script type='text/ecmascript-6'>
  import DidItem from './did.vue'
  import Date from './date.vue'
  import {today, history} from './api.js'

  export default {
    components: {DidItem, Date},
    data () {
      return {
        input: '',
        dids: [],
        historys: []
      }
    },
    methods: {
      add (input) {
        this.dids.push(input)
        today.set(this.dids)
      },
      del (index) {
        this.dids.splice(index, 1)
        today.set(this.dids)
      },
      modify (v, index) {
        this.$set(this.dids, index, v)
        today.set(this.dids)
      }
    },
    mounted () {
      today.get()
        .then(dids => {
          this.dids = dids
          history.get()
            .then(items => {
              this.historys = items.reverse()
            })
        })
    }
  }
</script>
<style lang='scss'>
    .input {
        width: 100%;
    }

    .today-dids {
        padding: 2px;
        border-bottom: 1px solid #aaa;
        margin: 2px;
    }

    .show-history {
        display: flex;
        .date {
            padding: 3px;
        }
        .his-dids {
            div {
                margin-left: 10px;
            }
        }
    }
</style>