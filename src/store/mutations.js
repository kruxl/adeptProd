// https://vuex.vuejs.org/en/mutations.html
import firebase from 'firebase'
import { db } from '@/main'


export default {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    setUserData(state, data) {
      state.user.userDetails = data;
    },
    removeUser(state, data) {
      state.user.userDetails = null;
    },
    setProjects(state) {
      let projects = []
      firebase.firestore().collection('Projects').orderBy('startDate').onSnapshot((snapshot) => {
        projects = []
        snapshot.forEach((doc) => {
          projects.push({id: doc.id, 
                      startDate: doc.data().startDate, 
                      endDate: doc.data().endDate, 
                      projectName: doc.data().projectName, 
                      projectNumber: doc.data().projectNumber, 
                      flows: doc.data().flows})
        })
        state.user.projects = projects
      })
    }
}
