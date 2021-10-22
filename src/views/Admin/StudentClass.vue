<template>
  <div>
    <sidebar :user="user" />
    <v-main app>
      <v-container fluid> <table-student-class /> </v-container>
    </v-main>
  </div>
</template>

<script>
import Sidebar from "../../components/Admin/Sidebar.vue";
import TableStudentClass from "../../components/Admin/TableStudentClass.vue";

export default {
  components: { Sidebar, TableStudentClass },
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
