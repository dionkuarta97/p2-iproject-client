<template>
  <div>
    <sidebar-student :user="user" />
    <v-main app>
      <v-container fluid>
        <div align="center">
          <audio-recorder
            upload-url="some url"
            :attempts="1"
            :time="0.45"
            :after-recording="callback"
            :bit-rate="80"
            :show-download-button="false"
            :show-upload-button="false"
          />
          <h3 class="mt-4">Your Score : {{ score }}</h3>
          <span>Detail Score :</span>
          <br />
        </div>
        <div class="col-md-12">
          <div align="center">
            <div class="row">
              <div class="col-md-4" v-for="(word, idx) in words" :key="idx">
                <span
                  >{{ word.label }} <br />
                  Score : {{ word.score }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import SidebarStudent from "../../components/Student/SidebarStudent.vue";

export default {
  components: { SidebarStudent },
  name: "Dashboard",
  data() {
    return {
      score: "",
      words: [],
    };
  },
  methods: {
    callback(data) {
      const { blob } = data;
      this.convertToBase64(blob).then((res) => {
        const id = this.$router.currentRoute.params.id;
        let base64 = res;
        console.log(res);
        this.$store
          .dispatch("assesment", { base64: base64, id })
          .then((response) => {
            const assesment = response.data.result;
            this.score = assesment.score;
            this.words = assesment.words;
            this.$swal({
              text: "your task is completed",
              icon: "success",
            });
          })
          .catch(() => {
            this.$swal({
              text: "your record to large do again or your task is completed",
              icon: "error",
            });
          });
      });
    },
    removeRecord(index) {
      this.recordings.splice(index, 1);
    },
    convertToBase64(data) {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          var dataUrl = reader.result;
          const base64 = dataUrl.substring(dataUrl.indexOf(",") + 1);
          resolve(base64);
        };
      });
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
