<template>
    <div>
        <div class="todo-wrap">
            <div class="todo-item-wrap" v-for="(todo, index) in todos" :key="index">
                <Date>{{todo.start}}</Date>
                <i class="fa fa-check" @click="check(index)"></i>
                <did-item @modify="v => modify(v, index)" @delete="del(index)"  :value="todo.todo" :editable="true"></did-item>
            </div>
        </div>
        <div class="empty" v-if="!todos.length">
            已经没有待做事项, 感觉棒棒的
        </div>
    </div>
</template>
<script type='text/ecmascript-6'>
    import {todo} from './api'
    import {date28, today} from '../did/api'
    import DidItem from '../did/did.vue'
    import Date from '../did/date.vue'
    export default {
        components: {DidItem, Date},
        data () {
            return {
                todos: []
            }
        },
        methods: {
            add (input) {
                this.todos.push({start: date28(), todo: input})
                todo.set(this.todos)
            },
            del (index) {
                this.todos.splice(index, 1)
                todo.set(this.todos)
            },
            modify (v, index) {
                this.$set(this.todos[index], 'todo', v)
                todo.set(this.todos)
            },
            check (index) {
                today.push(this.todos[index].todo)
                        .then(res => {
                            this.del(index)
                        })
            }
        },
        mounted () {
            todo.get()
                    .then(todos => this.todos = todos)
        }
    }
</script>
<style lang='scss'>
    .todo-wrap {
        .todo-item-wrap {
            display: flex;
            i {
                width: 26px;
                font-size: 18px;
                padding: 4px;
                vertical-align: top;
                text-align: center;
                cursor: pointer;
            }
        }
    }
    .empty {
        padding: 20px;
        color: #aaa;
    }
</style>
