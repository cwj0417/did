const catchError = function (rejectFn) {
  if (chrome.runtime.lastError) {
    console.warn("Whoops.. " + chrome.runtime.lastError.message)
    rejectFn && rejectFn(chrome.runtime.lastError.message)
  }
}
export const storage = {
  setAll (obj) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set(obj, (callback) => {
        catchError(reject)
        resolve(`ok${callback}`)
      })
    })
  },
  getAll () {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get((callback) => {
        catchError(reject)
        resolve(callback)
      })
    })
  },
  set (key, value) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({[key]: value}, (callback) => {
        catchError(reject)
        resolve(`ok${callback}`)
      })
    })
  },
  get (key) {
    return new Promise(resolve => {
      chrome.storage.local.get(key, (callback) => {
        resolve(callback[key])
      })
    })
  },
  remove (key) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(key, (callback) => {
        catchError(reject)
        resolve(callback)
      })
    })
  }
}
