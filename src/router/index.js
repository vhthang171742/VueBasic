/*===============================Method 1===================================*/
import Vue from "vue";
import VueRouter from "vue-router";
import Overview from "../views/Overview/Overview.vue";
// import Student from "../views/Student/Student.vue";
// import Teacher from "../views/Teacher/Teacher.vue";
// import Class from "../views/Class/Class.vue";
// import Subject from "../views/Subject/Subject.vue";
// import Account from "../views/Account/Account.vue";
// import BadRequest from "../views/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Overview",
    component: Overview
  },
  {
    path: "/student/",
    name: "Student",
    component: () =>
      import(/* webpackChunkName: "student" */ "../views/Student/Student.vue")
  },
  {
    path: "/student/:id",
    name: "StudentDetail",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "studentdetail" */ "../views/Student/StudentDetail.vue"
      )
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account/Account.vue")
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: () =>
      import(/* webpackChunkName: "teacher" */ "../views/Teacher/Teacher.vue")
  },
  {
    path: "/class",
    name: "Class",
    component: () =>
      import(/* webpackChunkName: "class" */ "../views/Class/Class.vue")
  },
  {
    path: "/subject",
    name: "Subject",
    component: () =>
      import(/* webpackChunkName: "subject" */ "../views//Subject/Subject.vue")
  },
  {
    path: "*",
    name: "BadRequest",
    component: () =>
      import(/* webpackChunkName: "badrequest" */ "../views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

/*================================Method 2==================================*/
// import Vue from "vue";
// import VueRouter from "vue-router";
// import Overview from "../views/Overview/Overview.vue";
// import Student from "../views/Student/Student.vue";
// import Teacher from "../views/Teacher/Teacher.vue";
// import Class from "../views/Class/Class.vue";
// import Subject from "../views/Subject/Subject.vue";
// import Account from "../views/Account/Account.vue";
// import BadRequest from "../views/404.vue";

// Vue.use(VueRouter);

// export default new VueRouter({
//   routes: [
//     {
//       path: '/',
//       name: 'Overview',
//       component: Overview
//     },
//     {
//       path: '/student',
//       name: 'Student',
//       component: Student
//     }
//   ]
//   })
