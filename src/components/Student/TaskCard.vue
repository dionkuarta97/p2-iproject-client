<template>
  <div align="center">
    <div class="card col-md-8">
      <div class="card-body">
        <div align="left">
          <ul>
            <li v-for="(task, index) in tasks" :key="task.id">
              <p>
                {{ index + 1 }} {{ task.task }}
                <span class="badge badge-warning mr-2">{{ task.status }} </span>
                <button
                  v-if="task.status === 'uncompleted'"
                  class="btn btn-success btn-sm"
                  @click="runTask(task.id)"
                >
                  Kerjakan
                </button>
                <b-button
                  v-if="task.status !== 'uncompleted'"
                  v-b-modal="'modal-' + task.id"
                  variant="primary"
                  small
                  @click="score(task.id)"
                  >Score</b-button
                >

                <b-modal :id="'modal-' + task.id" title="Score">
                  <div align="center">
                    <h3>Your Score :</h3>
                    <br />
                    <h5>{{ score1.score }}</h5>
                  </div>
                </b-modal>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["tasks"],
  computed: {
    score1() {
      return this.$store.state.score;
    },
  },
  methods: {
    runTask(id) {
      this.$router.push("/student/runTask/" + id);
    },
    score(id) {
      this.$store.dispatch("getScore", { id });
    },
  },
};
</script>

<style>
</style>