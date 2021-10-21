<template>
  <div>
    <sidebar :user="user" />
    <v-main app>
      <v-container fluid>
        <dashboard-card />
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
