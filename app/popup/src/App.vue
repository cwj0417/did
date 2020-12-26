<template>
    <div style="color:red" @click="handleChange">{{count}}</div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent} from 'vue'
export default defineComponent({
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
})
</script>
<style >

</style>