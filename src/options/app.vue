<template>
    <div>
        <div>
            <button @click="axport">export</button>
            <button @click="ymport">import</button>
            <textarea v-model="data" style="width:100px;height:100px;resize:none;"
                      @focus="$event.target.select()"></textarea>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {storage} from "../libs/bg";
    export default {
        data() {
            return {
                data: ""
            }
        },
        methods: {
            axport() {
                storage.getAll()
                        .then(data => {
                            this.data = JSON.stringify(data);
                        })
            },
            ymport() {
                try {
                    this.data = JSON.parse(this.data);
                }
                catch (e) {
                }
                if (typeof this.data == "object") {
                    storage.setAll(this.data)
                            .then(res => {
                                console.log(res);
                            })
                }
                this.data = JSON.stringify(this.data)
            }
        }
    }
</script>