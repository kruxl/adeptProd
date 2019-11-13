// https://vuex.vuejs.org/en/actions.html

export default {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        commit("SET_USER", null);
      }
    },
    getUserData({ commit }, userDetails) {
      commit('setUserData', {
        // isAdmin: userDetails.admin,
        data: userDetails
      });
    },
    removeUser({ commit }, userDetails) {
      commit('removeUser');
    },
    // setProjects({ commit }, projects) {
    //   commit('setProjects', {
    //     // isAdmin: userDetails.admin,
    //     projects: projects[]
    //   });
    setProjects(context) {
      context.commit('setProjects');
    }
}
