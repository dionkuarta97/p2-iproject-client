import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import DashboardMentor from "../views/Mentor/Dashboard.vue";
import DashboardStudent from "../views/Student/Dashboard.vue";
import Mentor from "../views/Admin/Mentor.vue";
import apiServer from "../apis/apiServer";

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
    path: "/mentor",
    name: "DashboardMentor",
    component: DashboardMentor,
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
    if (to.name === "Login" && token) {
      next({ name: "Dashboard" });
    } else if (to.name !== "Login" && !token) {
      next({ name: "Login" });
    } else {
      next();
    }
    const result = await apiServer({
      method: "GET",
      url: "/req_user",
      headers: {
        access_token: token,
      },
    });
    const user = result.data.user;
    if (
      (to.name === "Dashboard" ||
        to.name === "Mentor" ||
        to.name === "Student") &&
      user.role !== "admin"
    ) {
      next({ name: "DashboardMentor" });
    } else if (to.name === "DashboardMentor" && user.role !== "mentor") {
      next({ name: "DashboardStudent" });
    } else if (to.name === "DashboardStudent" && user.role !== "student") {
      next({ name: "Dashboard" });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
