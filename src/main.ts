import Vue from 'vue'
import App from './App.vue'
import store from './store'

import './styles/index.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faChevronDown, faChevronUp);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
