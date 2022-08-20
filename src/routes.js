import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Course = React.lazy(() => import("./views/theme/course/Course"));
const Job = React.lazy(() => import("./views/theme/job/Job"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/Course", name: "Course", element: Course },
  { path: "/Job", name: "Job", element: Job },
];

export default routes;
