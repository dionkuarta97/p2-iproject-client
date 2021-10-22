<template>
  <div>
    <sidebar :user="user" />
    <v-main app>
      <v-container fluid>
        <dashboard-card
          :totalMentor="totalMentor"
          :totalStudent="totalStudent"
        />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import DashboardCard from "../../components/Admin/DashboardCard.vue";
import Sidebar from "../../components/Admin/Sidebar.vue";

export default {
  components: { Sidebar, DashboardCard },
  name: "Dashboard",
  data() {
    return {
      totalMentor: "",
      totalStudent: "",
    };
  },
  methods: {},
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.$store.dispatch("reqUser");
    this.$store.dispatch("getMentors").then((data) => {
      this.totalMentor = data.totalItems;
    });
    this.$store.dispatch("getStudents").then((data) => {
      this.totalStudent = data.totalItems;
    });
  },
};
</script>

<style></style>
