import gist from 'gistore'

export default {
    $api: gist,
    check () {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get('gistore', res => {
                if (res) {
                    res = res.gistore
                    if (res.token) {
                        gist.setToken(res.token)
                    }
                    if (res.id) {
                        gist.setId(res.id)
                    }
                    resolve(res)
                } else {
                    reject()
                }
            })
        })
    },
    setToken (token) {
        gist.setToken(token)
        return gist.getList()
    },
    saveToken (token) {
        return chrome.storage.sync.get('gistore', res => {
            res = res.gistore || {}
            res.token = token
            return chrome.storage.sync.set({gistore: res})
        })
    },
    createGist (desc, content) {
        return new Promise((resolve, reject) => {
            gist.createGist(desc, content)
                .then(res => {
                    let id = res.id
                    chrome.storage.sync.get('gistore', res => {
                        res = res.gistore || {}
                        res.id = id
                        chrome.storage.sync.set({gistore: res}, cb => {
                            resolve(id)
                        })
                    })
                }, err => reject(err))
        })
    }
}