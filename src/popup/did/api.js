import {storage} from '../../libs/bg.js'
import gistore from '../../libs/gistore'

const fileName = 'did-store.db'

function to10 (n) {
    return n > 10 ? n : '0' + n
}

export const date28 = () => new Date().getFullYear() + to10(new Date().getMonth() + 1) + to10(new Date().getDate())

export const tagRE = /{{([^}}]*?)}}/g

const extractTags = dids => {
    let tags = []
    for (let did of dids) {
        for (let match of did.match(tagRE)) {
            tags.push(match.replace(tagRE, '$1'))
        }
    }
    return [...new Set(tags)]
}

export const today = {
    get () {
        return storage.get('today')
            .then(res => {
                res = res || {}
                if (res.date && res.date !== date28()) {
                    this.set([])
                    if (!res.dids.length) {
                        return []
                    }
                    // push to history
                    let tags = extractTags(res.dids)
                    return history.push({...res, tags})
                        .then(_ => {
                            gistore.check()
                                .then(suc => {
                                    storage.getAll()
                                        .then(data => {
                                            gistore.$api.backUp({[fileName]: data})
                                        })
                                })
                            return []
                        })
                } else {
                    return res.dids
                }
            })
    },
    set (dids) {
        return storage.set('today', {date: date28(), dids})
    },
    push (did) {
        return this.get()
            .then(res => {
                res.push(did)
                return this.set(res)
            })
    }
}

export const history = {
    get () {
        return storage.get('history')
            .then(res => {
                return res || []
            })
    },
    push (item) {
        return this.get()
            .then(res => {
                res.push(item)
                return storage.set('history', res)
            })
    }
}

let tagCache = {}

const createTagObj = () => {
    const randomColor = () => {
        let h = Math.round(Math.random() * 360)
        let s = 50 + Math.round(Math.random() * 50)
        let l = 50
        return `hsla(${h}, ${s}%, ${l}%, 1)`
    }
    return {bg: randomColor()}
}

export const tags = {
    get (tag) {
        return new Promise((resolve, reject) => {
            if (tagCache[tag]) {
                resolve(tagCache[tag])
            } else {
                storage.get('tags')
                    .then(res => {
                        res = res || {}
                        tagCache = res
                        if (!tagCache[tag]) {
                            res[tag] = createTagObj()
                            storage.set('tags', res)
                                .then(_ => {
                                    resolve(res[tag])
                                })
                        } else {
                            resolve(tagCache[tag])
                        }
                    })
            }
        })
    }
}
