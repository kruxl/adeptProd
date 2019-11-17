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
    },
    setFlows(state) {
      let flows = []
      firebase.firestore().collection('Flows').onSnapshot((snapshot) => {
        flows = []
        snapshot.forEach((doc) => {
          flows.push({id: doc.id,
                      startDate: doc.data().startDate,
                      endDate: doc.data().endDate,
                      flowHC: doc.data().flowHC,
                      flowName: doc.data().flowName,
                      flowCountry: doc.data().flowCountry,
                      studentCount: doc.data().studentCount,
                      participants: doc.data().participants,
                      teachers: doc.data().teachers,
                      parentProject: doc.data().parentProject
          })
        })
        state.user.flows = flows
      })
    },
    addStudent(state) {
      let students = [];
      // firebase.firestore().collection('users').onSnapshot((snapshot) => {
      //   students = []
        // console.log(snapshot)
        // for(let i=0; i < snapshot.lenght; i++) {
        //   if (snapshot[i].data().student) {
        //     students.push(snapshot[i].data().uid)
        //   }
        // }
        // snapshot.forEach(doc => {
        //   const data = doc.data();
        //   if (data.student) {
        //     students.push(data.uid)
        //   }
        // })
      // })
      firebase.firestore().collection('users').where("student", "==", true).get().then((snapshot) => {
        snapshot.forEach(doc => {
          const std = doc.data();
          students.push(std);
        })
      })
      // state.user.myAddedStudents = students
      console.log(state.user)
    }
}
