<template>
  <div>
    <sidebar-mentor :user="user" />
    <v-main app>
      <v-container fluid>
        <table-student-mentor />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import SidebarMentor from "../../components/Mentor/SidebarMentor.vue";
import TableStudentMentor from "../../components/Mentor/TableStudentMentor.vue";

export default {
  components: { SidebarMentor, TableStudentMentor },
  name: "DashboardMentor",
  data() {
    return {};
  },
  methods: {},
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
