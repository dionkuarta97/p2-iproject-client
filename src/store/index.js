import Vue from "vue";
import Vuex from "vuex";
import apiServer from "../apis/apiServer";

const token = localStorage.getItem("access_token");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    task: [],
    detailTask: {},
    score: {},
    login: false,
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload.user;
    },
    SET_LOGIN(state, payload) {
      state.login = payload.login;
    },
    SET_TASK(state, payload) {
      state.task = payload.task;
    },
    SET_DETAIL_TASK(state, payload) {
      state.detailTask = payload.detailTask;
    },
    SET_SCORE(state, payload) {
      state.score = payload.score;
    },
  },
  actions: {
    setLogin(context, payload) {
      const login = payload.login;
      context.commit("SET_LOGIN", { login });
    },
    async login(context, payload) {
      const result = await apiServer({
        method: "POST",
        url: "/login",
        data: payload,
      });

      return result;
    },
    async assesment(context, payload) {
      const result = await apiServer({
        method: "POST",
        url: "/student/assesment/" + payload.id,
        data: payload,
        headers: {
          access_token: token,
        },
      });

      return result;
    },
    async reqUser(context, payload) {
      let tkn;
      if (payload) {
        tkn = payload;
      } else {
        tkn = token;
      }
      const result = await apiServer({
        method: "GET",
        url: "/req_user",
        headers: {
          access_token: tkn,
        },
      });

      const user = result.data.user;
      context.commit("SET_USER", { user });
      return result.data;
    },
    clearUser(context) {
      const user = "";
      context.commit("SET_USER", { user });
    },
    async getMentors(context, payload) {
      let params = {};
      if (payload) {
        params = {
          page: payload.page,
          name: payload.name,
        };
      }
      const result = await apiServer({
        method: "GET",
        url: "/admin/mentor",
        headers: {
          access_token: token,
        },
        params,
      });
      return result.data;
    },
    async getStudents(context, payload) {
      let params = {};
      if (payload) {
        params = {
          page: payload.page,
          name: payload.name,
        };
      }
      const result = await apiServer({
        method: "GET",
        url: "/admin/student",
        headers: {
          access_token: token,
        },
        params,
      });
      return result.data;
    },
    async addMentors(context, payload) {
      const result = await apiServer({
        method: "post",
        url: "/admin/mentor",
        headers: {
          access_token: token,
        },
        data: payload,
      });
      return result;
    },
    async addStudents(context, payload) {
      const result = await apiServer({
        method: "post",
        url: "/admin/student",
        headers: {
          access_token: token,
        },
        data: payload,
      });
      return result;
    },
    async getTask(context) {
      const result = await apiServer({
        method: "GET",
        url: "/student/task",
        headers: {
          access_token: token,
        },
      });
      const task = result.data.task;
      context.commit("SET_TASK", { task });
      return result.data;
    },
    async getScore(context, payload) {
      const result = await apiServer({
        method: "GET",
        url: "/student/score/" + payload.id,
        headers: {
          access_token: token,
        },
      });
      const score = result.data.result;
      context.commit("SET_SCORE", { score });
      return result.data;
    },
    async deleteMentor(context, payload) {
      const result = await apiServer({
        method: "DELETE",
        url: "/admin/mentor/" + payload.id,
        headers: {
          access_token: token,
        },
      });
      return result.data.message;
    },
    async deleteStudent(context, payload) {
      const result = await apiServer({
        method: "DELETE",
        url: "/admin/student/" + payload.id,
        headers: {
          access_token: token,
        },
      });
      return result.data.message;
    },
    async detailMentor(context, payload) {
      const result = await apiServer({
        method: "GET",
        url: "/admin/mentor/" + payload.id,
        headers: {
          access_token: token,
        },
      });
      return result.data.result;
    },
    async updateMentor(context, payload) {
      const id = payload.id;
      const result = await apiServer({
        method: "PUT",
        url: "/admin/mentor/" + id,
        headers: {
          access_token: token,
        },
        data: payload,
      });
      return result.data.message;
    },
  },
  modules: {},
});
