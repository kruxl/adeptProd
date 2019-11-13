// https://vuex.vuejs.org/en/getters.html

export default {
    user(state){
      return state.user
    },
    getProjects(state) {
      return state.user.projects;
    }
}
