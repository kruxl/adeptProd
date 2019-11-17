/*!

=========================================================
* Vuetify Material Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/vuetify-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import firebase from 'firebase'

// Firebase config

const configOptions = {
  apiKey: "AIzaSyA0jm-sWn2IQ9x1uVbJo6xVHt1Iw0bBa2M",
  authDomain: "adeptprod-11172.firebaseapp.com",
  databaseURL: "https://adeptprod-11172.firebaseio.com",
  projectId: "adeptprod-11172",
  storageBucket: "adeptprod-11172.appspot.com",
  messagingSenderId: "204009232209",
  appId: "1:204009232209:web:ed790933b1e2491df2e570",
  measurementId: "G-042LNKE017"
}

// init firebase

firebase.initializeApp(configOptions);

export const db = firebase.firestore();

// authState checkups

firebase.auth().onAuthStateChanged(user => {
  store.dispatch('fetchUser', user);
  if (user) {
    return db.collection('users').get().then(snapshot => {
      snapshot.forEach(doc => {
        const userDetails = doc.data();
        if (userDetails.uid == user.uid) {
          store.dispatch('getUserData', userDetails);
          store.dispatch('setProjects');
          store.dispatch('setFlows');
        } else {
          console.log('this is not' + " " + user.uid);
        }
      })
    });
  } else {
    store.dispatch('removeUser');
  }
});

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
