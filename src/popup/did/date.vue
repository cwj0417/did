<template>
    <span class="did-date">
        {{this.m}}/{{this.d}}({{this.w}})
    </span>
</template>
<script type='text/ecmascript-6'>
  const weekMap = ['日', '一', '二', '三', '四', '五', '六']
  const monthMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  export default {
    data () {
      return {
        y: '',
        m: '',
        d: '',
        w: '',
      }
    },
    mounted () {
      let raw = this.$slots.default[0].text
      let tmp = raw.split('')
      tmp.splice(4, 0, ' ')
      tmp.splice(7, 0, ' ')
      let date = new Date(tmp.join(''))
      this.y = date.getFullYear()
      this.m = monthMap[date.getMonth()]
      this.d = date.getDate()
      this.w = weekMap[date.getDay()]
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
