<template>
  <div>
    <sidebar-mentor :user="user" />
    <v-main app>
      <v-container fluid>
        <table-class-mentor />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import SidebarMentor from "../../components/Mentor/SidebarMentor.vue";
import TableClassMentor from "../../components/Mentor/TableClassMentor.vue";

export default {
  components: { SidebarMentor, TableClassMentor },
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
