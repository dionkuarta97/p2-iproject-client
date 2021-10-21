<template>
  <div>
    <sidebar :user="user" />
    <v-main app>
      <v-container fluid>
        <table-student />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Sidebar from "../../components/Admin/Sidebar.vue";
import TableStudent from "../../components/Admin/TableStudent.vue";

export default {
  components: { Sidebar, TableStudent },
  name: "Student",

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
