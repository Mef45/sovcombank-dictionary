import Vue from 'vue';
import App from './App.vue';

import './styles/index.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faChevronDown, faChevronUp, faBookmark as fasBookmark, faGripLines } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSearch, faGripLines, faChevronDown, faChevronUp, fasBookmark, farBookmark);

Vue.component('font-awesome-icon', FontAwesomeIcon);

import store from './store';

import { dictionary } from './store/dictionary';
import { bookmarks } from './store/bookmarks';

store.registerModule('dictionary', dictionary);
store.registerModule('bookmarks', bookmarks);

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
