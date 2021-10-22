<template>
  <div>
    <sidebar-mentor :user="user" />
    <v-main app>
      <v-container fluid>
        <table-task />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import SidebarMentor from "../../components/Mentor/SidebarMentor.vue";
import TableTask from "../../components/Mentor/TableTask.vue";

export default {
  components: { SidebarMentor, TableTask },
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
