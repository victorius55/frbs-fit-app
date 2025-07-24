import { createApp } from 'vue'
import App from './App.vue'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'



// Vuetify imports
import 'vuetify/styles'  // Global CSS for Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }

})

const app = createApp(App)
app
  .use(vuetify)
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(), 
    ],
  })
  .mount('#app')

