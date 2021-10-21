<template>
  <div>
    <sidebar :user="user" />
    <v-main app>
      <v-container fluid>
        <table-mentor />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Sidebar from "../../components/Admin/Sidebar.vue";
import TableMentor from "../../components/Admin/TableMentor.vue";

export default {
  components: { Sidebar, TableMentor },
  name: "Mentor",

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
