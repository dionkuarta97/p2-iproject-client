<template>
  <div>
    <sidebar-student :user="user" />
    <v-main app>
      <v-container fluid>
        <button @click="toTask" class="btn btn-primary">See Your Task</button>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import SidebarStudent from "../../components/Student/SidebarStudent.vue";

export default {
  components: { SidebarStudent },
  name: "DashboardStudent",
  data() {
    return {
      mp3: "/demo/example.mp3",
      showRecorder: true,
      headers: {
        "X-Custom-Header": "some data",
      },
    };
  },
  methods: {
    toTask() {
      this.$router.push("/student/task");
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.$store.dispatch("reqUser");
  },
};
</script>

<style></style>
