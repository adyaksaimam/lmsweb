import React from 'react'

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Course = React.lazy(() => import('./views/screen/course/Course'))
const Job = React.lazy(() => import('./views/screen/job/Job'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  // { path: '/login', exact: true, name: 'Login' },
  { path: '/login', name: 'Login', element: Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/Course', name: 'Course', element: Course },
  { path: '/Job', name: 'Job', element: Job },
]

export default routes
