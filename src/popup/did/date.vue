<template>
    <span class="did-date">
        {{monthMap[parsedDate.getMonth()]}}/{{parsedDate.getDate()}}({{weekMap[parsedDate.getDay()]}})
    </span>
</template>
<script type='text/ecmascript-6'>
  const weekMap = ['日', '一', '二', '三', '四', '五', '六']
  const monthMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  export default {
    props: ['value'],
    data () {
      return {
        weekMap, monthMap
      }
    },
    computed: {
      parsedDate () {
        if (!this.value) return new Date()
        let tmp = this.value.split('')
        tmp.splice(4, 0, ' ')
        tmp.splice(7, 0, ' ')
        return new Date(tmp.join(''))
      }
    }
  }
</script>
<style lang='scss'>
    .did-date {
        width: 66px;
        text-align: center;
        display: inline-block;
    }
</style>
