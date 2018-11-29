import {storage} from '../../libs/bg.js'

export const todo = {
  get () {
    return storage.get('todo')
      .then(res => {
        return res || []
      })
  },
  set (todos) {
    return storage.set('todo', todos)
  }
}