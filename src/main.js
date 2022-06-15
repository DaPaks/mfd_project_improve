import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import store from './store'


createApp(App).use(router).use(store).use(VueGoogleMaps, {
    load: {
        key: "AIzaSyBkPQLyx_zkJzofdXLNN7op3vI3LsaMbSE",
        libraries: "places"
    }
}).mount('#app')
