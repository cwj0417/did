<template>
    <div style="color:red" @click="handleChange">{{count}}</div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    setup() {
        let store = useStore();
        const handleChange = ()=>{
            store.commit('increment')
        }
        return {
            count: computed(() => store.state.count),
            handleChange
        }
    }
}
</script>
<style >

</style>