<template>
  <div>
    <sidebar-student :user="user" />
    <v-main app>
      <v-container fluid>
        <task-card :tasks="task" />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import SidebarStudent from "../../components/Student/SidebarStudent.vue";
import TaskCard from "../../components/Student/TaskCard.vue";

export default {
  components: { SidebarStudent, TaskCard },
  name: "DashboardStudent",
  data() {
    return {};
  },
  methods: {},
  computed: {
    user() {
      return this.$store.state.user;
    },
    task() {
      return this.$store.state.task;
    },
  },
  created() {
    this.$store.dispatch("reqUser");
    this.$store.dispatch("getTask");
  },
};
</script>

<style></style>
