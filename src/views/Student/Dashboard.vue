<template>
  <div>
    <sidebar-student :user="user" />
    <v-main app>
      <v-container fluid>
        <list-task />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import ListTask from "../../components/Student/ListTask.vue";
import SidebarStudent from "../../components/Student/SidebarStudent.vue";

export default {
  components: { SidebarStudent, ListTask },
  name: "DashboardStudent",
  data() {
    return {};
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
