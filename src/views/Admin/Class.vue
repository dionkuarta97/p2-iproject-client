<template>
  <div>
    <sidebar :user="user" />
    <v-main app>
      <v-container fluid>
        <table-class />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Sidebar from "../../components/Admin/Sidebar.vue";
import TableClass from "../../components/Admin/TableClass.vue";

export default {
  components: { Sidebar, TableClass },
  name: "Class",

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
