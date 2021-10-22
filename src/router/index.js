import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import DashboardMentor from "../views/Mentor/Dashboard.vue";
import DashboardStudent from "../views/Student/Dashboard.vue";
import Mentor from "../views/Admin/Mentor.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin/Dashboard.vue"),
  },

  {
    path: "/admin/mentor",
    name: "Mentor",
    component: Mentor,
  },
  {
    path: "/admin/student",
    name: "Student",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin/Student.vue"),
  },
  {
    path: "/admin/class",
    name: "Class",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin/Class.vue"),
  },
  {
    path: "/admin/studentClass/:ClassId/:GradeId",
    name: "StudentClass",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin/StudentClass.vue"),
  },
  {
    path: "/mentor",
    name: "DashboardMentor",
    component: DashboardMentor,
  },
  {
    path: "/mentor/student/:id",
    name: "StudentMentor",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Mentor/StudentMentor.vue"
      ),
  },
  {
    path: "/mentor/task/:id",
    name: "TaskMentor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Mentor/TaskMentor.vue"),
  },
  {
    path: "/student",
    name: "DashboardStudent",
    component: DashboardStudent,
  },
  {
    path: "/student/task",
    name: "Task",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Student/Task.vue"),
  },
  {
    path: "/student/runTask/:id",
    name: "RunTask",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Student/RunTask.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  try {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (to.name === "Login" && token) {
      next({ name: "Dashboard" });
    } else if (to.name !== "Login" && !token) {
      next({ name: "Login" });
    } else {
      next();
    }

    if (
      (to.name === "Dashboard" ||
        to.name === "Mentor" ||
        to.name === "Student" ||
        to.name === "Class" ||
        to.name === "StudentClass") &&
      role !== "admin"
    ) {
      next({ name: "DashboardMentor" });
    } else if (
      (to.name === "DashboardMentor" ||
        to.name === "StudentMentor" ||
        to.name === "TaskMentor") &&
      role !== "mentor"
    ) {
      next({ name: "DashboardStudent" });
    } else if (to.name === "DashboardStudent" && role !== "student") {
      next({ name: "Dashboard" });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
