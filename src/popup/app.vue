<template>
    <div>
        <div class="app-header">
            <div class="ttl">
                {{content}}
            </div>
            <div class="select-module">
                <span @mouseover="cur = 'Did'">did</span>
                <span @mouseover="cur = 'Todos'">todo</span>
            </div>
        </div>
        <component :is='cur'></component>
    </div>
</template>
<script type='text/ecmascript-6'>
    import Did from './did'
    import Todos from './todo'

    export default {
        data () {
            return {
                cur: 'Did',
                content: ''
            }
        },
        components: {Did, Todos},
        mounted () {
            const nextDay = _ => new Date().setHours(24, 0, 0)
            const lastYear = _ => new Date(new Date().setMonth(0, 0)).setHours(24, 0, 0)
            const nextYear = _ => new Date(new Date().setMonth(12, 1)).setHours(0, 0, 0)
            const analyzeTTL = time => {
                let h = Math.floor(time / 3600)
                let m = Math.floor((time % 3600) / 60)
                let s = Math.floor(time % 3600 % 60)
                return {h, m, s}
            }
            let secondToDay = (nextDay() - new Date()) / 1000
            let {h, m} = analyzeTTL(secondToDay)
            this.content = `time to next day: ${h}h ${m}m`
            let year = new Date().getFullYear()
            let per = (Date.now() - lastYear()) / (nextYear() - lastYear())
            this.content += `, ${year} has passed ${(per * 100).toFixed(0)}%`
        }
    }
</script>
<style lang='scss'>
    .app-header {
        display: flex;
        .ttl {
            flex-grow: 1;
        }
        .select-module {
            width: 60px;
        }
    }
</style>