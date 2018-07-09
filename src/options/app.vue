<template>
    <div>
        <div class="gistore">
            <div v-if="hasGist">
                <div v-if="hasId">
                    <span>gist id: {{hasId}}</span>
                    <i style="cursor:pointer;" @click="hasId = false">X</i>
                    <button @click="sync">import from gist(将会丢失本地数据)</button>
                    <button @click="backup">export to gist(远程备份将被覆盖)</button>
                </div>
                <input v-else placeholder="输入描述, 新建gist作为备份" class="w300" @keydown.enter="createGist($event.target.value)">
            </div>
            <div v-else>
                <input placeholder="输入github token, 使用gist来远程备份" class="w300" @keydown.enter="inputToken($event.target.value)">
            </div>
            <ul class="gistList">
                <li v-for="(item,index) in list" :key="index" :class="{active: hasId === item.id}">
                    id: {{item.id}}
                    <a :href="item.html_url" target="_blank">{{item.description}}</a>
                </li>
            </ul>
        </div>
        <div>
            <button @click="axport">export</button>
            <button @click="ymport">import</button>
            <textarea v-model="data" style="width:100px;height:100px;resize:none;"
                      @focus="$event.target.select()"></textarea>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {storage} from "../libs/bg"
    import gistore from "../libs/gistore"
    const fileName = 'did-store.db'
    export default {
        data() {
            return {
                data: "",
                hasGist: false,
                hasId: false,
                list: []
            }
        },
        methods: {
            axport() {
                storage.getAll()
                        .then(data => {
                            this.data = JSON.stringify(data)
                        })
            },
            ymport() {
                try {
                    this.data = JSON.parse(this.data)
                }
                catch (e) {
                }
                if (typeof this.data == "object") {
                    storage.setAll(this.data)
                            .then(res => {
                                console.log(res)
                            })
                }
                this.data = JSON.stringify(this.data)
            },
            inputToken (token) {
                gistore.setToken(token)
                        .then(list => {
                            this.list = list
                            gistore.saveToken(token)
                        }, err => {
                            console.log(err)
                        })
            },
            createGist (desc) {
                storage.getAll()
                        .then(data => {
                            return gistore.createGist(desc, {[fileName]: data})
                        })
                        .then(id => {
                            this.hasId = id
                            this.getList()
                        })
            },
            getList () {
                gistore.$api.getList()
                        .then(res => {
                            this.list = res
                        }, err => {
                            console.log(err)
                        })
            },
            backup () {
                storage.getAll()
                        .then(data => {
                            gistore.$api.backUp({[fileName]: data})
                                    .then(res => alert('成功'), err => alert('失败'))
                        })
            },
            sync () {
                gistore.$api.sync()
                        .then(res => {
                            storage.setAll(res[fileName])
                                    .then(res => alert('成功'), err => alert('保存失败'))
                        }, err => alert('获取失败'))
            }
        },
        mounted () {
            gistore.check()
                    .then(res => {
                        if (res.token) {
                            this.hasGist = true
                            this.getList()
                        }
                        if (res.id) {
                            this.hasId = res.id
                        }
                    })
        }
    }
</script>
<style lang='scss'>
    .w300 {width: 300px;}
    .active {background: #eee;}
</style>