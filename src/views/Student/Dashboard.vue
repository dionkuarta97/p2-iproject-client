<template>
  <div>
    <sidebar-student :user="user" />
    <v-main app>
      <v-container fluid>
        <button @click="toTask" class="btn btn-primary">See Your Task</button>
        <audio-recorder
          v-if="showRecorder"
          upload-url="some url"
          filename="ninja"
          format="wav"
          :attempts="3"
          :time="2"
          :headers="headers"
          :before-recording="callback"
          :pause-recording="callback"
          :after-recording="callback"
          :select-record="callback"
          :before-upload="callback"
          :successful-upload="callback"
          :failed-upload="callback"
          :bit-rate="192"
        />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import SidebarStudent from "../../components/Student/SidebarStudent.vue";

export default {
  components: { SidebarStudent },
  name: "DashboardStudent",
  data() {
    return {
      mp3: "/demo/example.mp3",
      showRecorder: true,
      headers: {
        "X-Custom-Header": "some data",
      },
    };
  },
  methods: {
    callback(msg) {
      console.debug("Event: ", msg);
    },
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
