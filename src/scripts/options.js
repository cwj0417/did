import Vue from 'vue'

import App from '../options/app'

import  '../styles/options.scss'

new Vue({
    el: `#options`,
    template: `<App/>`,
    components: {App}
})
