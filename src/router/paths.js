/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project-list',
    name: 'Project List',
    view: 'ProjectList',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-flow/:projectId',
    name: 'Flow Form',
    view: 'FlowForm',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/icons',
    view: 'Icons',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/io-add-flow',
    name: 'IO Flow Form',
    view: 'IOFlowForm',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/add-students',
    name: 'Add Students',
    view: 'StudentFlowForm',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notifications',
    view: 'Notifications',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project-view',
    name: 'Project View',
    view: 'ProjectView',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login Page',
    view: 'LoginPage'
  }
]
